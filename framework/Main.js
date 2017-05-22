import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import { loadLang } from './i18n';
import routes from './routes';
import store from './store';

export default class Main extends Component {
  constructor(props) {
    super(props);
    loadLang(this.props.lang || 'zh-CN');
  }

  render = () => {
    return (
      <Provider store={this.props.store || store}>
        <ReduxRouter>
          {this.props.routes || routes}
        </ReduxRouter>
      </Provider>
    );
  }
}
