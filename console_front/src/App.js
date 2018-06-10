import React from 'react';

import './App.css';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Login from './Login/Login';
import Switch from 'react-router-dom/es/Switch';
import AppContainer from './AppContainer/AppContainer';
import IntroPage from './IntroPage/IntroPage';
import cookie from 'react-cookie'
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withCookies } from 'react-cookie';
import Auth from './Auth/Auth';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';


const App = function (props) {

  let link = createHttpLink({
    uri: 'http://localhost:8000/api/graphql',
    credentials: 'include',
    headers: {
      'X-CSRFToken': props.cookies.get("csrftoken")

    }
  });

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  let auth = new Auth();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => {
            return <IntroPage auth={auth}/>
          }} component={IntroPage}/>
          <Route path="/login" render={props => {
            auth.login();
            return <div/>
          }}/>
          <Route path="/loginhandler" render={props => {
            auth.handleAuthentication();
            return <CircularProgress/>
          }}/>
          <Route render={props => {
            return <AppContainer auth={auth}/>
          }}/>

        </Switch>

      </BrowserRouter>
    </ApolloProvider>
  )

};

export default withCookies(App);