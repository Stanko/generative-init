import React, { Component, Fragment } from 'react';
import Slider from '@material-ui/core/Slider';
import throttle from 'lodash.throttle';
import Input from '../Input';
import Button from '../Button';

import generateRandomString from '../../utils/generate-random-string';
import { knobTypes } from '../../utils/knobs';

import './index.scss';

export function convertCamelCase(string) {
  return string.replace(/^[a-z]|[A-Z]/g, function (v, i) {
    return i === 0 ? v.toUpperCase() : ' ' + v.toLowerCase();
  });
}

export default class Knob extends Component {
  constructor(props) {
    super(props);

    this.typeMapper = {
      [knobTypes.BOOL]: this.renderCheckbox,
      [knobTypes.SEED]: this.renderSeed,
      [knobTypes.RANGE]: this.renderRange,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.debounceTimeout);
  }

  handleRandomClick = () => {
    const { name, setState } = this.props;

    setState({
      [name]: generateRandomString(),
    });
  };

  onChange = (value) => {
    const { name, setState } = this.props;

    setState({
      [name]: value,
    });
  };

  onTextInputChange = (e) => {
    this.onChange(e.target.value);
  };

  onCheckboxChange = (e) => {
    this.onChange(e.target.checked);
  };

  onSliderChange = (e, value) => {
    this.onChange(value);
  };

  onSliderChangeThrottled = throttle(this.onSliderChange, 50);

  renderRange = () => {
    const {
      name,
      label,
      disableRandomization,
      type,
      note,
      setState,
      value,
      min,
      max,
      step,
      ...props
    } = this.props;

    return (
      <Fragment>
        <label htmlFor={name} className="Knob-label">
          {label || convertCamelCase(name)}
        </label>
        <div className="Knob-inputWrapper Knob-inputWrapper--range">
          <Slider
            {...props}
            min={min}
            max={max}
            step={step}
            name={name}
            id={name}
            className="Knob-input Knob-input--range"
            value={value}
            onChange={this.onSliderChangeThrottled}
            valueLabelDisplay="auto"
          />
          <div className="Knob-value">{value.toString()}</div>
        </div>
      </Fragment>
    );
  };

  renderCheckbox = () => {
    const {
      name,
      label,
      disableRandomization,
      type,
      note,
      setState,
      value,
      ...props
    } = this.props;

    return (
      <label htmlFor={name} className="Knob-label">
        <input
          {...props}
          type="checkbox"
          name={name}
          id={name}
          className="Knob-checkbox"
          checked={value}
          onChange={this.onCheckboxChange}
        />
        {label || convertCamelCase(name)}
      </label>
    );
  };

  renderSeed = () => {
    const {
      name,
      label,
      disableRandomization,
      type,
      note,
      setState,
      value,
      ...props
    } = this.props;

    return (
      <Fragment>
        <label htmlFor={name} className="Knob-label">
          {label || convertCamelCase(name)}
        </label>
        <div className="Knob-inputWrapper Knob-inputWrapper--seed">
          <Input
            {...props}
            type="text"
            name={name}
            id={name}
            className="Knob-input Knob-input--seed"
            value={value}
            onChange={this.onTextInputChange}
          />
          <Button className="Knob-randomize" onClick={this.handleRandomClick}>
            🎲
          </Button>
        </div>
      </Fragment>
    );
  };

  render() {
    const { note, type } = this.props;

    const renderMethod = this.typeMapper[type];

    return (
      <div className="Knob">
        {renderMethod()}
        {note && <div className="Knob-note">{note}</div>}
      </div>
    );
  }
}
