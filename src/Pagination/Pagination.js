import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as CorePagination } from 'wix-ui-core/dist/src/components/pagination';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';

import style from './Pagination.st.css';

/** Component for pagination */
class Pagination extends React.PureComponent {
  render() {
    const { dataHook, ...rest } = this.props;
    return (
      <div
        onFocus={this.props.focusableOnFocus}
        onBlur={this.props.focusableOnBlur}
        {...style('root', {}, rest)}
      >
        <CorePagination
          data-hook={dataHook}
          {...rest}
          {...style('pagination', {}, rest)}
        />
      </div>
    );
  }
}

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,
  /** RTL mode */
  rtl: PropTypes.bool,
};

Pagination.defaultProps = {
  showFirstPage: true,
  showLastPage: true,
  responsive: false,
  showFirstLastNavButtons: false,
  paginationMode: 'pages',
  showInputModeTotalPages: false,
  disabled: false,
  previousLabel: <ChevronLeft />,
  nextLabel: <ChevronRight />,
  rtl: false,
};

export default withFocusable(Pagination);
