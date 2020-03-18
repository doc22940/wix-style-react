import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge, { SIZE, SKIN, TYPE } from '../index';
import Box from '../../Box';

storiesOf('Badge', module).add('base', () => <BasicBadges />);
storiesOf('Badge', module).add('skins', () => <BadgesVariations />);
storiesOf('Badge', module).add('focus', () => <FocusBadgeTest />);

const skins = Object.keys(SKIN);
const sizes = Object.keys(SIZE);
const types = Object.keys(TYPE);

const renderBadge = props => (
  <span style={{ padding: '5px' }}>
    <Badge {...props}>Some Badge</Badge>
  </span>
);

const renderTypes = props => types.map(type => renderBadge({ type, ...props }));
const renderSizes = props => sizes.map(size => renderTypes({ size, ...props }));

class BasicBadges extends React.Component {
  render() {
    return (
      <div>
        <Badge>I'M A BADGE!</Badge>
        <Box maxWidth="60px" marginTop={1}>
          <Badge>I'M A BADGE WITH ELLIPSIS!</Badge>
        </Box>
      </div>
    );
  }
}

class BadgesVariations extends React.Component {
  render() {
    return (
      <div>
        {skins.map(skin => (
          <div key={skin}>
            <div
              style={{ display: 'flex', alignItems: 'center', padding: '5px' }}
              key={skin}
            >
              {renderSizes({ skin })}
              {renderBadge({ uppercase: false, skin })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

class FocusBadgeTest extends React.Component {
  componentDidMount() {
    // TODO - might want to make this focus action as a global driver / using tabs
    document.querySelector('[data-hook="focusable-badge"]').focus();
  }

  render() {
    return (
      <Badge dataHook="focusable-badge" onClick={() => alert(1)}>
        has focus ring on keyboard focus
      </Badge>
    );
  }
}
