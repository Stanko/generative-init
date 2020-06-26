import { hot } from 'react-hot-loader';

import React, { Component } from 'react';
import cx from 'classnames';
import {
  knobDefaultValues,
  knobTypes,
  knobParsers,
  knobRandomValueGenerators,
} from '../../utils/knobs';
import Knob from '../Knob';
import Button from '../Button';
import Drawing from '../Drawing';

import './index.scss';

const KNOBS = [
  {
    name: 'debug',
    type: knobTypes.BOOL,
    default: true,
    disableRandomization: true,
    // note: 'Helper text',
    // label: 'Custom label',
  },
  {
    name: 'loop',
    type: knobTypes.BOOL,
    disableRandomization: true,
    default: true,
  },
  {
    name: 'offset',
    type: knobTypes.RANGE,
    min: 0,
    step: 1,
    max: 20,
    default: 5,
  },
  {
    name: 'seed',
    type: knobTypes.SEED,
  },
];

const DEFAULT_VALUES = {};

KNOBS.forEach((knob) => {
  const hasUserDefaultValue = typeof knob.default !== 'undefined';

  DEFAULT_VALUES[knob.name] = hasUserDefaultValue
    ? knob.default
    : knobDefaultValues[knob.type];
});

class Knobs extends Component {
  constructor() {
    super();

    this.state = {
      ...DEFAULT_VALUES,
      ...this.getStateFromHash(),
      isPanelVisible: false,
    };

    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentDidMount() {
    this.setHash();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  getStateFromHash() {
    const params = window.location.hash.replace('#', '').split('/');
    params.shift();

    const state = {};

    if (params.length !== KNOBS.length) {
      // Hash is invalid
      return;
    }

    for (let index = 0; index < KNOBS.length; index++) {
      const knob = KNOBS[index];
      const key = knob.name;
      const value = params[index];

      const hasValue = typeof value !== 'undefined';
      const parser = knobParsers[knob.type];

      if (hasValue) {
        state[key] = parser ? parser(value) : value;
      } else {
        // Hash is invalid
        return;
      }
    }

    return state;
  }

  handleHashChange = () => {
    this.setState(this.getStateFromHash);
  };

  setHash = (partialState = {}) => {
    const hashState = {
      ...this.state,
      ...partialState,
    };

    window.location.hash = KNOBS.reduce((hash, item) => {
      const key = item.name;
      return (hash += `/${hashState[key]}`);
    }, '');
  };

  handleReset = () => {
    this.setHash(DEFAULT_VALUES);
  };

  handleRandomize = () => {
    const randomValues = {};

    KNOBS.forEach((knob) => {
      if (!knob.disableRandomization) {
        randomValues[knob.name] = knobRandomValueGenerators[knob.type](knob);
      }
    });

    this.setHash(randomValues);
  };

  handleTogglePanelClick = () => {
    const { isPanelVisible } = this.state;

    this.setState({
      isPanelVisible: !isPanelVisible,
    });
  };

  render() {
    const { isPanelVisible } = this.state;

    const panelClasses = cx('Knobs-panel', {
      'Knobs-panel--visible': isPanelVisible,
    });

    return (
      <div className="Knobs">
        <Button className="Knobs-toggle" onClick={this.handleTogglePanelClick}>
          ⚙️
        </Button>
        <div className={panelClasses}>
          <div className="Knobs-controls">
            {KNOBS.map((item) => {
              return (
                <Knob
                  {...item}
                  key={item.name}
                  value={this.state[item.name]}
                  setState={this.setHash}
                />
              );
            })}

            <Button className="Knobs-reset" onClick={this.handleReset}>Reset</Button>
            <Button onClick={this.handleRandomize}>Randomize</Button>
          </div>
        </div>
        <Drawing {...this.state} className="Knobs-app" />
      </div>
    );
  }
}

export default hot(module)(Knobs);
