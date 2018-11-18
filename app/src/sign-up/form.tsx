import React from 'react';
import { compose } from 'redux';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';

import Button from 'app/components/button';
import FormField from 'app/components/form-elements/form-field';
import FormInput from 'app/components/form-elements/form-input';

import { email, maxLength, minLength } from 'app/helpers/form-validation';
import { SignUpInput } from 'app/generated/graphql';

const minLength3 = minLength(3);
const maxLength24 = maxLength(24);

export interface ISignUpFormData extends SignUpInput {
  passwordRepeat: string;
}

type Props = InjectedFormProps<ISignUpFormData>;

const SignUpForm: React.SFC<Props> = props => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
        <FormField
          required
          validate={email}
          type="email"
          name="email"
          component={FormInput}
          placeholder="Email address"
        />
        <FormField
          required
          validate={[minLength3, maxLength24]}
          name="username"
          component={FormInput}
          placeholder="Username"
        />
        <FormField required name="password" component={FormInput} type="password" placeholder="Password" />
        <FormField required name="passwordRepeat" component={FormInput} type="password" placeholder="Repeat password" />
        <Button text="Sign up" type="submit" appearance="submit" fullWidth />
    </Form>
  );
};

const validate = (values: ISignUpFormData) => {
  const errors: Partial<ISignUpFormData> = {};

  if (values.password !== values.passwordRepeat) {
    errors.passwordRepeat = `Those passwords didn't match. Try again.`;
  }
  return errors;
};

export default compose(
  reduxForm({
    form: 'SIGNUP_FORM',
    validate,
  }),
)(SignUpForm);
