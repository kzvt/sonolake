import React, { useState, useEffect } from 'react'
import { get, update } from '../helpers/http';
import { SPECIES, CHARACTERS } from '../consts/urls';
import CharacterForm from './form/CharacterForm';

const UpdateCharacter = ({ location: { pathname }, history }) => {

  const [, id] = pathname.split('/characters/');
  const CHARACTER_URL = `${CHARACTERS}/${id}`;

  const [species, setSpecies] = useState([]);
  const [character, setCharacter] = useState(null);

  const fetchData = async () => {
    const [{ data: speciesData }, { data: characterData }] = await
      Promise.all([get(SPECIES), get(CHARACTER_URL)]);
    setCharacter(characterData);
    setSpecies(speciesData);
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async character => {
    await update(CHARACTER_URL, character);
    history.push('/characters/');
  }

  return (
    <div>
      <h2>Update characted: {character && character.name}</h2>
      {character && (
        <CharacterForm
          onSubmit={onSubmit}
          user={character}
          species={species}
        />
      )}
    </div>
  )
}

export default UpdateCharacter;
