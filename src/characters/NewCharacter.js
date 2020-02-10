import React, { useState, useEffect } from 'react'
import { get, save } from '../helpers/http';
import { SPECIES, CHARACTERS } from '../consts/urls';
import CharacterForm from './form/CharacterForm';

const NewCharacter = ({ history }) => {

  const [species, setSpecies] = useState([]);

  const fetchData = async () => {
    const data = await get(SPECIES);
    setSpecies(data.data);
  }

  useEffect(() => {
    fetchData()
  }, []);

  const onSubmit = async character => {
    await save(CHARACTERS, character);
    history.push('/characters/');
  }

  return (
    <div>
      <h2>Add new </h2>
      <CharacterForm
        onSubmit={onSubmit}
        species={species}
      />
    </div>
  )
}

export default NewCharacter
