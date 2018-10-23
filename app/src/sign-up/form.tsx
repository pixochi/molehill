import React from 'react';
import { compose } from 'redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';

export interface ISignUpFormData {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

type Props = InjectedFormProps<ISignUpFormData>;

const SignUpForm: React.SFC<Props> = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
        <FormField required name="email" component={FormInput} placeholder="Email address" />
        <FormField required name="username" component={FormInput} placeholder="Username" />
        <FormField required name="password" component={FormInput} type="password" placeholder="Password" />
        <FormField required name="passwordRepeat" component={FormInput} type="password" placeholder="Repeat password" />
        <Button text="Sign up" type="submit" appearance="submit" fullWidth={true} />
    </Form>
  );
};

export default compose(
  reduxForm({
    form: 'SIGNUP_FORM',
  }),
)(SignUpForm);
