import React from 'react'
import classnames from 'classnames';

const ACTIONS_KEY = 'actions';

const RowActions = ({ row, actions, colDefs }) => {
  return (
    <tr>
      {
        colDefs
          .filter(c => c.id !== ACTIONS_KEY)
          .map(col => (
            <td key={row.id + '-' + col.id}>{row[col.id]}</td>
          ))
      }
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Actions"
        >
          {
            actions.map(action => (
              <button
                onClick={() => action.action(row)}
                key={action.icon}
                type="button"
                className="btn btn-secondary">
                <i className={classnames('fa', `fa-${action.icon}`)} aria-hidden="true" /> {action.title}
              </button>
            ))
          }
        </div>
      </td>
    </tr>
  )
}

RowActions.propTypes = {

}

export default RowActions
