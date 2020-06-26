import React, { Component } from "react";
import Sketch from '../Sketch';

export default class Drawing extends Component {
  render() {
    const { className } = this.props;

    return (
      <div className="Drawing" className={className}>
        <Sketch {...this.props} />
      </div>
    );
  }
}
