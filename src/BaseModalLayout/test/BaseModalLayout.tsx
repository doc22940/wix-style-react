import * as React from 'react';
import BaseModalLayout from '..';

function baseModalLayoutWithMandatoryProps() {
  return <BaseModalLayout children="" />;
}

function baseModalLayoutWithAllProps() {
  return (
    <BaseModalLayout
      title="title"
      subtitle="subtitle"
      primaryButtonText="primaryButtonText"
      primaryButtonProps={{
        as: 'a',
        className: 'cls',
        disabled: true,
        fullWidth: true,
        prefixIcon: <div />,
        priority: 'primary',
        skin: 'dark',
        size: 'small',
        suffixIcon: <div />,
      }}
      primaryButtonOnClick={() => {}}
      secondaryButtonText="secondaryButtonText"
      secondaryButtonProps={{
        as: 'a',
        className: 'cls',
        disabled: true,
        fullWidth: true,
        prefixIcon: <div />,
        skin: 'dark',
        size: 'small',
        suffixIcon: <div />,
      }}
      secondaryButtonOnClick={() => {}}
      onCloseButtonClick={() => {}}
      removeContentPadding
      footnote={<div />}
      sideActions={<div />}
      children={<div />}
      additionalButtons={<div />}
    />
  );
}
