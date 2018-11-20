import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import styled from 'app/components/styleguide';

import genericFormElement from './generic-form-element';

const StyledTextArea = styled.textarea`
  border-radius: 7px;
  padding: 8px;
  outline: none;
  border: 1px solid ${props => props.theme.border.default};
  font-size: 14px;
  width: 100%;
  height: ${props => props.rows ? 'auto' : '100px'};
  transition: 0.3s all;
  resize: vertical;

  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.border.focus};
    box-shadow: 0 1px 2px ${props => props.theme.shadow};
  }
`;

const FormTextArea: React.SFC<WrappedFieldProps> = (props) => {
  return (
    <StyledTextArea
      {...props}
    />
  );
};

export default genericFormElement(FormTextArea);
