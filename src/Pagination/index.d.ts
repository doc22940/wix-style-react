import * as React from 'react';

export interface PaginationProps {
  dataHook?: string;
  className?: string;
  buttonText?: string;
}

export default class Pagination extends React.PureComponent<PaginationProps>{}
