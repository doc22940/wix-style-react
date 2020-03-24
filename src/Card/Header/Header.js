import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';
import Heading from '../../Heading';
import Text from '../../Text';

const isString = a => typeof a === 'string';

class Header extends React.PureComponent {
  static displayName = 'Card.Header';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** required card title */
    title: PropTypes.node.isRequired,

    /** any string to be rendered below title */
    subtitle: PropTypes.node,

    suffix: PropTypes.node,
  };

  static defaultProps = {
    subtitle: null,
    suffix: null,
  };

  render() {
    const { dataHook, title, subtitle, suffix } = this.props;

    return (
      <div data-hook={dataHook}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            {isString(title) ? (
              <Heading dataHook="title" appearance="H3" children={title} />
            ) : (
              <span data-hook="title">{title}</span>
            )}

            {subtitle && isString(subtitle) ? (
              <Text dataHook="subtitle" children={subtitle} secondary />
            ) : (
              <span data-hook="subtitle">{subtitle}</span>
            )}
          </div>

          {suffix && (
            <div
              data-hook="suffix"
              className={styles.suffix}
              children={suffix}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Header;
