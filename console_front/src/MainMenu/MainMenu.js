import React from 'react';
import MainMenuItem from '../MainMenuItem/MainMenuItem';
import Explore from '@material-ui/icons/Explore'
import Flight from '@material-ui/icons/Flight'
import LocalOffer from '@material-ui/icons/LocalOffer'

const MainMenu = ({selectedPage}) => (
  <div>
    <MainMenuItem icon={<Explore/>} text={"Discover"} linkto="/explore"/>
    <MainMenuItem icon={<Flight/>} text={"Flights"}  linkto="/flights"/>
    <MainMenuItem icon={<LocalOffer/>} text={"Offers"} linkto="/offers"/>
  </div>
);

export default MainMenu;
