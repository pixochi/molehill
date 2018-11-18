import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { Body } from 'app/components/styleguide/text';
import { Flex } from 'app/components/styleguide/layout';
import Spinner from 'app/components/spinner';

import { s5, s2 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';
import { IRootState } from 'app/redux/root-reducer';
import { NAVBAR_HEIGHT } from 'app/components/navbar';

import { getStopAutoRefetchStatuses } from '../map/selectors';
import { statusesInRadius } from '../graphql';
import { StatusesInRadiusData } from '../types';
import { getSelectedStatusId, getRadiusInMeters } from '../selectors';
import { selectStatus } from '../actions';

import StatusItem from './status-item';

const StatusListContainer = styled.div`
  box-shadow: 1px 0 3px ${props => props.theme.border.focus};
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

    return (
      <StatusListContainer className={className}>
        {!data || data.loading || stopAutoRefetchStatuses ? (
          <Flex padding={s5} direction="column" align="center" justify="center">
            <Spinner />
            <Body marginTop={s2}>Loading...</Body>
          </Flex>
        ) : (
          data.statusesInRadius && data.statusesInRadius.length ? (
            data.statusesInRadius.map(status => (
              <StatusItem
                key={status.id}
                isSelected={status.id === selectedStatusId}
                status={status}
                ref={status.id === selectedStatusId ? this.selectedItemRef : ''}
                selectStatus={() => this.handleSelectedStatusChanged(status.id)}
              />
            ))
          ) : (
            <Body padding={s5} disabled>No statuses found. Be first to share the moment with people near you.</Body>
          )
        )}
      </StatusListContainer>
    );
  }

  private handleSelectedStatusChanged(statusId: string) {
    this.nextSelectedStatusId = statusId;
    selectStatus.dispatch(statusId);
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
  graphql<IStatusListProps & IStateProps, StatusesInRadiusData>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: props.radius,
        latitude: props.userLat,
        longitude: props.userLng,
        skip: props.stopAutoRefetchStatuses,
      },
    }),
    skip: ({userLat, userLng}) => !userLat || !userLng,
  }),
)(StatusList);
