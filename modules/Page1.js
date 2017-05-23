import connect from 'connect';
import React, { Component, PropTypes } from 'react';

@connect()
export default class Page1 extends Component {
  static propTypes = {
    i18n: PropTypes.func.isRequired,
  }

  render = () => {
    return (
      <div>
        { this.props.i18n('page1') }
      </div>
    );
  }
}
