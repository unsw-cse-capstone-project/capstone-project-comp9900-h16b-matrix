import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';

var hist = createBrowserHistory()
ReactDOM.render(
  // <React.StrictMode>
  //   {/* <App /> */}
  //   <Home/>
  // </React.StrictMode>,
  <Router history={hist}>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path='/home' component={Home}/>
      <Route path='/movieDetail/:id' component={MovieDetail}/>
      <Route path='/search/:search' component={Search}/>
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
