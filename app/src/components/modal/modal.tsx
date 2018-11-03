import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import styled from 'app/components/styleguide';
import { IRootState } from 'app/redux/root-reducer';
import { getIsOpen } from './selectors';
import { ModalIds } from './constants';
import { closeModal } from './actions';
import { s4 } from '../styleguide/spacing';

import Button from '../button';
import { Base, Flex } from '../styleguide/layout';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: ${props => props.theme.shadowStrong};
  `;

const ModalContent = styled(Base)`
  background-color: ${props => props.theme.invertedText};
  border-radius: 7px;
`;

interface IModalProps {
  id: ModalIds;
  cancelButtonText?: string;
}

interface IStateProps {
  isOpen: boolean;
}

type Props = IStateProps & IModalProps;

class Modal extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  public render() {
      const {
        cancelButtonText,
        children,
        isOpen,
      } = this.props;

      if (!isOpen) {
        return null;
      }

      return (
        <ModalContainer>
          <ModalContent margin={s4} padding={s4}>
            <>
              {children}
              <Flex justify="flex-end">
                <Button
                  appearance="neutral"
                  text={cancelButtonText ? cancelButtonText : 'Close'}
                  onClick={this.handleCancelButtonClick}
                />
              </Flex>
            </>
          </ModalContent>
        </ModalContainer>
      );
  }

  private handleCancelButtonClick() {
    closeModal.dispatch(this.props.id);
  }
}

export default compose(
  connect<IStateProps, {}, IModalProps, IRootState>(
    (state, props) => ({
      isOpen: getIsOpen(state, props),
    }),
  ),
)(Modal);
