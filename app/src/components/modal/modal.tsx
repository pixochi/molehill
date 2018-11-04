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
import { Title } from '../styleguide/text';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: ${props => props.theme.shadowStrong};
  height: 100%;
  overflow-y: auto;
`;

const ModalContent = styled(Base)`
  background-color: ${props => props.theme.invertedText};
  border-radius: 7px;
`;

const ModalHeader = styled(Flex).attrs({
  justify: 'space-between',
  align: 'center',
})`

`;

const CloseModalButton = styled(Button)`
  font-weight: 600;
  border-radius: 50%;
  box-shadow: 0 2px 4px ${props => props.theme.shadowStrong};
  padding: 4px 12px;

  & > * {
    transform: rotate(45deg);
    font-size: 28px;
  }
`;

interface IModalProps {
  id: ModalIds;
  headerTitle?: string;
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
        children,
        isOpen,
        headerTitle,
      } = this.props;

      if (!isOpen) {
        return null;
      }

      const headerTitleElement = headerTitle ? <Title emphasized>{headerTitle}</Title> : null;

      return (
        <ModalContainer>
          <ModalContent margin={s4} padding={s4}>
            <ModalHeader>
              {headerTitleElement}
              <Flex justify="flex-end">
                <CloseModalButton
                  text="+"
                  onClick={this.handleCancelButtonClick}
                />
              </Flex>
            </ModalHeader>
            <Base marginTop={s4}>
              {children}
            </Base>
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
