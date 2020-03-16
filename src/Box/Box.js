import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import colors from '../colors.scss';
import styles from './Box.scss';

/** Defined according to the design system */
export const spacingUnit = 6;

const directions = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
};
const horizontalAlignmentValues = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
  'space-between': styles.spaceBetween,
};
const verticalAlignmentValues = {
  top: styles.top,
  middle: styles.middle,
  bottom: styles.bottom,
  'space-between': styles.spaceBetween,
};
const spacingValues = {
  tiny: `${spacingUnit}px`,
  small: `${spacingUnit * 2}px`,
  medium: `${spacingUnit * 3}px`,
  large: `${spacingUnit * 4}px`,
};

/** In case the value is a number, it's multiplied by the defined spacing unit.
 *  Otherwise - there're two options:
 *   1. A predefined spacing value with semantic name (tiny, small, etc.)
 *   2. Space-separated values that are represented by a string (for example: "3px 3px")
 * */
const formatSpacingValue = value =>
  isFinite(value)
    ? `${value * spacingUnit}px`
    : spacingValues[value] || `${value}`;

const formatSizeValue = value => (isFinite(value) ? `${value}px` : `{value}`);

const Box = ({
  dataHook,
  children,
  className,
  style,
  inline,
  direction,
  align,
  verticalAlign,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  minWidth,
  maxWidth,
  width,
  minHeight,
  maxHeight,
  height,
  color,
  backgroundColor,
  border,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,

  // Excluded props (which are handled above and should not be spread into `style`)
  'data-hook': dataHookByKebabCase,
  flexDirection,
  justifyContent,
  alignItems,

  ...nativeStyles
}) => {
  const rootClassNames = classNames(styles.root, className, {
    [styles.inline]: inline,

    // Alignment
    [directions[direction]]: direction,
    [horizontalAlignmentValues[align]]: align,
    [verticalAlignmentValues[verticalAlign]]: verticalAlign,
  });
  const rootStyles = {
    ...style,

    // Spacing
    padding: formatSpacingValue(padding),
    paddingTop: formatSpacingValue(paddingTop),
    paddingRight: formatSpacingValue(paddingRight),
    paddingBottom: formatSpacingValue(paddingBottom),
    paddingLeft: formatSpacingValue(paddingLeft),
    margin: formatSpacingValue(margin),
    marginTop: formatSpacingValue(marginTop),
    marginRight: formatSpacingValue(marginRight),
    marginBottom: formatSpacingValue(marginBottom),
    marginLeft: formatSpacingValue(marginLeft),

    // Sizing
    minWidth: formatSizeValue(minWidth),
    maxWidth: formatSizeValue(maxWidth),
    width: formatSizeValue(width),
    minHeight: formatSizeValue(minHeight),
    maxHeight: formatSizeValue(maxHeight),
    height: formatSizeValue(height),

    // Styling
    color: colors[color] || color,
    backgroundColor: colors[backgroundColor] || backgroundColor,
    border, // Must be assigned before the border color props (otherwise it would override them)

    // Props which are spread just in case these are actually defined
    ...(borderColor && {
      borderColor: colors[borderColor] || borderColor,
    }),
    ...(borderTopColor && {
      borderTopColor: colors[borderTopColor] || borderTopColor,
    }),
    ...(borderRightColor && {
      borderRightColor: colors[borderRightColor] || borderRightColor,
    }),
    ...(borderBottomColor && {
      borderBottomColor: colors[borderBottomColor] || borderBottomColor,
    }),
    ...(borderLeftColor && {
      borderLeftColor: colors[borderLeftColor] || borderLeftColor,
    }),

    // All other props which are passed (without those that are specified above)
    ...nativeStyles,
  };

  return (
    <div data-hook={dataHook} className={rootClassNames} style={rootStyles}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';

Box.propTypes = {
  /** Any element to be rendered inside */
  children: PropTypes.node,
  /** Define styles through a classname */
  className: PropTypes.string,
  /** Defines if the box behaves as an inline element */
  inline: PropTypes.bool,
  /** Defines how the children are ordered (horizontally or vertically) */
  direction: PropTypes.oneOf(Object.keys(directions)),
  /** Defines how the children are aligned according to the X axis */
  align: PropTypes.oneOf(Object.keys(horizontalAlignmentValues)),
  /** Defines how the children are aligned according to the Y axis */
  verticalAlign: PropTypes.oneOf(Object.keys(verticalAlignmentValues)),
  /** Sets padding on all sides.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the top.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the right.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the bottom.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the left.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on all sides.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the top.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the right.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the bottom.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the left.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * or a string of space-separated values ("3px 3px") */
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the minimum width of the box (pixels) */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the maximum width of the box (pixels) */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the width of the box (pixels) */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the minimum height of the box (pixels) */
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the maximum height of the box (pixels) */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the height of the box (pixels) */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets a text color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  color: PropTypes.string,
  /** Sets a background color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  backgroundColor: PropTypes.string,
  /** Sets a border color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderColor: PropTypes.string,
  /** Sets a border top color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderTopColor: PropTypes.string,
  /** Sets a border right color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderRightColor: PropTypes.string,
  /** Sets a border bottom color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderBottomColor: PropTypes.string,
  /** Sets a border left color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderLeftColor: PropTypes.string,
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,
};

Box.defaultProps = {
  direction: 'horizontal',
  inline: false,
};

export default Box;
