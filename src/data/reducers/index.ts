import { combineReducers } from 'redux';
import home from './home';
import elections from './elections';
import governance from './governance';
import wallets from './wallets';

export default combineReducers({ home, elections, governance, wallets });
