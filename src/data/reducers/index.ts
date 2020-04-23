import { combineReducers } from 'redux';
import home from './home';
import elections from './elections';
import governance from './governance';
import account from './account';
import network from './network';

export default combineReducers({ home, elections, governance, account, network });
