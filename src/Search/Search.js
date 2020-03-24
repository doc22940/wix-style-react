import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import InputWithOptions from '../InputWithOptions';
import SearchIcon from 'wix-ui-icons-common/Search';

import { StringUtils } from '../utils/StringUtils';
import styles from './Search.scss';
import Input from '../Input/Input';
import deprecationLog from '../utils/deprecationLog';

// because lodash debounce is not compatible with jest timeout mocks
function debounce(fn, wait) {
  let timeout;

  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
}

/**
 * Search component with suggestions based on input value listed in dropdown
 */
class Search extends Component {
  static displayName = 'Search';

  static propTypes = {
    ...InputWithOptions.propTypes,

    /** Will display the search icon only until clicked */
    expandable: PropTypes.bool,

    /** Width used for expanded state */
    expandWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Custom function for filtering options */
    predicate: PropTypes.func,

    /** onChange debounce in milliseconds */
    debounceMs: PropTypes.number,
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    clearButton: true,
    placeholder: 'Search',
    expandable: false,
    expandWidth: '100%',
    debounceMs: 0,
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const initialValue = this._getIsControlled()
      ? props.value
      : props.defaultValue || '';

    this._onChangeHandler = this._makeOnChange();

    this.state = {
      inputValue: initialValue,
      collapsed: props.expandable && !initialValue && !props.autoFocus,
    };

    if (props.hasOwnProperty('error') || props.hasOwnProperty('errorMessage')) {
      deprecationLog(
        '<Search/> - error and errorMessage props are deprecated. Please use status="error" and statusMessage instead.',
      );
    }

    if (props.hasOwnProperty('help') || props.hasOwnProperty('helpMessage')) {
      deprecationLog(
        '<Search/> - help and helpMessage props are deprecated. Please use <FormField/> as a wrapper instead.',
      );
    }

    if (props.hasOwnProperty('theme')) {
      deprecationLog(
        '<Search/> - theme props is deprecated, please contact us or your UX if needed.',
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ inputValue: this.props.value });
    }

    if (prevProps.debounceMs !== this.props.debounceMs) {
      this._onChangeHandler = this._makeOnChange();
    }
  }

  _makeOnChange = () =>
    this.props.debounceMs > 0
      ? debounce(this.props.onChange, this.props.debounceMs)
      : this.props.onChange;

  _getIsControlled = () => 'value' in this.props && 'onChange' in this.props;

  _getFilteredOptions = () => {
    const { options, predicate } = this.props;

    const searchText = this._currentValue();
    if (!searchText || !searchText.length) {
      return options;
    }
    const filterFn = predicate || this._stringFilter;
    return options.filter(filterFn);
  };

  _stringFilter = option => {
    const searchText = this._currentValue();
    return StringUtils.includesCaseInsensitive(option.value, searchText.trim());
  };

  _onChange = e => {
    e.persist();

    this.setState(
      {
        inputValue: e.target.value,
      },
      () => {
        this._onChangeHandler(e);
      },
    );
  };

  _onClear = event => {
    const { onClear, expandable } = this.props;
    const { collapsed } = this.state;

    const stateChanges = {};

    if (this._getIsControlled()) {
      stateChanges.inputValue = '';
    }

    if (expandable && !collapsed) {
      stateChanges.collapsed = true;
      this.searchInput.input.blur();
    }

    if (!isEmpty(stateChanges)) {
      // call onClear only *after* updating the search value
      this.setState(stateChanges, () => onClear && onClear(event));
    }
  };

  _currentValue = () => this.state.inputValue;

  _onFocus = event => {
    const { onFocus } = this.props;

    if (this.state.collapsed && this.props.expandable) {
      this.setState({
        collapsed: false,
      });
    }

    onFocus && onFocus(event);
  };

  _onBlur = event => {
    const { onBlur } = this.props;

    if (!this.state.collapsed && this.props.expandable) {
      const value = this._currentValue();

      if (value === '') {
        this.setState({
          collapsed: true,
        });
      }
    }

    onBlur && onBlur(event);
  };

  _onWrapperClick = () => {
    if (this.props.expandable && this.state.collapsed) {
      this.searchInput.input.focus();
    }
  };

  _onWrapperMouseDown = e => {
    // We need to capture mouse down and prevent it's event if the input
    // is already open
    if (this.props.expandable && !this.state.collapsed) {
      const value = this._currentValue();

      if (value === '') {
        e.preventDefault();
      }
    }
  };

  render() {
    const { defaultValue, dataHook, expandWidth, ...restProps } = this.props;
    const { expandable } = restProps;
    const { collapsed, inputValue } = this.state;

    const wrapperClasses = classNames({
      [styles.expandableStyles]: expandable,
      [styles.collapsed]: collapsed && expandable,
      [styles.expanded]: !collapsed && expandable,
    });

    const contentStyle =
      expandable && !collapsed ? { width: expandWidth } : undefined;

    return (
      <div
        data-hook={dataHook}
        className={wrapperClasses}
        onClick={this._onWrapperClick}
        onMouseDown={this._onWrapperMouseDown}
      >
        <div className={styles.content} style={contentStyle}>
          <InputWithOptions
            {...restProps}
            value={inputValue}
            ref={r => (this.searchInput = r)}
            roundInput
            prefix={
              <Input.IconAffix>
                <SearchIcon />
              </Input.IconAffix>
            }
            dataHook="search-inputwithoptions"
            menuArrow={false}
            closeOnSelect
            options={this._getFilteredOptions()}
            onClear={restProps.clearButton ? this._onClear : undefined}
            onChange={this._onChange}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            highlight
          />
        </div>
      </div>
    );
  }
}

export default Search;
