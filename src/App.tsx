import React from "react";
import { Buttons } from "./components/Buttons";
import { makeStyles } from "@material-ui/core/styles";
import { app } from "store/displayMiddleware";
import { usePlayer } from "usePlayer";
import Queue from "components/Queue";
import { BoardManager } from "store/BoardManager";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  pixi: {
    width: "100%",
    height: "100%",
  },
  queue: {
    position: "fixed",
    top: 0,
    left: 0,
  },
  buttons: {
    position: "fixed",
    bottom: 0,
    right: 0,
    display: "flex",
  },
}));

const board = BoardManager.fromApp(app);

const App = () => {
  const classes = useStyles();

  usePlayer();

  const pixiUpdate = (element: HTMLDivElement) => {
    if (element && element.children.length <= 0) {
      element.appendChild(app.view);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pixi} ref={pixiUpdate} />
      <div className={classes.queue}>
        <Queue />
      </div>
      <div className={classes.buttons}>
        <Buttons board={board} />
      </div>
    </div>
  );
};

export default App;
