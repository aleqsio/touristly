import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/es/Link';
import Route from 'react-router-dom/es/Route';




const MainMenuItem = ({ icon, text, classes, theme, linkto,subtext }) => (
  <Link to={linkto} style={{ textDecoration: 'none' }}>
    <div>
       <ListItem button >
        <Route
          path={linkto}
          children={({ match }) => (
            <ListItemIcon style={!match?{}:{color:theme.palette.primary.main}}>{icon}</ListItemIcon>
          )}
        />
        <ListItemText  primary={text} secondary={subtext}/>
       </ListItem>

    </div>
  </Link>
);

export default withStyles({}, { withTheme: true })(MainMenuItem);
