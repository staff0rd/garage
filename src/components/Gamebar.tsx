import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// Create our number formatter.
var formatter = new Intl.NumberFormat();

export default function Gamebar() {
  const classes = useStyles();
  const money = useSelector((state: RootState) => state.app.money);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            garage
          </Typography>
          <Typography variant="h6">${formatter.format(money)}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
