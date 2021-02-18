import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  list: {
    margin: 0,
    padding: 0,
  },
  item: {
    listStyle: "none",
  },
}));

const Queue = () => {
  const classes = useStyles();
  const actions = useSelector<RootState>(
    (state) => state.game.actions
  ) as PayloadAction<any>[];

  return actions.length ? (
    <Paper className={classes.root}>
      <ul className={classes.list}>
        {actions.map((a) => (
          <li className={classes.item}>{a.type.replace("game/", "")}</li>
        ))}
      </ul>
    </Paper>
  ) : (
    <></>
  );
};

export default Queue;
