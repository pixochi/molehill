import React from 'react';
import {graphql, MutateProps} from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import {compose} from 'redux';
import { connect } from 'react-redux';

import { s2, s4 } from 'app/components/styled-components/spacing';
import { loginSuccess } from 'app/login/actions';
import { IRootState } from 'app/redux/root-reducer';
import { getIsLoggedIn } from 'app/components/private-route/selectors';

import ScreenCenter from 'app/components/screen-center';
import { Base } from 'app/components/styled-components/layout';
import { Body, Headline } from 'app/components/styled-components/text';

import Form, {ISignUpFormData} from './form';
import { signUpMutation } from './graphql';

interface IStateProps {
  isLoggedIn: boolean;
}
type Props = MutateProps & IStateProps;

const SignUp = (props: Props) => {

  if (props.isLoggedIn) {
    return <Redirect to="/overview" />;
  }

  const handleSubmit = (values: ISignUpFormData) => {
    const {passwordRepeat, ...newUser} = values;

    props.mutate({
      variables: {
        user: newUser,
      },
    }).then((response) => {
      if (response) {
        loginSuccess.dispatch(response.data.createUser);
      }
    }).catch(e => e);
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
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    isLoggedIn: getIsLoggedIn(state),
  })),
  graphql<{}, Response, ISignUpFormData>(signUpMutation),
)(SignUp);
