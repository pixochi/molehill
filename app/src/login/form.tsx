import React from 'react'
import { compose } from 'redux';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form'

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
      <div>
        <Field name="email" component={FormInput} type="text" />
      </div>
      <div>
        <Field name="password" component={FormInput} type="password" />
      </div>
    </Form>
  );
}

export default compose(
  reduxForm({
    form: 'LOGIN_FORM',
  }),
)(LoginForm);