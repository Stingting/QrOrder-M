import React from 'react';
import {Route, Router, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import menu from './routes/MenuPage';
import portal from './routes/MerchantPortal';
import login from './routes/Login';
import table from './routes/TablePage';
import customer from './routes/CustomerPage';
import setting from './routes/SettingPage';
import order from './routes/OrderPage';
import chat from './routes/ChatPage';
import error from './routes/ErrorPage';
import OrderDetail from './components/order/OrderDetail';

function RouterConfig({ history })  {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/app/v1/menu" exact component={menu} />
        <Route path="/app/v1/mportal" exact component={portal} />
        <Route path="/app/v1/login" exact component={login} />
        <Route path="/app/v1/table" exact component={table} />
        <Route path="/app/v1/customer" exact component={customer} />
        <Route path="/app/v1/setting" exact component={setting} />
        <Route path="/app/v1/order" exact component={order} />
        <Route path="/app/v1/order/orderdetail" exact component={OrderDetail} />
        <Route path="/app/v1/chat" exact component={chat} />
        <Route path="/app/v1/error" exact component={error} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
