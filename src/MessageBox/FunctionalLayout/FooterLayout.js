import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../Button';
import * as styles from './FooterLayout.scss';

const buttonSkinByTheme = {
  blue: 'standard',
  purple: 'premium',
  red: 'destructive',
};

const buttonSizeByHeight = {
  'x-small': 'tiny',
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
  large: 'large',
  'x-large': 'large',
};

const FooterLayout = ({
  bottomChildren,
  children,
  theme,
  cancelText,
  cancelPrefixIcon,
  cancelSuffixIcon,
  onCancel,
  onOk,
  confirmText,
  confirmPrefixIcon,
  confirmSuffixIcon,
  buttonsHeight,
  enableOk,
  enableCancel,
  sideActions,
}) => {
  const footerButtonsClassNames = classNames(styles.footerbuttons, {
    [styles.withSideActions]: sideActions && (cancelText || confirmText),
  });
  return (
    <div>
      <div className={styles.footer} data-hook="message-box-footer">
        {sideActions}
        {children}
        <div className={footerButtonsClassNames}>
          {cancelText && (
            <Button
              prefixIcon={cancelPrefixIcon}
              suffixIcon={cancelSuffixIcon}
              disabled={!enableCancel}
              size={buttonSizeByHeight[buttonsHeight]}
              priority="secondary"
              skin={buttonSkinByTheme[theme]}
              onClick={onCancel}
              dataHook="cancellation-button"
              children={cancelText}
            />
          )}
          {confirmText && (
            <Button
              prefixIcon={confirmPrefixIcon}
              suffixIcon={confirmSuffixIcon}
              disabled={!enableOk}
              size={buttonSizeByHeight[buttonsHeight]}
              priority="primary"
              skin={buttonSkinByTheme[theme]}
              onClick={onOk}
              dataHook="confirmation-button"
              children={confirmText}
            />
          )}
        </div>
      </div>

      {bottomChildren && (
        <div
          data-hook="footer-layout-bottom-children"
          className={styles.bottomChildren}
          children={bottomChildren}
        />
      )}
    </div>
  );
};

FooterLayout.propTypes = {
  confirmText: PropTypes.node,
  confirmPrefixIcon: PropTypes.element,
  confirmSuffixIcon: PropTypes.element,
  cancelText: PropTypes.node,
  cancelPrefixIcon: PropTypes.element,
  cancelSuffixIcon: PropTypes.element,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  enableOk: PropTypes.bool,
  enableCancel: PropTypes.bool,
  theme: PropTypes.string,
  buttonsHeight: PropTypes.string,
  children: PropTypes.any,
  bottomChildren: PropTypes.node,
  sideActions: PropTypes.node,
};

FooterLayout.defaultProps = {
  theme: 'blue',
  buttonsHeight: 'small',
  enableOk: true,
  enableCancel: true,
};

export default FooterLayout;
