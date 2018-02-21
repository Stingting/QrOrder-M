import React from 'react';
import {Route, Router, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history })  {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
