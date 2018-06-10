import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Explore = () => (
  <Query
    query={gql`
      {
        allTouristSpots {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      console.log(data);
      if (error) return <p>Error :(</p>;

      return data.allTouristSpots.map(({ name }) => (
        <div key={name}>
          <p>{name}</p>
        </div>
      ));
    }}
  </Query>
);

export default Explore;