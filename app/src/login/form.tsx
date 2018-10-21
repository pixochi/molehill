import React from 'react'
import { compose } from 'redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form'

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';

interface IFormData {
  email: string;
  password: string;
}

type Props = InjectedFormProps<IFormData>;

const LoginForm: React.SFC<Props> = props => {
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
        <FormField name="email" component={FormInput} placeholder="Email address" />
        <FormField name="password" component={FormInput} type="password" placeholder="Password" />
        <Button type="submit" appearance="submit" fullWidth={true} />
    </Form>
  );
}

export default compose(
  reduxForm({
    form: 'LOGIN_FORM',
  }),
)(LoginForm);