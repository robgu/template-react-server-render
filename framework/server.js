import * as connect from './connect';
import * as i18n from './i18n';
import reducer from './reducer';
import routes from './routes';

export default class ServerApp {
  static init = (store) => {
    connect.init(store);
    i18n.init(store);
  }
}

export {
  reducer,
  routes,
};
