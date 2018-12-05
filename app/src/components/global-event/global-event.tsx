import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from 'app/redux/root-reducer';
import styled from 'app/components/styleguide';
import { s2 } from '../styleguide/spacing';

import { Body, Title } from '../styleguide/text';
import {Flex} from '../styleguide/layout';

import {IGlobalEvent} from './reducer';
import {getGlobalEvent} from './selectors';
import {dismissEvent} from 'app/redux/internals';
import { GlobaEventType } from './constants';

export const DismissButton = styled(Title)`
  transform: rotate(45deg);
`;

interface IStateProps {
  globalEvent: IGlobalEvent;
}

interface IEventContainerProps {
  eventType: GlobaEventType;
}

export const GlobalEventContainer = styled.div<IEventContainerProps>`
  position: fixed;
  top: 40px;
  right: 40px;
  border-radius: 7px;
  padding: 12px 16px;
  z-index: 9998;
  background: ${props => {
    if (props.eventType === GlobaEventType.SUCCESS) {
      return `linear-gradient(to bottom right, ${props.theme.submitLight}, ${props.theme.submitDark})`;
    }
    else if (props.eventType === GlobaEventType.ERROR) {
      return `linear-gradient(to bottom right, ${props.theme.errorLight}, ${props.theme.errorDark})`;
    }
    return;
  }};
`;

export const GlobalEvent: React.SFC<IStateProps> = (props) => {
  const {
    globalEvent,
  } = props;

  const {
    message,
    type,
    sticky,
  } = globalEvent;

  if (!message || !type) {
    return null;
  }

  return (
    <GlobalEventContainer eventType={type}>
      <Flex align="center">
        <Body inverted>
          {message}
        </Body>
        {sticky && (
          <DismissButton onClick={dismissEvent.dispatch} clickable inverted marginLeft={s2}>+</DismissButton>
        )}
      </Flex>
    </GlobalEventContainer>
  );
};

export default compose<React.ComponentType>(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    globalEvent: getGlobalEvent(state),
  })),
)(GlobalEvent);
