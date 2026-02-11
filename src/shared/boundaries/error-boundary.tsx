"use client";

import * as Sentry from "@sentry/nextjs";
import React, { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
        tags: { boundary: "widget" },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-6 text-center">Something went wrong.</div>
        )
      );
    }

    return this.props.children;
  }
}
