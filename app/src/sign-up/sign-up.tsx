import React from 'react';
import { Link } from 'react-router-dom';

import ScreenCenter from 'app/components/screen-center';
import { Body, Headline } from 'app/components/text';

import Form, {ISignUpFormData} from './form';

const SignUp = () => {

  const handleSubmit = (values: ISignUpFormData) => {
    // tslint:disable-next-line:no-console
    console.log(values);
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

export default SignUp;
