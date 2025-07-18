import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Always show error for debugging
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark">
          <div className="text-center p-4 max-w-full mx-4">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-text-secondary mb-4">
              We&apos;re sorry, but something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-background-dark rounded hover:bg-primary-light transition-colors"
            >
              Refresh Page
            </button>
            {this.state.error && (
              <div className="mt-4 p-4 bg-nord-1 rounded text-left overflow-auto max-w-full">
                <p className="text-xs font-mono break-all text-error">
                  {this.state.error.toString()}
                </p>
                {this.state.error.stack && (
                  <pre className="text-xs mt-2 text-text-secondary overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;