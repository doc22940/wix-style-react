import React from 'react';
import badgeDriverFactory from './Badge.driver';
import Badge from '.';
import { SKIN, TYPE, SIZE } from './constants';
import Email from 'wix-ui-icons-common/Email';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/unit';
import { badgeUniDriverFactory } from './Badge.uni.driver';

describe('Badge', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(badgeDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(badgeUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const createDriver = jsx => render(jsx).driver;

    describe('type prop', () => {
      it('should be solid by default', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.getType()).toBe(TYPE.solid);
      });

      Object.keys(TYPE).forEach(type => {
        it(`should be ${type}`, async () => {
          const driver = createDriver(<Badge type={type}>Hello</Badge>);
          expect(await driver.getType()).toBe(type);
        });
      });
    });

    describe('skin prop', () => {
      it('should be general by default', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.getSkin()).toBe(SKIN.general);
      });

      Object.keys(SKIN).forEach(skin => {
        it(`should be ${skin}`, async () => {
          const driver = createDriver(<Badge skin={skin}>Hello</Badge>);
          expect(await driver.getSkin()).toBe(skin);
        });
      });
    });

    describe('uppercase prop', () => {
      it('should be uppercase by default', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.isUppercase()).toBe(true);
      });

      it('should be free-case when value is false', async () => {
        const driver = createDriver(<Badge uppercase={false}>Hello</Badge>);
        expect(await driver.isUppercase()).toBe(false);
      });
    });

    describe('size prop', () => {
      it('should be medium by default', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.getSize()).toBe(SIZE.medium);
      });

      Object.keys(SIZE).forEach(size => {
        it(`should be ${size}`, async () => {
          const driver = createDriver(<Badge size={size}>Hello</Badge>);
          expect(await driver.getSize()).toBe(size);
        });
      });
    });

    describe('onClick prop', () => {
      it('cursor should be default when no onClick', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.hasClickCursor()).toBe(false);
      });

      it('cursor should be pointer when onClick set', async () => {
        const driver = createDriver(<Badge onClick={e => e}>Hello</Badge>);
        expect(await driver.hasClickCursor()).toBe(true);
      });

      it('should call event handler on badge click', async () => {
        const handler = jest.fn();
        const driver = createDriver(
          <Badge onClick={() => handler()}>Hello</Badge>,
        );
        await driver.click();
        expect(handler).toHaveBeenCalled();
      });
    });

    describe('children prop', () => {
      it('should render the text given as a children prop', async () => {
        const driver = createDriver(<Badge>Hello</Badge>);
        expect(await driver.text()).toBe('Hello');
      });

      it('should have content', async () => {
        const content = 'Hello Badge!';
        const driver = createDriver(<Badge>{content}</Badge>);
        expect(await driver.getContent()).toContain(content);
      });
    });
  }
});
