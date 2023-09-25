import React from "react";
import { useState, useEffect } from 'react'
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@mui/material";
//import { styled } from "@mui/material/styles";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Home from '@mui/icons-material/Home';
import SignOut from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person2';
import More from '@mui/icons-material/More';
import Services from "@mui/icons-material/MiscellaneousServices";
import ContactMail from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

/*const useStyles = makeStyles({
  drawer: {
    width: "190px"
  }
});*/
const classes = {
    drawer: {
        width: "190px"
    },
  };



const Drawer = ({isDrawerOpen, setIsDrawerOpen}) => {
  //const { history } = props;
  const navigate = useNavigate();
  const itemsList = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => navigate("/home")
    },
    {
      text: "Sign Out",
      icon: <SignOut />,
      onClick: () => navigate("/")
    },
    {
      text: "About",
      icon: <More />,
      onClick: () => navigate("/contact")
    },
    {
        text: "The developer",
        icon: <Person />,
        onClick: () => navigate("/about")
      },
      {
        text: "Services",
        icon: <Services />,
        onClick: () => navigate("/contact")
      },
      {
        text: "Connect",
        icon: <ContactMail />,
        onClick: () => navigate("/contact")
      }
  ];
  return (
    <>
    {/* <IconButton
    size="large"
    edge="start"
    color="inherit"
    aria-label="logo"
    onClick={()=>setIsDrawerOpen(true)}
    >
        <MenuIcon/>
    </IconButton> */}
        <MUIDrawer open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
    </>

  );
};

export default Drawer;
