import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({ colDefs, rows, rowRenderer }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
        <tr>
          {colDefs.map(cDef => <th key={`${cDef.id}-header`} scope="col">{cDef.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          rows.map(row => rowRenderer(row))
        }
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  colDefs: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
}

export default Grid
