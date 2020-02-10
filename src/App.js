import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import CharacterList from './characters/CharacterList';
import SpeciesList from './species/SpeciesList';
import NewCharacter from './characters/NewCharacter';
import UpdateCharacter from './characters/UpdateCharacter';

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
          <Link to="/" className="navbar-brand">
            Sonalake Task
          </Link>

          <div>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/characters" className="nav-link">
                  List of characters
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <Switch>
            <Route exact path="/species" component={SpeciesList} />
            <Route exact path="/characters" component={CharacterList} />
            <Route exact path="/characters/add" component={NewCharacter} />
            <Route exact path="/characters/:id" component={UpdateCharacter} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
