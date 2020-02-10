import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MAX_PAGES = 3;

const Pagination = ({ onPage, pagination }) => {
  const prevDisabled = pagination.total <= 0 || pagination.start <= 0;
  const nextDisabled = pagination.total <= 0 || pagination.start + pagination.limit >= pagination.total;
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = Math.floor(pagination.start / pagination.limit);

  let length = MAX_PAGES > totalPages ? totalPages : MAX_PAGES;
  let start = currentPage - Math.floor(length / 2);
  start = Math.max(start, 0);
  start = Math.min(start, 0 + totalPages - length);

  return (
    <nav aria-label="Data grid navigation">
      <ul className="pagination justify-content-end">
        <li className={classNames('page-item', { disabled: prevDisabled })} >
          <button type="button" onClick={() => onPage(currentPage - 1)} className="page-link" tabIndex="-1">
            Previous
            </button>
        </li>
        {
          Array.from({ length: length })
            .map((el, i) => start + i)
            .map(i => (
              <li
                key={i}
                onClick={() => onPage(i)}
                className={classNames('page-item', { active: i === currentPage })}
              >
                <button type="button" className="page-link">
                  {i + 1} <span className="sr-only">(current)</span>
                </button>
              </li>
            ))
        }
        <li className={classNames('page-item', { disabled: nextDisabled })} >
          <button type="button" onClick={() => onPage(currentPage + 1)} className="page-link">
            Next
            </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  onPage: PropTypes.func.isRequired,
}

export default Pagination
