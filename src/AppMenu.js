import React, { useEffect, useState } from "react"; import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import AppMenuItem from './AppMenuItem'

const AppMenu = () => {
  const classes = useStyles()
  const [events, setEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const appMenuItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Restaurants',
      link: '/restaurants',
      items: restaurants.map(restaurant => {
        return { name: restaurant.name }
      })
    },
    {
      name: 'Events',
      link: '/events',
      items: events.map(event => {
        return { name: event.title }
      })
    },
  ]

  useEffect(() => {
    getEvents();
    getRestaurants();
  }, []);

  const getEvents = () => {
    fetch("https://qvik.herokuapp.com/api/v1/events")
      .then((response) => response.json())
      .then((jsondata) => {
        console.log('jsondata', jsondata.data[0].data)
        setEvents(jsondata.data[0].data);
      })
      .catch(err => console.error(err));
  };

  const getRestaurants = () => {
    fetch("https://qvik.herokuapp.com/api/v1/restaurants")
      .then((response) => response.json())
      .then((jsondata) => {
        console.log('jsondata', jsondata.data.restaurants)
        setRestaurants(jsondata.data.restaurants);
      })
      .catch(err => console.error(err));
  };

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu;