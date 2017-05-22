import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

render(
  React.createElement(require('./Main').default),
  document.getElementById('root')
);

