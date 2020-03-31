import React, { memo } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Router from './Router';
import Topbar from './presentational/navigation/Topbar';
import Sidebar from './presentational/navigation/Sidebar';

const App = () => (
  <ErrorBoundary>
    <div id="layout-wrapper">
      <Topbar />
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <Sidebar />
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <Router />
        </div>
      </div>
    </div>
  </ErrorBoundary>
);

export default memo(App);
