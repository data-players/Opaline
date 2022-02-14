import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Contact from '../../containers/Contact';
import FAQ from '../../containers/FAQ';
import NotFound from '../NotFound';
import Start from '../../containers/Start';
import Search from '../../containers/Search';
import Program from '../../containers/Program';
import Structure from '../../containers/Structure';


const App = ({ loading }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/FAQ" component={FAQ} />
        <Route exact path="/Recherche" component={Search} />
        <Route exact path="/programmes/:slug" component={Program} />
        <Route exact path="/structures/:slug" component={Structure} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;