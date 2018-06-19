import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';



const IntroPage=(props) => (
  <div style={{"padding":100}}>
    <Typography variant="display3" color="primary" noWrap>
      Tourist.ly
    </Typography>
    <Typography variant="display1" color="inherit" noWrap>
      Hello, login using the button below:
    </Typography>
    <br/>
    <Button size="large" color="primary" variant="contained" onClick={evt => props.auth.login()}>
      Login to toursit.ly using auth0
    </Button>
  </div>
);
export default IntroPage;