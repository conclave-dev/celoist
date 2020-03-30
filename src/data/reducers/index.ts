import { combineReducers } from 'redux';
import home from './home';
import elections from './elections';
import governance from './governance';

export default combineReducers({ home, elections, governance });
