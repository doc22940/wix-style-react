import { func } from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import deprecationLog from '../utils/deprecationLog';

class AutoComplete extends InputWithOptions {
  static propTypes = {
    ...InputWithOptions.propTypes,
    predicate: func,
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps,
    predicate: () => true,
  };

  constructor(props) {
    super(props);

    if (props.hasOwnProperty('error') || props.hasOwnProperty('errorMessage')) {
      deprecationLog(
        '<AutoComplete/> - error and errorMessage props are deprecated. Please use status="error" and statusMessage instead.',
      );
    }

    if (props.hasOwnProperty('help') || props.hasOwnProperty('helpMessage')) {
      deprecationLog(
        '<AutoComplete/> - help and helpMessage props are deprecated. Please use <FormField/> as a wrapper instead.',
      );
    }

    if (props.hasOwnProperty('theme')) {
      deprecationLog(
        '<AutoComplete/> - theme props is deprecated, please contact us or your UX if needed.',
      );
    }
  }

  dropdownAdditionalProps() {
    const { options, predicate, emptyStateMessage } = this.props;
    const filterFunc = this.state.isEditing ? predicate : () => true;
    const filtered = options.filter(filterFunc);

    if (emptyStateMessage && filtered.length === 0) {
      return {
        options: [
          {
            id: 'empty-state-message',
            value: emptyStateMessage,
            disabled: true,
          },
        ],
      };
    } else {
      return { options: filtered };
    }
  }
}

export default AutoComplete;
