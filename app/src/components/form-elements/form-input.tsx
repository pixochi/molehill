import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import styled from 'styled-components';

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

const FormInput: React.SFC<WrappedFieldProps> = (props) => {
  const {
    input,
    ...rest
  } = props;

  return (
    <StyledInput
      {...input}
      {...rest}
    />
  );
};

export default FormInput;
