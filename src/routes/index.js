import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
// import Profile from '../pages/Profile';
// import Adress from '../pages/Profile/Adress';
// import Caixa from '../pages/Caixa';
// import Dashboard from '../pages/Dashboard';
// import ListProduct from '../pages/Product/listProduct';
// import ListService from '../pages/Works/ListWorks';

function RoutesApp() {
  return (
    <Switch>
      <Route path="/" exact component={props => <SignIn {...props} />} />
      <Route path="/register" exact component={props => <SignUp {...props} />} />
      {/* <Route isPrivate path="/dashboard" exact component={props => <Dashboard {...props} />} />
      <Route isPrivate path="/perfil/:id" exact component={props => <Profile {...props} />} />
      <Route isPrivate path="/adress/:id" exact component={props => <Adress {...props} />} />
      <Route isPrivate path="/caixa/:id" exact component={props => <Caixa {...props} />} />
      <Route isPrivate path="/listProducts" exact component={props => <ListProduct {...props} />} />
      <Route isPrivate path="/listServico" exact component={props => <ListService {...props} />} /> */}
    </Switch>
  );
}

export default RoutesApp;
