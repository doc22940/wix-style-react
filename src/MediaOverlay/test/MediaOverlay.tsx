import * as React from 'react';
import MediaOverlay from '..';

function MediaOverlayWithMandatoryProps() {
  return <MediaOverlay media="123" />;
}

function MediaOverlayWithAllProps() {
  return (
    <MediaOverlay
      media="123"
      skin="gradient"
      hoverSkin="dark"
      dataHook="hook"
      hovered
      onClick={() => undefined}
    >
      <MediaOverlay.Content>Test</MediaOverlay.Content>
      <MediaOverlay.Content visible="always">Test</MediaOverlay.Content>
      <MediaOverlay.Content visible="default">Test</MediaOverlay.Content>
      <MediaOverlay.Content visible="hover">Test</MediaOverlay.Content>
      <MediaOverlay.Content placement="top-start">Test</MediaOverlay.Content>
      <MediaOverlay.Content placement="top-end">Test</MediaOverlay.Content>
      <MediaOverlay.Content placement="middle">Test</MediaOverlay.Content>
      <MediaOverlay.Content placement="bottom-start">Test</MediaOverlay.Content>
      <MediaOverlay.Content placement="bottom-end">Test</MediaOverlay.Content>
      <MediaOverlay.Content>
        <MediaOverlay.DragHandle />
      </MediaOverlay.Content>
    </MediaOverlay>
  );
}
