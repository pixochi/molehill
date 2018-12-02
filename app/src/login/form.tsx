import React from 'react';
import { compose } from 'redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';

import { IFormProps } from 'app/components/form-elements/typings.d.ts';
import { LoginInput } from 'app/generated/graphql';

type Props = InjectedFormProps<LoginInput> & IFormProps;

export const LoginForm: React.SFC<Props> = props => {
  const { handleSubmit, loading } = props;

  return (
    <Form onSubmit={handleSubmit}>
        <FormField required name="email" component={FormInput} placeholder="Email address" />
        <FormField required name="password" component={FormInput} type="password" placeholder="Password" />
        <Button loading={loading} text="Log in" type="submit" appearance="submit" fullWidth/>
    </Form>
  );
};

export default compose<React.ComponentType<IFormProps>>(
  reduxForm({
    form: 'LOGIN_FORM',
  }),
)(LoginForm);
