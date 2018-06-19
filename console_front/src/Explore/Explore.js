import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import SpotCard from '../SpotCard/SpotCard';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Typography from '@material-ui/core/Typography/Typography';

const Explore = () => (
  <Query
    query={gql`{
      userTouristSpots{
  key
  description
  name
  promoted
  images{
    image
  }
}
}
    `}
    fetchPolicy="network-only"
  >
    {({ loading, error, data,refetch }) => {
      if (loading) return <CircularProgress/>;
      if (error) return <Typography variant="display4" component="h2">An error occurred :(</Typography>;
      if(data.userTouristSpots.length===0) return <Typography variant="display4" component="h2">No more spots to visit :(</Typography>;
      return <div>{(data.userTouristSpots.map(({ name, key, description, images,promoted }) => (
        <SpotCard name={name} key={key} id={key} description={description} refetch={refetch} image={images[0].image} promoted={promoted}/>
      )))}
      </div>
    }}
  </Query>
);

export default Explore;