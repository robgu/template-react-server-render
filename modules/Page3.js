import connect from 'connect';
import React, { Component, PropTypes } from 'react';

@connect()
export default class Page3 extends Component {
  static propTypes = {
    i18n: PropTypes.func.isRequired,
  }

  render = () => {
    return (
      <div>
        { this.props.i18n('page3') }
      </div>
    );
  }
}
