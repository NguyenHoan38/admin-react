import './App.css';
import { COOKIE_USER, COOKIE_AUTH } from "./components/auth/constants";
import { apilogin } from "./api/index"
import LoginForm from "./components/auth/LoginForm"
import Home from "./components/home/Home"
// import AppContent from "./routes"
// import LoginForm from "./components/auth/LoginForm";
import { APP_CONFIG } from "./utils/constants";
import { BrowserRouter, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { getAuth } from "./utils/jwt";
import React from 'react';
import Cookies from "js-cookie";
function App(props) {
  // var browserHistory = ReactRouter.browserHistory;
  // const BrowserHistory = ReactRouter.BrowserHistory
  const history = useHistory()
  // const BrowserHistory = require('')
  function pageNext() {
    return "/home"
  }
  return (
    <>
      <React.Fragment>
        < BrowserRouter >
          <Route path="/home" render={() => {
            return Cookies.get(COOKIE_USER) ? <Home /> : <Redirect to='/' ></Redirect>
          }} >
          </Route>
          <Route path="/" render={() => {
            return Cookies.get(COOKIE_USER) ? <Redirect to={pageNext()} ></Redirect> : <LoginForm />
          }} />
        </BrowserRouter >
      </React.Fragment>
    </>
  );
}

export default App;
