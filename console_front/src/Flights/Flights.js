import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import PromoCard from '../PromoCard/PromoCard';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';

const styles = theme => ({
  root: {
    display: 'flex',

    flex: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1,
    flexGrow: 1,
    flexDirection: "row"
  },

});


class Flights extends React.Component {
  state = {
    departure: "",
    destination: "",
  };

  setDeparture = (evt) => {
    this.setState({ departure: evt.target.value });
  };
  setDestination = (evt) => {
    this.setState({ destination: evt.target.value });
  };


  render() {
    const { classes } = this.props;
    return ( <Query
      query={gql`{
      userPromotedTouristSpots{
  key
  description
  name
  promoted
  images{
    image
  }
  id
}
}
    `}
      fetchPolicy="network-only"
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return <CircularProgress/>;
        if (error) return <Typography variant="display4" component="h2">An error occurred :(</Typography>;
        return <div>
          <div className={classes.root}>

            <TextField
              id="destination"
              label="Where do you want to travel to"
              className={classes.textField}
              value={this.state.destination} onChange={evt => this.setDestination(evt)}
              margin="normal"
            />

          <TextField
            id="departure"
            label="Where do you want to travel from"
            className={classes.textField}
            value={this.state.departure} onChange={evt => this.setDeparture(evt)}
            margin="normal"
          />
          </div>
          {(data.userPromotedTouristSpots.map(({ name, key, description, images, promoted, id }) =>{
            if(!name.toUpperCase().includes(this.state.destination.toUpperCase())){

              return null;
            }
            return <PromoCard name={name} key={key} id={key} description={description} refetch={refetch}
                              image={images[0].image} graphql_id={id} promoted={false}
                              departure={this.state.departure}/>;
          }))}
        </div>
      }}
    </Query>)
  }
}

export default withStyles(styles, { withTheme: true })(Flights);