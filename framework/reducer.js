import { combineReducers } from 'redux';
import { i18n } from 'redux-pagan';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
  router,
  i18n,
});

export default rootReducer;
