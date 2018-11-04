import React from 'react';
import { compose } from 'redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';

import { IFormProps } from 'app/components/form-elements/typings';

export interface IFormData {
  title: string;
  description: string;
}

type Props = InjectedFormProps<IFormData> & IFormProps;

const AddStatusForm: React.SFC<Props> = props => {
  const { handleSubmit, loading } = props;

  return (
    <Form onSubmit={handleSubmit}>
        <FormField required name="title" component={FormInput} placeholder="Title" />
        <FormField name="description" component={FormInput} placeholder="Description" />
        <FormField name="location" component={FormInput} placeholder="Location" />
        <Button loading={loading} text="+ Add" type="submit" appearance="submit" fullWidth={true} />
    </Form>
  );
};

export default compose<React.ComponentType<IFormProps>>(
  reduxForm({
    form: 'ADD_STATUS_FORM',
  }),
)(AddStatusForm);
