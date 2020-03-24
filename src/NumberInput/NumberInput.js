import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import deprecationLog from '../utils/deprecationLog';

class NumberInput extends React.PureComponent {
  static displayName = 'NumberInput';

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value: this._defaultValueNullIfEmpty(value),
    };

    if (props.hasOwnProperty('error') || props.hasOwnProperty('errorMessage')) {
      deprecationLog(
        '<NumberInput/> - error and errorMessage props are deprecated. Please use status="error" and statusMessage instead.',
      );
    }

    if (props.hasOwnProperty('help') || props.hasOwnProperty('helpMessage')) {
      deprecationLog(
        '<NumberInput/> - help and helpMessage props are deprecated. Please use <FormField/> as a wrapper instead.',
      );
    }

    if (props.hasOwnProperty('theme')) {
      deprecationLog(
        '<NumberInput/> - theme prop is deprecated, please contact us or your UX if needed.',
      );
    }
  }

  UNSAFE_componentWillReceiveProps({ value }) {
    this.setState({
      value: this._defaultValueNullIfEmpty(value),
    });
  }

  _isInvalidNumber(value) {
    return ['.', '-', undefined, ''].includes(value);
  }

  _defaultValueNullIfEmpty(value = this.props.defaultValue) {
    return value == null || value === '' ? null : Number(value);
  }

  _defaultValueToNullIfInvalidNumber(value) {
    return this._isInvalidNumber(value) ? null : Number(value);
  }

  _getInputValueFromState() {
    const { value } = this.state;
    const { defaultValue } = this.props;

    if (value != null) {
      return value;
    }

    return defaultValue || '';
  }

  _isInRange(value) {
    const { min, max } = this.props;
    return !(!isNaN(min) && value < min) && !(!isNaN(max) && value > max);
  }

  _increment = () => {
    this._applyChange((value, step) => value + step);
  };

  _decrement = () => {
    this._applyChange((value, step) => value - step);
  };

  _applyChange(operator) {
    const { value, step } = this.props,
      numberValue = parseFloat(value || this.inputDOM.value) || 0,
      numberStep = step,
      updatedValue = operator(numberValue, numberStep);
    if (this._isInRange(updatedValue)) {
      this._triggerOnChange(updatedValue);
    }
  }

  _triggerOnChange(value) {
    const { onChange } = this.props;
    this.setState(
      {
        value,
      },
      () =>
        onChange && onChange(this._defaultValueToNullIfInvalidNumber(value)),
    );
  }

  _applyStrictValue(value) {
    const { min, max } = this.props;
    if (this._isInRange(value) || this._isInvalidNumber(value)) {
      return value;
    }
    const dMax = max - value;
    const dMin = min - value;
    if (!dMax) {
      return min;
    }
    if (!dMin) {
      return max;
    }
    return Math.abs(dMax) < Math.abs(dMin) ? max : min;
  }

  _inputValueChanged = e => {
    const { strict } = this.props;
    if (strict) {
      return this._triggerOnChange(this._applyStrictValue(e.target.value));
    }
    return this._triggerOnChange(e.target.value);
  };

  _getInputRef = ref => {
    const { inputRef } = this.props;
    this.inputDOM = ref;
    if (inputRef) {
      inputRef(ref);
    }
  };

  render() {
    // <Input/> should always be controlled. Therefore, not passing defaultValue to <Input/>.
    const { suffix, defaultValue, ...props } = this.props;

    return (
      <Input
        {...props}
        type="number"
        value={this._getInputValueFromState()}
        onChange={this._inputValueChanged}
        inputRef={this._getInputRef}
        suffix={
          <Input.Group>
            {suffix}
            <Input.Ticker
              onUp={this._increment}
              onDown={this._decrement}
              dataHook="number-input-ticker"
            />
          </Input.Group>
        }
      />
    );
  }
}

NumberInput.propTypes = {
  ...Input.propTypes,
  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.number,
  /** If set to true - typing values beyond `min`/`max` values will round to nearest range  */
  strict: PropTypes.bool,
};

NumberInput.defaultProps = {
  step: 1,
  strict: false,
};
export default NumberInput;
