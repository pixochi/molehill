import React from 'react';

interface IStateProps {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, IStateProps> {

  public static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: any, info: any) {
    // tslint:disable-next-line:no-console
    console.log('Caught by ErrorBoundary', {error, info});
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
