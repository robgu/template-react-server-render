import _ from 'lodash';
import * as pagan from 'redux-pagan';

const translations = {
  // eslint-disable-next-line global-require
  'en-US': require('./en-US').default,
  // eslint-disable-next-line global-require
  'zh-CN': require('./zh-CN').default,
};

let store = null;

export const init = (_store) => {
  store = _store;
};

export const loadLang = async (lang) => {
  await pagan.loadLang(lang, () => {
    return translations[lang];
  })(store.dispatch);
};

export const getLang = () => {
  const i18n = store.getState().i18n;
  return pagan.getLang(i18n, 'app');
};

export const i18n = (...args) => {
  return getLang()(...args);
};
