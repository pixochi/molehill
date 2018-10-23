import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ScreenCenter from 'app/components/screen-center';
import { Body, Headline } from 'app/components/text';

import Form from './form';

const FormContainer = styled.div`
  margin-top: 16px;
`;

const Login: React.SFC = () => {

  const onSubmit = (values: FormData) => {
    // tslint:disable-next-line:no-console
    console.log(values);
  };

  return (
    <ScreenCenter>
      <Headline textAlign="center">Molehill</Headline>
      <FormContainer>
        <Form onSubmit={onSubmit}/>
      </FormContainer>
      <Body textAlign="center">Don't have an account? <Link to="/signup">Sign up</Link></Body>
    </ScreenCenter>
  );
};

export default Login;
