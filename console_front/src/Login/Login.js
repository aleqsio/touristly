import React from 'react';
import auth0 from 'auth0-js';
import Auth from '../Auth/Auth';


const Login = ({authinstance}) => {
  authinstance.login();
  return (
    <div>Login</div>
  )
};

export default Login;