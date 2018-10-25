import gql from 'graphql-tag';
import React from 'react';
import {graphql, MutateProps} from 'react-apollo';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import styled from 'styled-components';

import { s4 } from 'app/components/styled-components/spacing';

import ScreenCenter from 'app/components/screen-center';
import { Body, Headline } from 'app/components/styled-components/text';

import Form from './form';

const FormContainer = styled.div`
  margin-top: 16px;
`;

type Props = MutateProps;

const Login: React.SFC<Props> = (props) => {

  const onSubmit = (values: FormData) => {
    props.mutate({
     variables: {
      loginInput: values,
     },
    });
  };

  return (
    <ScreenCenter>
      <Headline textAlign="center">Molehill</Headline>
      <FormContainer>
        <Form onSubmit={onSubmit}/>
      </FormContainer>
      <Body marginTop={s4} textAlign="center">Don't have an account? <Link to="/signup">Sign up</Link></Body>
    </ScreenCenter>
  );
};

export default compose(
  graphql(gql`
    mutation login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        id
        username
        email
      }
    }
  `),
)(Login);
