import 'bootstrap/dist/css/bootstrap.css';
import './style/scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import store from './data';

Sentry.init({
  dsn: 'https://7ed44945ccc042f08e30517a9c699dbf@sentry.io/2866324',
  environment: process.env.NODE_ENV || 'development'
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
