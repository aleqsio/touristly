import React from 'react';
import { Route } from 'react-router-dom';
import Flights from '../Flights/Flights';
import Explore from '../Explore/Explore';
import Offers from '../Offers/Offers';

const MainContent = () => (
  <div>
    <Route path="/explore" component={Explore} />
    <Route path="/flights" component={Flights} />
    <Route path="/offers" component={Offers} />
  </div>
);

export default MainContent;
