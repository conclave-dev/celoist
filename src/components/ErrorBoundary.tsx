import React, { PureComponent } from 'react';
import * as Sentry from '@sentry/browser';

const isProduction = process.env.NODE_ENV === 'production';

export default class ErrorBoundary extends PureComponent<{}, { eventId: string }> {
  constructor(props) {
    super(props);
    this.state = { eventId: '' };
  }

  componentDidCatch(error, errorInfo) {
    if (isProduction) {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        this.setState({ eventId: Sentry.captureException(error) });
      });
    }
  }

  render = () => {
    if (isProduction && this.state.eventId) {
      return <>{Sentry.showReportDialog({ eventId: this.state.eventId })}</>;
    }

    return this.props.children;
  };
}
