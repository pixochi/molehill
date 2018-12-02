import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import genericFormElement from '../generic-form-element';
import Checkbox, { ICheckboxProps } from './checkbox';

export const FormCheckbox: React.SFC<WrappedFieldProps & ICheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
    />

    );
};

export default genericFormElement(FormCheckbox);
