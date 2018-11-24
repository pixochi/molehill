import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { Body } from 'app/components/styleguide/text';
import { Flex } from 'app/components/styleguide/layout';
import Spinner from 'app/components/spinner';

import { s5, s2, s4 } from 'app/components/styleguide/spacing';
import { IRootState } from 'app/redux/root-reducer';
import { NAVBAR_HEIGHT } from 'app/components/navbar';
import styled from 'app/components/styleguide';

import { getStopAutoRefetchStatuses } from '../map/selectors';
import { statusesInRadius } from '../graphql';
import { StatusesInRadiusData } from '../types';
import { getSelectedStatusId, getRadiusInMeters } from '../selectors';
import { selectStatus } from '../actions';

import StatusItem from './status-item';
import { StatusesInRadiusVariables } from 'app/generated/graphql';
import Container from 'app/components/container';

const STATUSES_LIMIT = 10;

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.backgroundDarker};
`;

interface IStatusListProps {
  userLat?: number;
  userLng?: number;
  className?: string;
}

interface IStateProps {
  selectedStatusId: string;
  radius: number;
  stopAutoRefetchStatuses: boolean;
}

type Props = StatusesInRadiusData & IStatusListProps & IStateProps;

class StatusList extends React.Component<Props> {

  private selectedItemRef: React.RefObject<any>;

  // Used for checking if status was selected by clicking on status title
  // so the selected item is not scrolled if it's already in the view
  private nextSelectedStatusId: string;

  constructor(props: Props) {
    super(props);
    this.selectedItemRef = createRef();
    this.handleFetchMore = this.handleFetchMore.bind(this);
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedStatusId !== this.props.selectedStatusId &&
      this.nextSelectedStatusId !== this.props.selectedStatusId
    ) {
      if (this.selectedItemRef.current) {
        const statusItemNode = findDOMNode(this.selectedItemRef.current);
        if (statusItemNode) {
          const {offsetTop} = statusItemNode as HTMLElement;
          window.scrollTo(0, offsetTop - NAVBAR_HEIGHT);
        }
      }
    }
  }

  public shouldComponentUpdate(nextProps: Props) {
    // don't update if radius has been changed
    if (this.props.stopAutoRefetchStatuses && nextProps.stopAutoRefetchStatuses) {
      return false;
    }
    return true;
  }

  public render() {
    const {
      data,
      className,
      selectedStatusId,
      stopAutoRefetchStatuses,
    } = this.props;

    const canLoadMore = data.statusesInRadius && data.statusesInRadius.count > data.statusesInRadius.statuses.length;

    return (
      <StyledContainer withShadow noPadding className={className} direction="column">
        {!data || data.loading || stopAutoRefetchStatuses ? (
          <Flex padding={s5} direction="column" align="center" justify="center">
            <Spinner />
            <Body marginTop={s2}>Loading...</Body>
          </Flex>
        ) : (
          data.statusesInRadius && data.statusesInRadius.statuses.length ? (
            data.statusesInRadius.statuses.map(status => (
              <StatusItem
                key={status.id}
                isSelected={status.id === selectedStatusId}
                status={status}
                ref={status.id === selectedStatusId ? this.selectedItemRef : ''}
                selectStatus={() => this.handleSelectedStatusChanged(status.id)}
              />
            ))
          ) : (
            <Container>
              <Body disabled>No statuses found. Share the moment with people near you.</Body>
            </Container>
          )
        )}
        {canLoadMore && (
          <Container clickable padding={s4} justify="center" onClick={this.handleFetchMore}>
            <Body>Load more</Body>
          </Container>
        )}
      </StyledContainer>
    );
  }

  private handleSelectedStatusChanged(statusId: string) {
    this.nextSelectedStatusId = statusId;
    selectStatus.dispatch(statusId);
  }

  private handleFetchMore() {
    const {
      data,
      radius,
      userLat,
      userLng,
    } = this.props;

    const {
      fetchMore,
      loading,
      statusesInRadius,
    } = data;

    if (!loading && statusesInRadius && statusesInRadius.statuses.length) {
      fetchMore({
        variables: {
          radius,
          latitude: userLat as number,
          longitude: userLng as number,
          skip: false,
          limit: STATUSES_LIMIT,
          cursor: statusesInRadius.statuses[statusesInRadius.statuses.length - 1].id,
        },
        updateQuery: (prevResult, {fetchMoreResult}) => {
          return {
            statusesInRadius: {
              ...prevResult.statusesInRadius,
              statuses: [
                ...prevResult.statusesInRadius.statuses,
                ...fetchMoreResult.statusesInRadius.statuses,
              ],
            },
          };
        },
      });
    }
  }
}

export default compose<React.ComponentType<IStatusListProps>>(
  connect<IStateProps, {}, StatusesInRadiusData & IStatusListProps, IRootState>(
    (state) => ({
      selectedStatusId: getSelectedStatusId(state),
      radius: getRadiusInMeters(state),
      stopAutoRefetchStatuses: getStopAutoRefetchStatuses(state),
    }),
  ),
  graphql<IStatusListProps & IStateProps, StatusesInRadiusData, StatusesInRadiusVariables>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: props.radius,
        latitude: props.userLat as number,
        longitude: props.userLng as number,
        skip: props.stopAutoRefetchStatuses,
        limit: 3,
      },
    }),
    skip: ({userLat, userLng}) => !userLat || !userLng,
  }),
)(StatusList);
