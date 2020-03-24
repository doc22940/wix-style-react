import classNames from 'classnames';
import defaultTo from 'lodash/defaultTo';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { allValidators, extendPropTypes } from '../utils/propTypes';

import InputWithOptions from '../InputWithOptions/InputWithOptions';
import DropdownLayout from '../DropdownLayout';
import styles from './Dropdown.scss';
import deprecationLog from '../utils/deprecationLog';

const NO_SELECTED_ID = null;

class Dropdown extends InputWithOptions {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      selectedId: NO_SELECTED_ID,

      ...Dropdown.getNextState(
        props,
        defaultTo(props.selectedId, props.initialSelectedId),
      ),
    };

    if (props.hasOwnProperty('error') || props.hasOwnProperty('errorMessage')) {
      deprecationLog(
        '<Dropdown/> - error and errorMessage props are deprecated. Please use status="error" and statusMessage instead.',
      );
    }

    if (props.hasOwnProperty('help') || props.hasOwnProperty('helpMessage')) {
      deprecationLog(
        '<Dropdown/> - help and helpMessage props are deprecated. Please use <FormField/> as a wrapper instead.',
      );
    }

    if (props.hasOwnProperty('theme')) {
      deprecationLog(
        '<Dropdown/> - theme prop is deprecated, please contact us or your UX if needed.',
      );
    }
  }

  isSelectedIdControlled() {
    return typeof this.props.selectedId !== 'undefined';
  }

  static isOptionsEqual(optionsA, optionsB) {
    return isEqual(sortBy(optionsA, 'id'), sortBy(optionsB, 'id'));
  }

  getSelectedId() {
    return this.isSelectedIdControlled()
      ? this.props.selectedId
      : this.state.selectedId;
  }

  _onInputClicked(event) {
    if (
      this.state.showOptions &&
      Date.now() - this.state.lastOptionsShow > 200
    ) {
      this.hideOptions();
    } else {
      this.showOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  /**
   * Updates the value by the selectedId.
   * If selectedId is not found in options, then value is NOT changed.
   */
  static getNextState(props, selectedId) {
    if (typeof selectedId !== 'undefined') {
      const option = props.options.find(_option => {
        return _option.id === selectedId;
      });

      if (option) {
        const value = props.valueParser(option) || '';
        return { value, selectedId };
      }
    }

    return { value: '', selectedId: NO_SELECTED_ID };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedId !== this.props.selectedId ||
      !Dropdown.isOptionsEqual(this.props.options, nextProps.options)
    ) {
      this.setState(
        Dropdown.getNextState(
          nextProps,
          nextProps.selectedId,
          this.state.selectedId,
        ),
      );
    }
  }

  inputClasses() {
    return classNames(styles.showPointer, {
      [styles.noBorder]: this.props.noBorder,
    });
  }

  dropdownAdditionalProps() {
    return {
      selectedId: this.getSelectedId(),
      value: this.state.value,
      tabIndex: -1,
    };
  }

  inputAdditionalProps() {
    return {
      readOnly: false,
      disableEditing: true,
      value: this.state.value,
    };
  }

  _onSelect(option) {
    if (!this.isSelectedIdControlled()) {
      this.setState({
        value: this.props.valueParser(option),
        selectedId: option.id,
      });
    }
    super._onSelect(option);
  }

  _onChange(event) {
    this.setState({ value: event.target.value });
    super._onChange(event);
  }
}

Dropdown.propTypes = {
  ...InputWithOptions.propTypes,
  /** Sets the selected option id. (Implies Controlled mode) */
  selectedId: DropdownLayout.propTypes.selectedId,
  /** An initial selected option id. (Implies Uncontrolled mode) */
  initialSelectedId: DropdownLayout.propTypes.selectedId,
};

extendPropTypes(Dropdown, {
  selectedId: allValidators(
    DropdownLayout.propTypes.selectedId,
    (props, propName) => {
      if (
        props[propName] !== undefined &&
        props['initialSelectedId'] !== undefined
      ) {
        return new Error(
          `'selectedId' and 'initialSelectedId' cannot both be used at the same time.`,
        );
      }
    },
  ),
});

Dropdown.defaultProps = InputWithOptions.defaultProps;
Dropdown.displayName = 'Dropdown';

export default Dropdown;
