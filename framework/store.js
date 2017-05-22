import createHistory from 'history/lib/createMemoryHistory';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';

import { init } from './connect';
import { init as initI18n } from './i18n';
import reducer from './reducer';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory }),
  applyMiddleware(createLogger())
)(createStore);

const store = finalCreateStore(reducer, window.__initialState);
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    // eslint-disable-next-line global-require
    const nextReducer = require('./reducer');
    store.replaceReducer(nextReducer);
  });
}

initI18n(store);
init(store);

export default store;
