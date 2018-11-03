import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import styled from 'app/components/styleguide';
import { s2 } from '../styleguide/spacing';

import {Body} from 'app/components/styleguide/text';

const StyledInput = styled.input`
  border-radius: 7px;
  padding: 8px;
  outline: none;
  border: 1px solid ${props => props.theme.border.default};
  font-size: 16px;
  width: 100%;
  transition: 0.3s all;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.border.focus};
    box-shadow: 0 1px 2px ${props => props.theme.shadow};
  }
`;

const InputMessage = styled(Body)`
  color: ${props => props.theme.error};
`;

const FormInput: React.SFC<WrappedFieldProps> = (props) => {
  const {
    input,
    meta: { touched, error, warning },
    ...rest
  } = props;

  let inputMessage: string | undefined;
  inputMessage = warning && warning;
  inputMessage = error && error;

  return (
    <>
      <StyledInput
        {...input}
        {...rest}
      />
      {touched && <InputMessage marginTop={s2}>{inputMessage}</InputMessage>}
    </>
  );
};

export default FormInput;
