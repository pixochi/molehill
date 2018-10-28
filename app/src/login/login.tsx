import React from 'react';
import {MutateProps, graphql} from 'react-apollo';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {compose} from 'redux';

import { getIsLoggedIn } from 'app/components/private-route/selectors';
import { s4 } from 'app/components/styled-components/spacing';
import { IRootState } from 'app/redux/root-reducer';
import withStateMutation, {IWithStateMutationProps} from 'app/components/higher-order/with-state-mutation';
import { updateError } from 'app/components/global-event/actions';

import ScreenCenter from 'app/components/screen-center';
import { Base } from 'app/components/styled-components/layout';
import { Body, Headline } from 'app/components/styled-components/text';

import Form from './form';

import { loginSuccess } from './actions';
import { loginMutation } from './graphql';

interface IStateProps {
  isLoggedIn: boolean;
}

type Props = IStateProps & MutateProps & IWithStateMutationProps;

const Login: React.SFC<Props> = (props) => {

  const {
    isLoggedIn,
    sMutation,
  } = props;

  if (isLoggedIn) {
    return <Redirect to="/overview" />;
  }

  const onSubmit = (values: FormData) => {
    return sMutation.mutate({
     variables: {
      loginInput: values,
     },
    }).then(response => {
      if (response) {
        loginSuccess.dispatch(response.data.login);
      }
    }).catch(e => updateError.dispatch('Invalid username/password combination.'));
  };

  return (
    <ScreenCenter>
      <Headline textAlign="center">Molehill</Headline>
      <Base marginTop={s4}>
        <Form loading={sMutation.loading} onSubmit={onSubmit}/>
      </Base>
      <Body marginTop={s4} textAlign="center">Don't have an account? <Link to="/signup">Sign up</Link></Body>
    </ScreenCenter>
  );
};

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    isLoggedIn: getIsLoggedIn(state),
  })),
  graphql(loginMutation),
  withStateMutation(),
)(Login);
