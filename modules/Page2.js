import connect from 'connect';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

@connect()
export default class Page2 extends Component {
  static propTypes = {
    i18n: PropTypes.func.isRequired,
  }

  render = () => {
    return (
      <div>
        { this.props.i18n('page2') }
        <div>
          <Link to="/page1">page1</Link>
          <Link to="/page2">page2</Link>
          <Link to="/page3">page3</Link>
        </div>
      </div>
    );
  }
}
