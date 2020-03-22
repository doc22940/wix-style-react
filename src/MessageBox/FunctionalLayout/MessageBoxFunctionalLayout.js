import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import throttle from 'lodash/throttle';

import { generateDataAttr } from '../../utils/generateDataAttr';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from './MessageBoxFunctionalLayout.scss';

class MessageBoxFunctionalLayout extends WixComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasScroll: false,
      scrolledToBottom: false,
    };
    this.messageBoxRef = null;
  }

  componentWillUnmount() {
    if (this.state.hasScroll) {
      this.messageBoxRef.removeEventListener(
        'scroll',
        this._handleMessageBoxScroll,
      );
    }
  }

  _initializeMessageBoxRef = el => {
    if (el && el.scrollHeight > el.clientHeight) {
      this.setState({ hasScroll: true });

      this.messageBoxRef = el;
      this.messageBoxRef.addEventListener(
        'scroll',
        this._handleMessageBoxScroll,
      );
    }
  };

  _handleMessageBoxScroll = throttle(() => {
    const scrolledToBottom =
      this.messageBoxRef.scrollTop + this.messageBoxRef.clientHeight ===
      this.messageBoxRef.scrollHeight;

    if (scrolledToBottom !== this.state.scrolledToBottom) {
      this.setState({ scrolledToBottom });
    }
  }, 16);

  _renderContent = () => {
    const {
      children,
      hideFooter,
      noBodyPadding,
      maxHeight,
      fullscreen,
      withEmptyState,
    } = this.props;
    const { hasScroll, scrolledToBottom } = this.state;

    const messageBoxBodyClassNames = classNames(styles.body, {
      [styles.scrollable]: typeof maxHeight !== 'undefined',
      [styles.noPadding]: noBodyPadding,
      [styles.fullscreenBody]: fullscreen,
      [styles.noFooter]: hideFooter,
      [styles.footerBorder]: hasScroll && !scrolledToBottom,
      [styles.withEmptyState]: withEmptyState,
    });

    const messageBoxBodyStyle = {
      maxHeight,
    };

    return (
      <div
        data-hook="message-box-body"
        className={messageBoxBodyClassNames}
        style={messageBoxBodyStyle}
        ref={this._initializeMessageBoxRef}
      >
        {children}
      </div>
    );
  };

  render() {
    const { theme } = this.props;
    const {
      title,
      onCancel,
      onOk,
      onClose,
      confirmText,
      confirmPrefixIcon,
      confirmSuffixIcon,
      cancelText,
      cancelPrefixIcon,
      cancelSuffixIcon,
      buttonsHeight,
      hideFooter,
      footerBottomChildren,
      closeButton,
      disableConfirmation,
      disableCancel,
      width,
      margin,
      noBodyPadding,
      fullscreen,
      withEmptyState,
      sideActions,
      image,
    } = this.props;

    const contentClassName = classNames(styles.content, {
      [styles.fullscreenContent]: fullscreen,
    });

    const imageClassName = classNames(styles.image, {
      [styles.withFooterAction]: sideActions,
      [styles.noPadding]: noBodyPadding,
    });

    return (
      <div
        className={contentClassName}
        style={{ width, margin }}
        {...generateDataAttr(this.props, ['noBodyPadding', 'theme'])}
      >
        <HeaderLayout
          title={title}
          onCancel={onClose ? onClose : onCancel}
          theme={theme}
          closeButton={closeButton}
        />
        {image && !withEmptyState ? (
          <div className={styles.messageWithImage}>
            <div className={imageClassName} children={image} />
            {this._renderContent()}
          </div>
        ) : (
          this._renderContent()
        )}
        {!hideFooter ? (
          <FooterLayout
            bottomChildren={footerBottomChildren}
            enableCancel={!disableCancel}
            enableOk={!disableConfirmation}
            buttonsHeight={buttonsHeight}
            confirmText={confirmText}
            confirmPrefixIcon={confirmPrefixIcon}
            confirmSuffixIcon={confirmSuffixIcon}
            cancelText={cancelText}
            cancelPrefixIcon={cancelPrefixIcon}
            cancelSuffixIcon={cancelSuffixIcon}
            onCancel={onCancel}
            onOk={onOk}
            theme={theme}
            sideActions={sideActions}
          />
        ) : null}
      </div>
    );
  }
}

MessageBoxFunctionalLayout.propTypes = {
  /** Hides the footer that contains the action buttons */
  hideFooter: PropTypes.bool,
  /** Defines the main action button text */
  confirmText: PropTypes.node,
  /** Add a prefix icon for the main action button */
  confirmPrefixIcon: PropTypes.element,
  /** Add a suffix icon for the main action button */
  confirmSuffixIcon: PropTypes.element,
  /** Defines the secondary action button text */
  cancelText: PropTypes.node,
  /** Add a prefix icon for the secondary action button */
  cancelPrefixIcon: PropTypes.element,
  /** Add a suffix icon for the secondary action button */
  cancelSuffixIcon: PropTypes.element,
  /** modal theme color */
  theme: PropTypes.oneOf(['red', 'blue', 'purple']),
  /** Called when the main action (confirm) is clicked */
  onOk: PropTypes.func,
  /** Called when the secondary action (cancel) is clicked */
  onCancel: PropTypes.func,
  /** Called when the close button is clicked */
  onClose: PropTypes.func,
  /** Specify exact width */
  width: PropTypes.string,
  /** Specify exact margin. Use to fine tune position inside other elements.
   * When used inside `<Modal>`, beware that `<Modal>` is a flex container, therefore specific flex item CSS rules apply for this margin. */
  margin: PropTypes.string,
  /** Defines the modals's header title */
  title: PropTypes.node,
  /** The content to be displayed. can be text or some node */
  children: PropTypes.any,
  /** Max height. When supplied - will allow internal scroll to the component */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Defines the buttons size */
  buttonsHeight: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  /** Show/hide the close button */
  closeButton: PropTypes.bool,
  /** Defines the secondary action button */
  disableCancel: PropTypes.bool,
  /** Defines the main action button */
  disableConfirmation: PropTypes.bool,
  /** Removes the content padding. Used in custom modal that defines it's own padding*/
  noBodyPadding: PropTypes.bool,
  /** A render slot to display a foot note */
  footerBottomChildren: PropTypes.node,
  /** Stretches the component to a full screen mode (with some padding) */
  fullscreen: PropTypes.bool,
  /** Changes the internal padding to be used with `<EmptyState/>` component */
  withEmptyState: PropTypes.bool,
  /** Used to display some side component in the footer, for example `<Checkbox/>` */
  sideActions: PropTypes.node,
  /** Used to display an illustration on the left side */
  image: PropTypes.node,
};

MessageBoxFunctionalLayout.defaultProps = {
  theme: 'blue',
  buttonsHeight: 'small',
  disableCancel: false,
  disableConfirmation: false,
  noBodyPadding: false,
  fullscreen: false,
  withEmptyState: false,
};

export default MessageBoxFunctionalLayout;
