import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from 'app/redux/root-reducer';
import styled from 'app/components/styleguide';
import { s5, s4, s3 } from '../styleguide/spacing';

import { Title } from '../styleguide/text';
import {Flex, Base} from '../styleguide/layout';
import Button from '../button';
import Container from '../container';

import {IGlobalEvent} from './reducer';
import {getConfirmDialog} from './selectors';
import { ConfirmDialogType } from './constants';
import { confirmDialogChoiceObservable } from './epics';

interface IStateProps {
  confirmDialogState: IGlobalEvent;
}

const Header = styled(Base)`

`;

const ConfirmDialogContainer = styled.div<{confirmDialogType: ConfirmDialogType}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: ${props => props.theme.shadowStrong};
  height: 100%;
  overflow-y: auto;

  ${Header} {
    background-color: ${props => {
      if (props.confirmDialogType === ConfirmDialogType.WARNING) {
        return props.theme.errorDark;
      }
      return props.theme.submitLight;
    }}
  }
`;

const ContentContainer = styled(Container)`
  margin: 16px auto;
  max-width: 520px;
  overflow: hidden;
`;

const ConfirmDialog: React.SFC<IStateProps> = (props) => {
  const {
    confirmDialogState,
  } = props;

  const {
    message,
    type,
  } = confirmDialogState;

  if (!message || !type) {
    return null;
  }

  return (
    <ConfirmDialogContainer confirmDialogType={type}>
      <ContentContainer withShadow rounded noPadding direction="column">
        <Header padding={s4}>
          <Title inverted>
            {message}
          </Title>
        </Header>
        <Flex marginTop={s5} justify="flex-end" padding={s4}>
          <Base marginRight={s3}>
            <Button
              appearance={type === ConfirmDialogType.WARNING ? 'warning' : 'submit'}
              text="OK"
              onClick={() => confirmDialogChoiceObservable.next(1)}
            />
          </Base>
          <Button appearance="neutral" text="Cancel" onClick={() => confirmDialogChoiceObservable.next(0)}/>
        </Flex>
      </ContentContainer>
    </ConfirmDialogContainer>
  );
};

export default compose<React.ComponentType>(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    confirmDialogState: getConfirmDialog(state),
  })),
)(ConfirmDialog);
