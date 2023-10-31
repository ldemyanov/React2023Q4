import React from 'react';
import ErrorPage from './ErrorPage';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};
type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  continueWork = () => {
    localStorage.clear();
    this.setState({ hasError: false });
  };

  componentDidCatch(error: unknown) {
    console.error('ComponentDidCatch get error', error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage continueWork={this.continueWork} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
