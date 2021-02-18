import React from "react";
import { Buttons } from "./components/Buttons";
import { makeStyles } from "@material-ui/core/styles";
import { app } from "store/displayMiddleware";
import { usePlayer } from "usePlayer";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  pixi: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    position: "fixed",
    bottom: 0,
    right: 0,
    display: "flex",
  },
}));

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
      <div className={classes.buttons}>
        <Buttons />
      </div>
    </div>
  );
};

export default App;
