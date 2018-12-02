import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IRootState } from 'src/redux/root-reducer';
import { getIsLoggedIn } from './selectors';

interface IStateProps {
  isLoggedIn: boolean;
}

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  redirectTo?: string;
}

type Props = IStateProps & IPrivateRouteProps;

export class PrivateRoute extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.renderRouteComponent = this.renderRouteComponent.bind(this);
  }

  public render() {
    const {component, ...rest} = this.props;

    return (
      <Route {...rest} render={this.renderRouteComponent} />
    );
  }

  private renderRouteComponent() {

    const {
      isLoggedIn,
      component: RouteComponent,
      redirectTo = '/',
    } = this.props;

    return isLoggedIn ? (
      <RouteComponent {...this.props} />
    ) : (
      <Redirect to={redirectTo} />
    );
  }
}

export default connect<IStateProps, {}, IPrivateRouteProps, IRootState>((state) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
  };
})(PrivateRoute);
