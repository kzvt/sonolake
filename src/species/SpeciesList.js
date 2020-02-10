import React, { useEffect, useState } from 'react';
import useJsonData from '../hooks/useJsonData';
import convertToUrl from '../hooks/useJsonData/convertToUrl';
import { searchAction, setTotalAction } from '../hooks/useJsonData/actions';
import { get } from '../helpers/http';
import { SPECIES } from '../consts/urls';
import SearchBar from '../components/SearchBar/SearchBar';
import Grid from '../components/Grid/Grid';


function SpeciesList({ history }) {

  const colDefs = [{ id: 'name', header: 'Name' }];

  const [state, dispatch] = useJsonData({ limit: -1 });
  const url = convertToUrl(state);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const species = await get(`${SPECIES}?${url}`);
      const dt = species.data.map((e, i) => ({ id: i, name: e }))
      dispatch(setTotalAction(species.total));
      setData(dt);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const onSearch = text => dispatch(searchAction(text));

  return (
    <>
      <h1>Species</h1>
      <div className="row">
        <SearchBar
          onSearch={onSearch}
        />
      </div>
      <Grid
        rowRenderer={row => (
          <tr>
            {
              colDefs
                .map(col => (
                  <td key={row.id + '-' + col.id}>{row[col.id]}</td>
                ))
            }
          </tr>
        )}
        rows={data}
        colDefs={colDefs}
      />
    </>
  );
}

export default SpeciesList;
