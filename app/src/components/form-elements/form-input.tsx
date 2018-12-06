import React, { ChangeEvent } from 'react';
import { WrappedFieldProps, change } from 'redux-form';

import styled from 'app/components/styleguide';
import {store} from 'app/redux/internals';
import { s1 } from '../styleguide/spacing';

import {Body, Title} from 'app/components/styleguide/text';

import genericFormElement from './generic-form-element';

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
  value?: string;
  maxLength?: number;
  formName?: string;
  clearable?: boolean;
}

type Props = WrappedFieldProps & IFormInputProps;

export class FormInput extends React.Component<Props, {currentInputValue: string}> {

  constructor(props: Props) {
    super(props);
    this.clearInput = this.clearInput.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.state = {
      currentInputValue: props.value || '',
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        currentInputValue: nextProps.value || '',
      });
    }
  }

  public render() {
    const {
      formName,
      clearable,
      maxLength,
      ...rest
    } = this.props;

    return (
      <InputContainer>
        <StyledInput
          {...rest}
          onChange={this.handleInputValueChange}
          value={this.state.currentInputValue}
          maxLength={maxLength}
        />
        {Boolean(formName && clearable) && (
          <ClearButton clickable onClick={this.clearInput}>+</ClearButton>
        )}
        {Boolean(maxLength) && (
          <Body disabled marginTop={s1}>{this.state.currentInputValue.length}/{maxLength}</Body>
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

  private handleInputValueChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      currentInputValue: event.target.value,
    });
  }
}

export default genericFormElement(FormInput);
