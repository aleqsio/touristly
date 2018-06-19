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
import FlightList from '../FlightList/FlightList';




const styles = {
  card: {
    display:"flex",
    flexGrow:"1",
    flexDirection:"row",
    width:"100%",

    margin:20,
    padding:20,
  },

  content: {
    flex: '1 0 auto',
  },
  media: {
    width:0,
    height:"100%",
    paddingLeft:"56%"
  },
};

class PromoCard extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    const { classes, image, name, description, id,graphql_id,departure } = this.props;
    console.log(departure);
    return (

      <Zoom in>

          <div>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="title" component="h1">
                  {name}

                </Typography>
                <Typography variant="subheading" component="h2">
                  {description}
                </Typography>
                <br/>
                <FlightList key={this.props.key} destination={graphql_id} departure={departure}/>
              </CardContent>
              <CardActions>

              </CardActions>

            </Card>
          </div>
      </Zoom>
    );
  }
}

PromoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PromoCard);