import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { IRootState } from 'src/redux/root-reducer';

interface IStateProps {
  isLoggedIn: boolean;
}

interface IPrivateRouteProps {
  redirectTo: string;
  component: React.ComponentType<any>;
}

type Props = IStateProps & IPrivateRouteProps;

class PrivateRoute extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.renderRouteComponent = this.renderRouteComponent.bind(this);
  }

  public render() {
    return (
      <Route {...this.props} render={this.renderRouteComponent} />
    )
  }

  private renderRouteComponent() {

    const {
      isLoggedIn,
      component: RouteComponent,
      redirectTo,
    } = this.props;

    return isLoggedIn ? (
      <RouteComponent {...this.props} />
    ) : (
      <Redirect to={{
        pathname: redirectTo
      }} />
    );
  }

}

const mapStateToProps = (state: IRootState) => {
  return {
    isLoggedIn: false,
  }
}

export default connect<IStateProps, {}, IPrivateRouteProps, IRootState>(mapStateToProps)(PrivateRoute)