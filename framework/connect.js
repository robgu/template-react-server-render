import * as redux from 'react-redux';

import { getLang } from './i18n';

let store = null;
export const init = (_store) => {
  store = _store;
};

const connect = (...args) => {
  const getProps = args[0];

  args[0] = (...params) => {
    const props = getProps ? getProps(...params) : {};
    props.i18n = getLang();
    props.dispatch = store.dispatch;
    return props;
  };

  return redux.connect(...args);
};

export default connect;
