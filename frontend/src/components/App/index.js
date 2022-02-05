import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FAQ from '../../components/FAQ';
import NotFound from '../NotFound';
import Start from '../../containers/Start';
import Search from '../../containers/Search';
import Program from '../../containers/Program';
import Structure from '../../containers/Structure';

const App = ({ loading }) => {
  return (
    <BrowserRouter>
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
          <Route exact path="/FAQ" component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      }
    </BrowserRouter>
  );
};

export default App;