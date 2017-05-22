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

export const loadLang = (lang) => {
  store.dispatch(pagan.loadLang(lang, () => {
    return translations[lang];
  }));
};

export const getLang = () => {
  return pagan.getLang(i18nState, 'app');
};

export const i18n = (...args) => {
  return getLang()(...args);
};
