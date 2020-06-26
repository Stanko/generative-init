import React, { Component } from 'react';
import cx from 'classnames';

import './index.scss';

export default class Button extends Component {
  render() {
    const { className, children, ...props } = this.props;

    const buttonClasses = cx('Button', className || '');

    return (
      <button className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
}
