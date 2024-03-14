'use client'

import React, { ErrorInfo } from 'react';

type Props = {
  readonly children: React.ReactNode | React.ReactNode[];
}

type State = {
  readonly error: Error | null;
  readonly errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public static readonly defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col text-center text-red-500 p-4 m-4">
          <h2>Ooops! Something went wrong</h2>
          <h3>Try to reload the page...</h3>
          <p>{this.state.error.name}</p>
          <p>{this.state.error.message}</p>
          <p>{this.state.error.toString()}</p>

          <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}