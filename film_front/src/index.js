import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import Wish from './pages/Wish/Wish';
const API_URL = process.env.REACT_APP_API_URL;
var hist = createBrowserHistory()
axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});
axios.interceptors.response.use(
  response => {
    console.log(response)
      return response;
  },
  error => {
    console.log(error)
    return error;
  }
);
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
      <Route path='/wish' component={Wish}/>

    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
