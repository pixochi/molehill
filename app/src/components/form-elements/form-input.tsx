import React from 'react';
import { WrappedFieldProps, change } from 'redux-form';

import styled from 'app/components/styleguide';
import {Title} from 'app/components/styleguide/text';

import genericFormElement from './generic-form-element';
import store from 'app/redux/store';

export const StyledInput = styled.input`
  border-radius: 7px;
  padding: 8px;
  outline: none;
  border: 1px solid ${props => props.theme.border.default};
  font-size: 14px;
  width: 100%;
  transition: 0.3s all;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.border.focus};
    box-shadow: 0 1px 2px ${props => props.theme.shadow};
  }
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const ClearButton = styled(Title)`
  position: absolute;
  right: 8px;
  top: 4px;
  transform: rotate(45deg);
`;

interface IFormInputProps {
  name: string;
  formName?: string;
  clearable?: boolean;
}

type Props = WrappedFieldProps & IFormInputProps;

export class FormInput extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.clearInput = this.clearInput.bind(this);
  }

  public render() {
    const {
      formName,
      clearable,
      ...rest
    } = this.props;

    return (
      <InputContainer>
        <StyledInput
          {...rest}
        />
        {Boolean(formName && clearable) && (
          <ClearButton clickable onClick={this.clearInput}>+</ClearButton>
        )}
      </InputContainer>
    );
  }

  private clearInput() {
    const {
      formName,
      name,
    } = this.props;

    if (formName) {
      store.dispatch(change(formName, name, ''));
    }

  }
}

export default genericFormElement(FormInput);
