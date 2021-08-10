import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Value from './Value';
import Convert from './Convert';
import NotFound from './NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/value' component={Value} />
      <Route path='/convert' component={Convert} />
      <Route path='/' component={NotFound} />
    </Switch>
  );
};

export default Routes;
