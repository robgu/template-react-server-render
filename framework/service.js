import fs from 'fs';

import express from 'express';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import logger from 'morgan';
import qs from 'query-string';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ReduxRouter } from 'redux-router';
import { match, reduxReactRouter } from 'redux-router/server';
import serialize from 'serialize-javascript';

import App, { reducer, routes } from './server';

const getMarkup = (store) => {
  const markup = renderToString(
    <Provider store={store}>
      <ReduxRouter />
    </Provider>
  );

  const initialState = `window.__initialState = ${serialize(store.getState())};`;
  const template = fs.readFileSync('./index.html', 'utf-8');
  return template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace('window.__initialState = undefined;', initialState);
};
const app = express();
app.use(logger('dev'));
app.use('/static', express.static('static'));
app.use((req, res) => {
  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? `?${query}` : '');
  const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(reducer);
  App.init(store);
  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send(getMarkup(store));
    }
  }));
});

module.exports = app.listen(8080, (err) => {
  if (err) {
        // do something
    return;
  }

  console.log('Listening at http://localhost:8080\n');
});
