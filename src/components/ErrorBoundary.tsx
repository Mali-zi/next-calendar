'use client';

import React, { ErrorInfo } from 'react';

type Props = {
  readonly children: React.ReactNode | React.ReactNode[];
};

type State = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  public static readonly defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen justify-center text-center font-semibold text-2xl text-red-500 p-4 m-4">
          <h2>Ooops! Something went wrong</h2>
          <h3>Try to reload the page...</h3>

          {this.state.error ? (
              <p>{this.state.error.name}: {this.state.error.message}</p>
          ) : (
            <></>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
