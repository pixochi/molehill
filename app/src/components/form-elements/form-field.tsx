import React from 'react';
import { BaseFieldProps, Field, WrappedFieldProps } from 'redux-form'
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin: 8px 0;

`;

type Props = BaseFieldProps & Partial<WrappedFieldProps> & Partial<HTMLInputElement>;

const FormField: React.SFC<Props> = (props) => {

  return (
    <FieldContainer>
      <Field {...props} />
    </FieldContainer>
  );
}

export default FormField;