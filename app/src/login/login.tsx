import React from 'react';

import ScreenCenter from 'app/components/screen-center';

import Form from './form';

const Login: React.SFC = () => {

  const onSubmit = (values: FormData) => {
    // tslint:disable-next-line:no-console
    console.log(values);
  }

  return (
    <ScreenCenter>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}/>
    </ScreenCenter>
  );
}

export default Login;