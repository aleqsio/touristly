import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CancelIcon from '@material-ui/icons/Cancel';
import { gql } from 'apollo-boost';
import Mutation from 'react-apollo/Mutation';
import Zoom from '@material-ui/core/Zoom/Zoom';


const styles = {
  card: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};


const ADD_PREF = gql`
  mutation addPreference($liked: [String!],$skipped: [String!]) {
    addPreference(liked: $liked,skipped: $skipped) {
      ok
    }
  }
`;

class SpotCard extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.promoted);
  }

  state = {
    showing: true,
    takesSpace: true,
    promoted:this.props.promoted,
  };

  hide() {

    this.setState({
      showing: false,

    });
    setTimeout(() => {
      this.setState({
        takesSpace: false
      });
      this.props.refetch();
    }, 300);
  }
  promote() {
    this.setState({
      promoted: true,
    });
    setTimeout(() => {
      this.setState({
        showing: false
      });
    }, 300);
    setTimeout(() => {
      this.setState({
        takesSpace: false
      });
      this.props.refetch();
    }, 600);
  }


  render() {
    const { classes, image, name, description, id } = this.props;
    if (!this.state.takesSpace) return null;
    return (

      <Zoom in={this.state.showing}>
        <div  style={{ "display": "inline", "float": "left", "padding": "10px" }}>

          <div>
            <Card className={classes.card} style={this.state.promoted?{"background":"#ffd3e2","transition": "background 0.3s"}:null}>

              <CardMedia
                className={classes.media}
                image={(image ? image.replace("data", "static") : null)}
                title={name}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {name}
                </Typography>
                <Typography component="p">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <div style={{ "align": "center", margin: "auto" }}>
                  <Mutation mutation={ADD_PREF}>
                    {(addTodo, { data }) => (
                      <Button variant="fab" style={{ backgroundColor: '#ec407a', margin: "10px", align: "center" }}
                              onClick={e => {
                                addTodo({ variables: { liked: [id], skipped: [] } });
                                this.promote();
                              }}>
                        <FavoriteIcon/>
                      </Button>)}
                  </Mutation>
                  <Mutation mutation={ADD_PREF}>
                    {(addTodo, { data }) => (
                      <Button variant="fab" style={{ backgroundColor: '#607d8b', margin: "10px", align: "center" }}
                              onClick={e => {
                                addTodo({ variables: { liked: [], skipped: [id] } });
                                this.hide();
                              }}>
                        <CancelIcon/>
                      </Button>)}
                  </Mutation>
                </div>
              </CardActions>

            </Card>
          </div>
        </div>
      </Zoom>
    );
  }
}

SpotCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SpotCard);