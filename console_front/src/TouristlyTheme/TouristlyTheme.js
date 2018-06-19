import {createMuiTheme} from '@material-ui/core/styles/';
import {orange, red,green,pink,yellow} from '@material-ui/core/colors/';
const TouristlyTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: green,
    love:yellow,
    skip:pink
  },
});
export default TouristlyTheme;