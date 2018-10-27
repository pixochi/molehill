import React from 'react';
import {graphql, MutateProps} from 'react-apollo';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {compose} from 'redux';

import { getIsLoggedIn } from 'app/components/private-route/selectors';
import { s4 } from 'app/components/styled-components/spacing';
import { IRootState } from 'app/redux/root-reducer';

import ScreenCenter from 'app/components/screen-center';
import { Base } from 'app/components/styled-components/layout';
import { Body, Headline } from 'app/components/styled-components/text';

import Form from './form';

import { loginSuccess } from './actions';
import { loginMutation } from './graphql';

interface IStateProps {
  isLoggedIn: boolean;
}

type Props = IStateProps & MutateProps;

const Login: React.SFC<Props> = (props) => {

  if (props.isLoggedIn) {
    return <Redirect to="/overview" />;
  }

  const onSubmit = (values: FormData) => {
    return props.mutate({
     variables: {
      loginInput: values,
     },
    }).then(response => {
      if (response) {
        loginSuccess.dispatch(response.data.login);
      }
    }).catch(e => e);
  };

  return (
    <ScreenCenter>
      <Headline textAlign="center">Molehill</Headline>
      <Base marginTop={s4}>
        <Form onSubmit={onSubmit}/>
      </Base>
      <Body marginTop={s4} textAlign="center">Don't have an account? <Link to="/signup">Sign up</Link></Body>
    </ScreenCenter>
  );
};

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    isLoggedIn: getIsLoggedIn(state),
  })),
  graphql<{}, Response, FormData>(loginMutation),
)(Login);
