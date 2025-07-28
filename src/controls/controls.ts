import { toCamelCase, toKebabCase, toSpaceCase } from '../utils/string-utils';
import { BooleanControl } from './control-boolean';
import { DualRangeControl } from './control-dual-range';
import { EasingControl } from './control-easing';
import { RadioControl } from './control-radio';
import { RangeControl } from './control-range';
import { SeedControl } from './control-seed';
import { createElement, Dice5 } from 'lucide';

export type ControlType = 'boolean' | 'range' | 'radio' | 'seed' | 'easing' | 'dual-range';

export type ControlChangeHandler<T> = (name: string, value: T) => void;

export type ControlConfig<T = unknown, O = unknown> = {
  type: ControlType;
  name: string;
  label?: string;
  defaultValue?: T;
  isRandomizationDisabled?: boolean;
  onChange?: ControlChangeHandler<T>;
  options?: O;
};

export interface Control<T> {
  name: string;
  label: string;
  type: ControlType;
  isRandomizationDisabled: boolean;
  onChange: ControlChangeHandler<T>;
  parse: (value: string) => T;
  getRandomValue: () => T;
  getDefaultValue: () => T;
  buildUI: () => unknown;
  valueToString: (value?: T) => string;
  update: (value: T) => void;
  element: HTMLElement;
}

export type ControlComponent =
  | BooleanControl
  | RangeControl
  | RadioControl
  | SeedControl
  | EasingControl
  | DualRangeControl;
export type ControlConstructor<T> = new (...args: any[]) => T;

const controlMap: Record<ControlType, ControlConstructor<ControlComponent>> = {
  boolean: BooleanControl,
  range: RangeControl,
  radio: RadioControl,
  seed: SeedControl,
  easing: EasingControl,
  'dual-range': DualRangeControl,
};

type HashItem = { name: string; value: unknown };

export class Controls {
  controls: ControlComponent[];
  controlsMap: Record<string, ControlComponent> = {};

  onChange?: () => void;

  constructor(controls: ControlConfig[]) {
    this.controls = controls.map((config) => {
      const onChange = () =>
        // name: string, value: unknown
        {
          this.setHash();
        };

      // TODO
      // Document this behaviour
      // This might counter-intuitive for some people,
      // but it is my personal preference to have properties named in camel case
      // when using them in code
      //
      // However, they are going to be converted to kebab case when used in the hash,
      // because it is nicer that URL be all lowercase
      config.name = toCamelCase(config.name);

      // TODO
      // Again, document as it is my personal preference
      if (!config.label) {
        config.label = toSpaceCase(config.name);
      }

      const ControlComponent = controlMap[config.type];

      const control = new ControlComponent(config, onChange);

      this.controlsMap[control.name] = control;

      return control;
    });

    this.addListeners();
  }

  addToContainer = (container: HTMLElement) => {
    this.controls.forEach((control) => {
      container.appendChild(control.element);
    });

    const randomizeButton = document.createElement('button');
    randomizeButton.classList.add('controls-randomize');
    randomizeButton.textContent = 'Randomize';
    randomizeButton.appendChild(createElement(Dice5));
    randomizeButton.addEventListener('click', this.randomize);
    container.appendChild(randomizeButton);
  };

  addListeners = () => {
    window.addEventListener('hashchange', () => {
      this.updateFromHash();
    });

    // Update all inputs using initial values from the hash
    this.updateFromHash();
    // Update the hash to make sure all values are reflected in the URL
    // TODO this might not be mandatory, but I think it is a nicer UX
    this.setHash();
  };

  setHash = () => {
    const values = this.controls
      .map((control) => {
        return `${toKebabCase(control.name)}:${control.valueToString()}`;
      })
      .join('/');

    window.location.hash = `#/${values}`;
  };

  // TODO
  //
  // I separated parseHash from updateFromHash with an idea to use it to
  // set values in the constuctor, before the UI is built.
  // But because parseHash depends on the controlsMap which is not yet initialized,
  // I decided to just call updateFromHash after the controlsMap is initialized.
  //
  // I'll leave parseHash and updateFromHash separated for now,
  // but if it doesn't find it mandatory I'll merge them again for simplicity.
  parseHash = (): HashItem[] => {
    const hash = window.location.hash.slice(2); // Remove the leading '#/'
    const pairs = hash.split('/');

    const items: HashItem[] = [];

    pairs.forEach((pair) => {
      const [kebabCaseName, value] = pair.split(':');
      const name = toCamelCase(kebabCaseName);
      const control = this.controlsMap[name];

      if (control) {
        const parsed = control.parse(value);

        items.push({
          name,
          value: parsed,
        });
      }
    });

    return items;
  };

  updateFromHash = () => {
    const items = this.parseHash();

    console.log('update from hash', this.getOptions());

    items.forEach((item) => {
      const { name, value } = item;
      const control = this.controlsMap[name];

      if (control && value !== control.value) {
        control.update(value as never);
      }
    });

    this.onChange?.();
  };

  getOptions = () => {
    const options: Record<string, unknown> = {};

    this.controls.forEach((control) => {
      options[control.name] = control.value;

      if (control.type === 'easing') {
        options[control.name + 'Easing'] = (control as EasingControl).easing;
      } else if (control.type === 'seed') {
        options[control.name + 'Rng'] = (control as SeedControl).rng;
      }
    });

    return options;
  };

  randomize = () => {
    this.controls.forEach((control) => {
      if (control.isRandomizationDisabled) {
        return;
      }

      control.value = control.getRandomValue();
      control.update(control.value as never);
    });

    this.setHash();
  };
}
