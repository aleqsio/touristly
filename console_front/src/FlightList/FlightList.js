import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
  root: {
    flex:1,

  },
  table: {
    flex: 1,
  },
});


const FlightList = (props) => (

  <Query
    query={gql`
    query flights($departure: String!, $destination: ID!) {
  allFlights(departure_Icontains: $departure, destination: $destination) {
    edges {
      node {
        id
        departure
        destination {
         name
        }
        price
      }
    }
  }
}
    `}
    variables={{ departure: props.departure, destination: props.destination }}
    fetchPolicy="network-only"
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <CircularProgress/>;
      if(error) console.log(error);
      console.log(props.destination);
      if (error) return <Typography variant="display1" component="h2">An error occurred :(</Typography>;
      if(data.allFlights.edges.length === 0 ) return  <Typography variant="display1" component="h2">No flights available :(</Typography>;
      return <Paper className={props.classes.root}>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell numeric>Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.allFlights.edges.map(flight => {
              return (
                <TableRow key={flight.node.id}>
                  <TableCell>{flight.node.departure}</TableCell>
                  <TableCell>{flight.node.destination.name}</TableCell>
                  <TableCell numeric>{flight.node.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>;




      <div>{(data.allFlights.edges.map(( data ) => {
        return <div key={data.node.id}>{data.node.departure}</div>
      }))}
      </div>
    }}
  </Query>
);

export default withStyles(styles)(FlightList);;