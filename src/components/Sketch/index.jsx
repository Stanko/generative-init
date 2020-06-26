import React, { Component } from 'react';
import p5 from 'p5';

export default class Sketch extends Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { loop } = this.props;

    // Draw a single frame when knobs are changed and if animation is paused
    if (!loop && this.props !== prevProps) {
      this.p.draw();
    }

    // Check for loop param to play or pause the animation
    if (prevProps.loop && !loop) {
      this.p.noLoop();
    } else if (!prevProps.loop && loop) {
      this.p.loop();
    }
  }

  sketch = (p) => {
    this.p = p;

    let x = 0;
    
    p.setup = () => {
      const { loop } = this.props;
      this.ready = true;

      if (!loop) {
        p.noLoop();
      }

      p.createCanvas(400, 400);
    };

    p.draw = () => {
      if (!this.ready) {
        return;
      }
      p.background(0);
      p.fill(255);
      p.circle(150 + this.props.offset, p.noise(x / 150) * 300 + 50, 50);
      x++;
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.element.current);
  }

  render() {
    return <div ref={this.element}></div>;
  }
}
