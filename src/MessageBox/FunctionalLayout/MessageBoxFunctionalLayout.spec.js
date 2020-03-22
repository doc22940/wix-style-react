import React from 'react';
import { mount } from 'enzyme';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';

import MessageBoxFunctionalLayout from './MessageBoxFunctionalLayout';
import MessageBoxFunctionalLayoutFactory from './MessageBoxFunctionalLayout.driver';
import {
  isTestkitExists,
  isEnzymeTestkitExists,
} from '../../../test/utils/testkit-sanity';
import { messageBoxFunctionalLayoutTestkitFactory } from '../../../testkit';
import { messageBoxFunctionalLayoutTestkitFactory as enzymeMessageBoxTestkitFactory } from '../../../testkit/enzyme';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
} from '../../../test/utils/react';
import { MessageBoxFunctionalLayoutUniDriverFactory } from './MessageBoxFunctionalLayout.uni.driver';

describe('MessageBox', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(MessageBoxFunctionalLayoutFactory));
  });

  describe('[async]', () => {
    runTests(
      createRendererWithUniDriver(MessageBoxFunctionalLayoutUniDriverFactory),
    );
  });

  function runTests(render) {
    const createDriver = jsx => render(jsx).driver;
    describe('action buttons', () => {
      it('should display the confirmation text on top the confirmation button', async () => {
        const props = {
          confirmText: 'confirmText',
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getConfirmationButtonText()).toBe(
          props.confirmText,
        );
      });

      it('should display the prefix icon on top the confirmation button', async () => {
        const props = {
          confirmText: 'confirmText',
          confirmPrefixIcon: <ChevronDown />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getConfirmationButtonText()).toBe(
          props.confirmText,
        );
        expect(await driver.isConfirmationButtonPrefixIconExists()).toBe(true);
      });

      it('should display the suffix icon on top the confirmation button', async () => {
        const props = {
          confirmText: 'confirmText',
          confirmSuffixIcon: <ChevronDown />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getConfirmationButtonText()).toBe(
          props.confirmText,
        );
        expect(await driver.isConfirmationButtonSuffixIconExists()).toBe(true);
      });

      it('should display the cancellation text on top the cancellation button', async () => {
        const props = {
          cancelText: 'cancelText',
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getCancellationButtonText()).toBe(props.cancelText);
      });

      it('should display the prefix icon on top the cancellation button', async () => {
        const props = {
          cancelText: 'cancelText',
          cancelPrefixIcon: <ChevronDown />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getCancellationButtonText()).toBe(props.cancelText);
        expect(await driver.isCancellationButtonPrefixIconExists()).toBe(true);
      });

      it('should display the suffix icon on top the cancellation button', async () => {
        const props = {
          cancelText: 'cancelText',
          cancelSuffixIcon: <ChevronDown />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getCancellationButtonText()).toBe(props.cancelText);
        expect(await driver.isCancellationButtonSuffixIconExists()).toBe(true);
      });

      it('should disable cancel button if disabled', async () => {
        const props = {
          cancelText: 'cancelText',
          disableCancel: true,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.isCancelEnable()).toBe(false);
      });

      it('should disable confirmation button if disabled', async () => {
        const props = {
          confirmText: 'ok',
          disableConfirmation: true,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.isConfirmationEnable()).toBe(false);
      });

      it('should not display the cancellation button if cancellationText is empty', async () => {
        const props = {};
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getCancellationButton()).toBeNull();
      });

      it(`should trigger the 'onOk' action upon clicking the confirmation button`, async () => {
        const props = {
          onOk: jest.fn(),
          confirmText: 'confirm',
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        await driver.clickOnConfirmationButton();
        expect(props.onOk.mock.calls.length).toBe(1);
      });

      it(`should trigger the 'onCancel' action upon clicking the cancellation button`, async () => {
        const props = {
          cancelText: 'cancelText',
          onCancel: jest.fn(),
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        await driver.clickOnCancellationButton();
        expect(props.onCancel.mock.calls.length).toBe(1);
      });

      it('should render side actions', async () => {
        const dataHook = 'side-actions';
        const props = {
          sideActions: <div data-hook={dataHook} />,
        };

        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);

        expect(
          await driver.getChildBySelector(`[data-hook="${dataHook}"]`),
        ).not.toBeNull();
      });
    });

    describe('closeButton attribute', () => {
      it('should appear by default', async () => {
        const props = {
          onCancel: jest.fn(),
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getHeaderCloseButton()).toBeTruthy();
      });

      it('should not appear', async () => {
        const props = {
          onCancel: jest.fn(),
          closeButton: false,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getHeaderCloseButton()).toBe(null);
      });

      it(`should trigger the 'onCancel' action upon clicking the header close button`, async () => {
        const props = {
          onCancel: jest.fn(),
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        await driver.clickOnHeaderCloseButton();
        expect(props.onCancel.mock.calls.length).toBe(1);
      });

      it(`should trigger the 'onClose' action upon clicking the close button if 'onClose' prop exists`, async () => {
        const onCancelFunction = jest.fn();
        const onCloseFunction = jest.fn();

        const props = {
          onCancel: onCancelFunction,
          onClose: onCloseFunction,
        };

        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        await driver.clickOnHeaderCloseButton();
        expect(props.onCancel.mock.calls.length).toBe(0);
        expect(props.onClose.mock.calls.length).toBe(1);
      });
    });

    describe('theme attribute', () => {
      it('should set the theme by default to "blue"', async () => {
        const props = {};
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.isThemeExist('blue')).toBe(true);
      });

      it('should allowing setting the theme', async () => {
        const props = {
          theme: 'red',
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.isThemeExist('red')).toBe(true);
        expect(await driver.isThemeExist('blue')).toBe(false);
        expect(await driver.isThemeExist('purple')).toBe(false);
      });
    });

    describe('footer children', () => {
      it(`should render the passed footer content`, async () => {
        const props = {
          footerBottomChildren: <div data-hook="inner-div" />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(
          await driver.getChildBySelector('[data-hook="inner-div"]'),
        ).not.toBeNull();
        expect(
          await driver.getChildBySelector(
            '[data-hook="footer-layout-bottom-children"]',
          ),
        ).not.toBeNull();
      });

      it(`should not render footer's wrapper div when footer content isn't passed`, async () => {
        const props = {};
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(
          await driver.getChildBySelector(
            '[data-hook="footer-layout-bottom-children"]',
          ),
        ).toBeNull();
      });
    });

    describe('general', () => {
      it(`should hide the footer`, async () => {
        const props = {
          hideFooter: true,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getFooter()).toBeNull();
      });

      it(`should show footer by default`, async () => {
        const props = {};
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getFooter()).not.toBeNull();
      });

      it(`should render title`, async () => {
        const props = {
          title: 'title',
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(await driver.getTitle()).toBe(props.title);
      });

      it(`should render the passed children in the markup`, async () => {
        const props = {};
        const driver = createDriver(
          <MessageBoxFunctionalLayout {...props}>
            <div data-hook="inner-div" />
          </MessageBoxFunctionalLayout>,
        );
        expect(
          await driver.getChildBySelector('[data-hook="inner-div"]'),
        ).not.toBeNull();
      });

      it('should render with zero padding when explicitly asked for', async () => {
        const normalRendering = {};
        const zeroPaddingRendering = { noBodyPadding: true };
        const regularDriver = createDriver(
          <MessageBoxFunctionalLayout {...normalRendering}>
            <div>Content</div>
          </MessageBoxFunctionalLayout>,
        );
        expect(await regularDriver.toHaveBodyPadding()).toBe(true);

        const zeroPaddingDriver = createDriver(
          <MessageBoxFunctionalLayout {...zeroPaddingRendering}>
            <div>Content</div>
          </MessageBoxFunctionalLayout>,
        );
        expect(await zeroPaddingDriver.toHaveBodyPadding()).toBe(false);
      });

      it('should render the passed image', async () => {
        const props = {
          image: <div data-hook="inner-div" />,
        };
        const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
        expect(
          await driver.getChildBySelector('[data-hook="inner-div"]'),
        ).not.toBeNull();
      });
    });

    describe('`margin` prop', () => {
      it('should be set on root element', async () => {
        const margin = 'hello world';
        const driver = createDriver(
          <MessageBoxFunctionalLayout margin={margin} />,
        );
        expect(Object.values(await driver.element())[1].style.margin).toEqual(
          margin,
        );
      });
    });

    describe('testkit', () => {
      it('should exist', async () => {
        expect(
          isTestkitExists(
            <MessageBoxFunctionalLayout />,
            messageBoxFunctionalLayoutTestkitFactory,
          ),
        ).toBe(true);
      });
    });

    describe('enzyme testkit', () => {
      it('should exist', async () => {
        expect(
          isEnzymeTestkitExists(
            <MessageBoxFunctionalLayout />,
            enzymeMessageBoxTestkitFactory,
            mount,
          ),
        ).toBe(true);
      });
    });
  }
});
