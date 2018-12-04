import React, { HTMLAttributes } from 'react';
import { BaseFieldProps, Field, WrappedFieldProps } from 'redux-form';

import styled from 'app/components/styleguide';

const FieldContainer = styled.div`
  margin: 8px 0;
`;

type Props = BaseFieldProps<any> & Partial<WrappedFieldProps> &
  Partial<HTMLAttributes<any>> & Partial<HTMLInputElement> & {[attribute: string]: any};

const FormField: React.SFC<Props> = (props) => {
  return (
    <FieldContainer>
      <Field {...props}  />
    </FieldContainer>
  );
};

export default FormField;
