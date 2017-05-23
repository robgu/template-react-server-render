import fs from 'fs';

import createHistory from 'history/lib/createMemoryHistory';
import qs from 'query-string';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ReduxRouter } from 'redux-router';
import { reduxReactRouter } from 'redux-router/server';
import { match } from 'redux-router/server';
import serialize from 'serialize-javascript';

import * as connect from './connect';
import * as i18n from './i18n';
import reducer from './reducer';
import routes from './routes';

class Server {
  constructor() {
    this._store = reduxReactRouter({ routes, createHistory })(createStore)(reducer);

    connect.init(this._store);
    i18n.init(this._store);
    i18n.loadLang('zh-CN');
  }

  dispatch = (...args) => {
    this._store.dispatch(...args);
  }

  _renderToString = () => {
    const markup = renderToString(
      <Provider store={this._store}>
        <ReduxRouter />
      </Provider>
    );

    const initialState = `window.__initialState = ${serialize(this._store.getState())};`;
    const template = fs.readFileSync('./index.html', 'utf-8');
    return template
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      .replace('window.__initialState = undefined;', initialState);
  }
}

export default (req, res) => {
  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? `?${query}` : '');
  const server = new Server();
  server.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!routerState) {
      res.status(400).send('Not Found');
    } else {
      res.status(200).send(server._renderToString());
    }
  }));
};
