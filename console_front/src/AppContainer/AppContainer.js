import React from 'react';
import MiniDrawerContainer from './../MiniDrawerContainer/MiniDrawerContainer';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TouristlyTheme from './../TouristlyTheme/TouristlyTheme';
import MainMenu from './../MainMenu/MainMenu';
import MainContent from '../MainContent/MainContent';

const AppContainer=(props) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={TouristlyTheme}>
      <MiniDrawerContainer mainMenu={<MainMenu/>} content={<MainContent/>}  {...props} />
    </MuiThemeProvider>
  </React.Fragment>
);

export default AppContainer;