import React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout, Cell } from '../../Layout';
import { Appearance } from '../constants';
import SectionHelper from '../index';

storiesOf('SectionHelper', module).add('Appearances', () => (
  <Layout>
    {Object.values(Appearance).map(appearance => (
      <Cell key={appearance}>
        <SectionHelper
          appearance={appearance}
          actionText="I understand the consequences"
          title="Look at this important message!"
          children="This is a very important message"
          onAction={() => undefined}
          showCloseButton
          onClose={() => undefined}
        />
      </Cell>
    ))}
  </Layout>
));
