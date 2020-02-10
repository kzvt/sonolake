import React, { useState, useEffect } from 'react'
import useDebounce from '../../hooks/useDebounce';
import PropTypes from "prop-types";

const SearchBar = ({ time = 200, onSearch }) => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, time);

  useEffect(() => {
    onSearch(debounced);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className="col-sm-6">
      <div className="form-group">
        <label htmlFor="searchInput" className="sr-only">
          Search
            </label>
        <input
          type="text"
          className="form-control"
          onChange={e => setSearch(e.target.value)}
          id="searchInput"
          placeholder="Search..."
        />
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar
