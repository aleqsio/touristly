import React from 'react';
import { Route } from 'react-router-dom';
import Flights from '../Flights/Flights';
import Explore from '../Explore/Explore';

const MainContent = () => (
  <div>
    <Route path="/explore" component={Explore} />
    <Route path="/flights" component={Flights} />
    <Route path="/offers" component={Flights} />
  </div>
);

export default MainContent;
