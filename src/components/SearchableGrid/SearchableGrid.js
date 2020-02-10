import React from 'react'
import PropTypes from 'prop-types'
import SearchBar from '../SearchBar/SearchBar';
import Grid from '../Grid/Grid';
import Pagination from '../Pagination/Pagination';

const SearchableGrid = (props) => {
  const {
    colDefs,
    title,
    rows,
    rowRenderer,
    pagination,
    onPage,
    onSearch,
    header
  } = props;
  return (
    <>
      <h1>{title}</h1>
      <div className="row">
        <SearchBar
          onSearch={onSearch}
        />
        <div className="col-sm-6 text-sm-right">
          {header}
        </div>
      </div>
      {
        pagination.total <= 0
          ? 'No Results Found'
          : (
            <>
              <Grid
                rowRenderer={rowRenderer}
                rows={rows}
                colDefs={colDefs}
              />
              <Pagination
                pagination={pagination}
                onPage={onPage}
              />
            </>
          )
      }
    </>
  )
}

SearchableGrid.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  colDefs: PropTypes.array.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onPage: PropTypes.func.isRequired,
  pagination: PropTypes.object,
}

export default SearchableGrid
