import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { Title, Body } from 'app/components/styleguide/text';
import { Flex, Base } from 'app/components/styleguide/layout';
import Spinner from 'app/components/spinner';
import ShowMore from 'app/components/show-more';

import { RADIUS } from 'app/constants';
import { s5, s1, s4, s2 } from 'app/components/styleguide/spacing';
import styled, { css } from 'app/components/styleguide';
import { IRootState } from 'app/redux/root-reducer';

import { statusesInRadius } from './graphql';
import { IStatusResponse, StatusesInRadiusData } from './types';
import { getSelectedStatusId } from './selectors';
import { selectStatus } from './actions';

const StatusItem = styled(Flex)<{selected?: boolean}>`
  background: ${props => props.theme.invertedText};
  border-bottom: 1px solid ${props => props.theme.border.default};

  ${props => props.selected && css`
    border-left: 14px solid ${props => props.theme.primary};
    box-shadow: 2px 2px 4px ${props => props.theme.shadow};
    transform: translateZ(1px)
  `}
`;

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
}

type Props = StatusesInRadiusData & IStatusListProps & IStateProps;

class StatusList extends React.PureComponent<Props> {

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
          (statusItemNode as Element).scrollIntoView();
        }
      }
    }
  }

  public render() {
    const {
      data,
      className,
      selectedStatusId,
    } = this.props;

    return (
      <StatusListContainer className={className}>
        {!data || data.loading ? (
          <Flex padding={s5} direction="column" align="center" justify="center">
            <Spinner />
            <Body marginTop={s2}>Loading...</Body>
          </Flex>
        ) : (
          data.statusesInRadius && data.statusesInRadius.length ? (
            data.statusesInRadius.map(status => (
              <StatusItem
                padding={s5}
                grow={1}
                key={status.id}
                direction="column"
                selected={status.id === selectedStatusId}
                ref={status.id === selectedStatusId ? this.selectedItemRef : ''}
              >
                <Title
                  clickable
                  paddingBottom={s1}
                  onClick={() => this.handleSelectedStatusChanged(status.id)}
                >
                  {status.title}
                </Title>
                <Body disabled>{`${status.city} ${status.zipCode}, ${status.street}`}</Body>
                <Base paddingTop={s4}>
                  <ShowMore textComponent={Body} text={status.description} />
                </Base>
              </StatusItem>
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
  graphql<IStatusListProps, IStatusResponse[]>(statusesInRadius, {
    options: (props) => ({
      variables: {
        radius: RADIUS,
        latitude: props.userLat,
        longitude: props.userLng,
      },
    }),
    skip: ({userLat, userLng}) => !userLat || !userLng,
  }),
  connect<IStateProps, {}, StatusesInRadiusData & IStatusListProps, IRootState>(
    (state) => ({
      selectedStatusId: getSelectedStatusId(state),
    }),
  ),
)(StatusList);
