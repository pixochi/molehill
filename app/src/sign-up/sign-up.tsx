import gql from 'graphql-tag';
import React from 'react';
import {graphql, MutateProps} from 'react-apollo';
import { Link } from 'react-router-dom';
import {compose} from 'redux';

import ScreenCenter from 'app/components/screen-center';
import { Body, Headline } from 'app/components/text';

import Form, {ISignUpFormData} from './form';

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
      <Body textAlign="center">Sign up to see what people around you are up to</Body>
      <Form onSubmit={handleSubmit} />
      <Body textAlign="center">Do you have an account already? <Link to="/login">Log in</Link></Body>
    </ScreenCenter>
  );
};

export default compose(
  graphql(gql`
    mutation createUser($user: SignUpInput!) {
      createUser(user: $user) {
        id
        username
        email
      }
    }
  `),
)(SignUp);
