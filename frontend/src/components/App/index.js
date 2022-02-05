import React from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import NotFound from '../NotFound';
import Start from '../../containers/Start';
import Search from '../../containers/Search';
import Program from '../../containers/Program';
import Structure from '../../containers/Structure';


const useStyles = makeStyles(theme => ({
  nav: {
    position: 'absolute',
    top: 0,
    right: 0,
    '& li': {
      listStyle: 'none'
    }
  },
}))

function GoBack() {
  const history = useHistory();
  return (
    <BrowserRouter>
      <button onClick={() => history.goBack()}>Back</button>
    </BrowserRouter>
  );
}

const App = ({ loading }) => {
  const classes = useStyles();
  console.log(loading);
  return (
    <BrowserRouter>
      <nav className={classes.nav}>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><GoBack/></li>
        </ul>
      </nav>
      { loading &&
        <div className="loading">
          Chargement, veuillez patienter...
        </div>
      }
      { ! loading &&
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/Recherche" component={Search} />
          <Route exact path="/programmes/:slug" component={Program} />
          <Route exact path="/structures/:slug" component={Structure} />
          <Route component={NotFound} />
        </Switch>
      }
    </BrowserRouter>
  );
};

export default App;