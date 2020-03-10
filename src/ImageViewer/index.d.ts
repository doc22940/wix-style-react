import * as React from 'react';
import { InputProps } from '../Input';
import { PopoverCommonProps } from '../common';

export interface ImageViewerProps {
  imageUrl?: string;
  error?: boolean;
  errorMessage?: string;
  tooltipProps?: PopoverCommonProps;
  showUpdateButton?: boolean;
  showRemoveButton?: boolean;
  onAddImage?: React.MouseEventHandler<HTMLElement>;
  onUpdateImage?: React.MouseEventHandler<HTMLElement>;
  onRemoveImage?: React.MouseEventHandler<HTMLElement>;
  onImageLoad?: React.ReactEventHandler<HTMLImageElement>;
  addImageInfo?: string;
  updateImageInfo?: string;
  removeImageInfo?: string;
  removeRoundedBorders?: boolean;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  status?: InputProps['status'];
  statusMessage?: InputProps['statusMessage'];
  dataHook?: string;
  className?: string;
}

export default class ImageViewer extends React.Component<ImageViewerProps> {}
