import React, { Component } from 'react';
import cx from 'classnames';

import './index.scss';

export default class Input extends Component {
  render() {
    const { className, ...props } = this.props;

    const inputClasses = cx('Input', className || '');

    return (
      <input className={inputClasses} {...props} />
    );
  }
}
