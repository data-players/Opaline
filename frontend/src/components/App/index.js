import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';
import Search from '../../containers/Search';
import Program from '../../containers/Program';
import Structure from '../../containers/Structure';

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const App = ({ loading }) => {
  return (
    <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
          </ul>
        </nav>
        {loading && (
        <div>
          Chargement, veuillez patienter...
        </div>
      )}
      {!loading && (
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/programmes/:slug" component={Program} />
          <Route exact path="/structures/:slug" component={Structure} />
          <Route component={NotFound} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;