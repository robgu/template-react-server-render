import fs from 'fs';

import createHistory from 'history/lib/createMemoryHistory';
import qs from 'query-string';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ReduxRouter } from 'redux-router';
import { match, reduxReactRouter } from 'redux-router/server';
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

    const template = fs.readFileSync('./index.html', 'utf-8');
    return template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  }
}

const initRoute = (server, url) => {
  return new Promise((resolve, reject) => {
    server.dispatch(match(url, (error, redirectLocation, routerState) => {
      if (error) {
        reject(error);
      } else {
        resolve([redirectLocation, routerState]);
      }
    }));
  });
};

export default async (ctx, next) => {
  try {
    const url = ctx.url;
    const server = new Server();
    await i18n.loadLang('zh-CN');
    await initRoute(server, url);
    ctx.body = server._renderToString();
  } catch (error) {
    next(error);
  }
};
