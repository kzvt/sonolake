import React, { useEffect, useState } from 'react';
import SearchableGrid from '../components/SearchableGrid/SearchableGrid';
import RowActions from '../components/RowActions/RowActions';
import useJsonData from '../hooks/useJsonData';
import convertToUrl from '../hooks/useJsonData/convertToUrl';
import { pageAction, searchAction, setTotalAction } from '../hooks/useJsonData/actions';
import { get, remove } from '../helpers/http';
import { CHARACTERS } from '../consts/urls';


function CharacterList({ history }) {

  const colDefs = [
    { id: 'id', header: 'Id' },
    { id: 'name', header: 'Name' },
    { id: 'species', header: 'Species' },
    { id: 'gender', header: 'Gender' },
    { id: 'homeworld', header: 'Homeworld' },
    { id: 'actions', header: 'Actions' }
  ];

  const [state, dispatch] = useJsonData({});
  const url = convertToUrl(state);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const characters = await get(`${CHARACTERS}?${url}`);
    dispatch(setTotalAction(characters.total));
    setData(characters.data);
  }

  const onRemove = async row => {
    await remove(`${CHARACTERS}/${row.id}`);
    fetchData();
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onAdd = () => history.push('/characters/add');
  const onSearch = text => dispatch(searchAction(text));
  const onPage = page => dispatch(pageAction(page));

  const actions = [{
    icon: 'pencil',
    title: 'Edit',
    action: row=> history.push(`/characters/${row.id}`)
  }, {
    icon: 'trash-o',
    title: 'Remove',
    action: onRemove
  }];

  return (
    <SearchableGrid
      title='Characters'
      colDefs={colDefs}
      rows={data}
      onSearch={onSearch}
      onPage={onPage}
      pagination={{
        total: state.total,
        start: state._start,
        limit: state._limit,
      }}
      header={(
        <button
          onClick={onAdd}
          type="button"
          className="btn btn-primary mb-3"
        >
          Add New
          </button>
      )}
      rowRenderer={row => (
        <RowActions
          key={row.id}
          colDefs={colDefs}
          row={row}
          actions={actions}
        />
      )}
    />
  );
}

export default CharacterList;
