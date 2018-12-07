import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Button from 'app/components/button';
import { Flex } from 'app/components/styleguide/layout';

import { ModalIds } from 'app/components/modal/constants';
import { openModal } from 'app/components/modal/actions';
import { IRootState } from 'app/redux/root-reducer';
import { getUserId } from 'app/login/selectos';
import styled from 'app/components/styleguide';
import { NAVBAR_HEIGHT_PX } from 'app/components/navbar';

import { getLat, getLng } from './map/selectors';

import Map from './map/map';
import StatusList from './status-list/status-list';
import StatusModal from './status-modal/status-modal';
import StatusFilter from './status-filter/status-filter';

const StatusesContainer = styled(Flex)`
`;

const FixedContainer = styled.div`
  position: fixed;
  right: 0;
  top: ${NAVBAR_HEIGHT_PX};
  width: 50%;
`;

const OpenAddStatusButton = styled(Button)`
  border-radius: 0 0 7px 7px;
`;

const StyledMap = styled(Map)`
  width: 100%;
`;

const StyledStatusList = styled(StatusList)`
  width: 50%;
`;

interface IStateProps {
  userId: string | null;
  userLat?: number;
  userLng?: number;
}

type Props = IStateProps;

class Overview extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.handleOpenAddStatus = this.handleOpenAddStatus.bind(this);
  }

  public render() {
    const {
      userLat,
      userLng,
      userId,
    } = this.props;

    return (
      <Flex direction="column">
        <StatusesContainer>
          <StyledStatusList userLat={userLat} userLng={userLng} />
          <FixedContainer>
            <Flex direction="column">
              <StatusFilter />
              <StyledMap userLat={userLat} userLng={userLng} />
              <OpenAddStatusButton appearance="submit" text="+ Add" fullWidth onClick={this.handleOpenAddStatus} />
            </Flex>
          </FixedContainer>
        </StatusesContainer>
        <StatusModal userLat={userLat} userLng={userLng} userId={userId} />
      </Flex>
    );
  }

  private handleOpenAddStatus() {
    openModal.dispatch(ModalIds.status, {
      header: 'Add status',
      submitText: '+ Add',
    });
  }
}

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    userId: getUserId(state),
    userLat: getLat(state),
    userLng: getLng(state),
  })),
)(Overview);
