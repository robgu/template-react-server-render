import Page1 from 'modules/Page1';
import Page2 from 'modules/Page2';
import Page3 from 'modules/Page3';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default (
  <Route path="/" >
    <IndexRoute components={Page1} />
    <Route path="/page1" component={Page1} />
    <Route path="/page2" component={Page2} />
    <Route path="/page3" component={Page3} />
  </Route>
);
