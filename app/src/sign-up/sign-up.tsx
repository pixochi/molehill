import React from 'react';
import {graphql, MutateProps} from 'react-apollo';
import { Link } from 'react-router-dom';
import {compose} from 'redux';

import { s2, s4 } from 'app/components/styled-components/spacing';

import ScreenCenter from 'app/components/screen-center';
import { Base } from 'app/components/styled-components/layout';
import { Body, Headline } from 'app/components/styled-components/text';

import Form, {ISignUpFormData} from './form';
import { signUpMutation } from './graphql';

// import {signUp, signUpSuccess} from './actions';

type Props = MutateProps;

const SignUp = (props: Props) => {

  const handleSubmit = (values: ISignUpFormData) => {
    const {passwordRepeat, ...newUser} = values;

    props.mutate({
      variables: {
        user: newUser,
      },
    });
  };

  return (
    <ScreenCenter>
      <Headline textAlign="center">Molehill</Headline>
      <Base marginTop={s2}>
        <Body textAlign="center">Sign up to see what people around you are up to</Body>
      </Base>
      <Base marginTop={s4}>
        <Form onSubmit={handleSubmit} />
      </Base>
      <Body marginTop={s4} textAlign="center">Do you have an account already? <Link to="/">Log in</Link></Body>
    </ScreenCenter>
  );
};

export default compose(
  graphql(signUpMutation),
)(SignUp);
