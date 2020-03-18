import React from 'react';
import { visualize, story, snap } from 'storybook-snapper';
import SocialPreview from '../index';
import ImageViewer from '../../ImageViewer';

const defaultProps = {
  title: 'Click me!',
  description: 'A description for the displayed item',
  previewUrl: 'www.site-name.com',
  media: (
    <ImageViewer
      width="100%"
      height="100%"
      imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/dd/New_Mela_Ramanputhur_Holy_Family_Church.jpg"
    />
  ),
};

const tests = [
  {
    it: 'basic',
    props: {},
  },
  {
    it: 'long texts',
    props: {
      title: 'Click me!'.repeat(27),
      description: 'a short description for a site'.repeat(8),
      previewUrl: 'www.site-name.com'.repeat(28),
    },
  },
];

const AsyncStoryWrapper = ({ onDone, ...rest }) => (
  <div style={{ width: '340px' }}>
    <SocialPreview onImageLoad={onDone} {...rest} />
  </div>
);

visualize('SocialPreview', () => {
  story('should render', () => {
    tests.forEach(({ it, props }) => {
      snap(it, done => (
        <AsyncStoryWrapper {...defaultProps} {...props} onDone={done} />
      ));
    });
  });
});
