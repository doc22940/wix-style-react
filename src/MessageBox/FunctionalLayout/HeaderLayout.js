import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseButton from '../../CloseButton';
import styles from './HeaderLayout.scss';

const HeaderLayout = ({ title, onCancel, theme, closeButton }) => {
  return (
    <div
      className={classNames(styles.header, styles[theme])}
      data-hook="header-layout"
    >
      <span className={styles.titleLabel} data-hook="header-layout-title">
        {title}
      </span>
      {closeButton ? (
        <CloseButton
          dataHook="header-close-button"
          size="medium"
          skin="lightFilled"
          onClick={onCancel}
        />
      ) : null}
    </div>
  );
};

HeaderLayout.defaultProps = {
  theme: 'blue',
  closeButton: true,
};

HeaderLayout.propTypes = {
  title: PropTypes.node,
  onCancel: PropTypes.func,
  closeButton: PropTypes.bool,
  theme: PropTypes.oneOf(['red', 'blue', 'purple']),
};

export default HeaderLayout;
