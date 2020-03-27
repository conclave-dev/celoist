import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';

export default createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));
