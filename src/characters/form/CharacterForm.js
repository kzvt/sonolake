import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CharacterForm.css'

const EmptyUser = {
  name: '',
  gender: '',
  species: '',
  homeworld: '',
}

const CharacterForm = ({ onSubmit, user = EmptyUser, species = [] }) => {
  const [character, setCharacter] = useState(user);
  const didMount = useRef(false);
  const [submit, setSubmit] = useState(false);
  const [valid, setValid] = useState(true);
  const [formErrors, setFormErrors] = useState(EmptyUser);

  const hasError = name => {
    return formErrors[name] || false;
  }

  const validateForm = () => {
    let errors = {};
    Object.keys(character)
      .filter(i => ['name', 'gender', 'species'].includes(i))
      .forEach(v => {
        if (!character[v]) {
          errors[v] = `${v} is required`
        }
      });
    setValid(Object.values(errors).every(x => !x));
    setFormErrors(errors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter({
      ...character,
      [name]: value
    });
  }

  const genders = [
    {
      value: 'male',
      name: 'Male'
    }, {
      value: 'female',
      name: 'Female'
    },
    {
      value: 'n/a',
      name: 'N/A'
    }];


  useEffect(() => {
    if (didMount.current) {
      validateForm(character);
    }
    didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, didMount]);

  useEffect(() => {
    if (submit && valid) {
      onSubmit(character)
    }
    if (submit) {
      setSubmit(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, valid])

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(character);
    setSubmit(true);
  }

  return (
    <div class="container-fluid">
      <form className='characterForm form-horizontal' onSubmit={handleSubmit}>
        <div className="form-group row">
          <label for="first_name" className="col-xs-9 col-form-label mr-2">
            Name
            <span className='text-primary'>*</span>
          </label>
          <div className="col-xs-3">
            <input type="text"
              className={classNames('form-control', { 'is-invalid': hasError('name') })}
              onChange={handleChange}
              value={character.name}
              name="name"
            />
            <div class="invalid-feedback">
              {formErrors.name}
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="first_name" className="col-xs-3 col-form-label mr-2">
            Species
            <span className='text-primary'>*</span>
          </label>
          <div className="col-xs-9">
            <select
              name='species'
              className={classNames('custom-select', { 'is-invalid': hasError('species') })}
              onChange={handleChange}
            >
              {
                species.map(s => (
                  <option
                    value={s}
                    selected={s === character.species}>{s}</option>
                ))
              }
            </select>
            <div class="invalid-feedback">
              {formErrors.species}
            </div>
          </div>
        </div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label for="first_name" className="col-xs-3 col-form-label mr-2">
            Gender
            <span className='text-primary'>*</span>
          </label>
          <div className='col-xs-9 '>
            {
              genders.map((gender) => (
                <div className="form-check form-check-inline">
                  <label>
                    <input type="radio" name="gender"
                      onChange={handleChange}
                      checked={character.gender === gender.value}
                      value={gender.value}
                    />
                    {gender.name}
                  </label>
                </div>

              ))
            }
            <div
              className={classNames('invalid-feedback radio-buttons', { 'is-invalid': hasError('gender') })}
            >
              {formErrors.gender}
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="first_name" className="col-xs-3 col-form-label mr-2">Homeworld</label>
          <div className="col-xs-9">
            <input type="text"
              className="form-control"
              name="homeworld"
              onChange={handleChange}
              value={character.homeworld}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-xs-3 col-xs-9">
            <button disabled={!valid} type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div >
  )
}

CharacterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CharacterForm
