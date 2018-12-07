import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import styled from 'app/components/styleguide';

import genericFormElement from './generic-form-element';

export const StyledSelect = styled.select`
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

type Props = WrappedFieldProps & {
  options: Array<{
    value: string;
    label: string;
  }>
};

export const FormSelect: React.SFC<Props> = (props) => {
  return (
    <StyledSelect
      {...props}
    >
    {props.options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
    </StyledSelect>
  );
};

export default genericFormElement(FormSelect);
