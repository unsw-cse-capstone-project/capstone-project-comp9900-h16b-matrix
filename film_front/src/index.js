import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import * as serviceWorker from './serviceWorker';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import Wish from './pages/Wish/Wish';
import ReviewEdit from './pages/Review/ReviewEdit';
import Preview from './pages/Preview/Preview';
import Setting from './pages/Setting/Setting';
import ReviewDetail from './pages/ReviewDetail/reviewDetail';
const API_URL = process.env.REACT_APP_API_URL;
var hist = createBrowserHistory()
axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
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
  <Router history={hist}>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path='/home' component={Home}/>
      <Route path='/movieDetail/:id' component={MovieDetail}/>
      <Route path='/search/:type/:search' component={Search}/>
      <Route path='/wish/:id' component={Wish}/>

      <Route path='/editReview/:id' component={ReviewEdit}/>
      <Route path='/Setting' component={Setting}/> 
      <Route path='/Preview/:id' component={Preview}/>
      <Route path='/reviewDetail/movieId=:movieId/poster=:poster' component={ReviewDetail}/>


    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
