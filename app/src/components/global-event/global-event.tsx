import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { IRootState } from 'app/redux/root-reducer';
import { styledTS } from '../styled-components';
import { ITheme } from '../styled-components/theme';
import { s2 } from '../styled-components/spacing';

import { Body, Title } from '../styled-components/text';
import {Flex} from '../styled-components/layout';

import {IGlobalEvent, GlobaEventType} from './reducer';
import {eventMessage, eventType} from './selectors';
import {dismissEvent} from './actions';

const DismissButton = styled(Title)`
transform: rotate(45deg);
`;

type StateProps = IGlobalEvent;

interface IEventContainerProps {
  eventType: GlobaEventType;
}

const GlobalEventContainer = styledTS<IEventContainerProps>()<ITheme>(styled.div)`
  position: absolute;
  top: 40px;
  right: 40px;
  border-radius: 7px;
  padding: 8px 16px;
  background-color: ${props => {
    if (props.eventType === GlobaEventType.SUCCESS) {
      return props.theme.submit;
    }
    else if (props.eventType === GlobaEventType.ERROR) {
      return props.theme.error;
    }
    return;
  }};
`;

const GlobalEvent: React.SFC<StateProps> = (props) => {
  const {
    message,
    type,
  } = props;

  if (!message || !type) {
    return null;
  }

  return (
    <GlobalEventContainer eventType={type}>
      <Flex align="center">
        <Body inverted>
          {message}
        </Body>
        <DismissButton onClick={dismissEvent.dispatch} clickable inverted marginLeft={s2}>+</DismissButton>
      </Flex>
    </GlobalEventContainer>
  );
};

export default compose<React.ComponentType>(
  connect<StateProps, {}, {}, IRootState>((state) => ({
    message: eventMessage(state),
    type: eventType(state),
  })),
)(GlobalEvent);
