import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'search':
      return { ...state, q: action.q, _start: 0 }
    case 'page':
      return { ...state, _start: action.page * state._limit }
    case 'total':
        return { ...state, total: action.total }
    default:
      throw new Error(`Not supported action ${action.type}`);
  }
}


export default ({ limit = 5 }) => {
  const initialState = {
    q: '',
    _start: 0,
    _limit: limit,
    total: -1,
  };
  return useReducer(reducer, initialState);
};