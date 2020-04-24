import { combineReducers } from 'redux';
import sidebarReducer from './sidebar';
import redirectToReducer from './redirect-to';
import resourceReducer from './resource';

const appReducers = combineReducers({
    sidebar: sidebarReducer,
    // redirectTo: redirectToReducer
    resources: resourceReducer
});

const reducers = (state,action) =>{
  return appReducers(state, action)
}

export default reducers;
