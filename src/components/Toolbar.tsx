import { makeStyles } from "@material-ui/core/styles";
import GoAnywhereIcon from "@material-ui/icons/CallMissedOutgoing";
import CollectResourceIcon from "@material-ui/icons/LocalGroceryStore";
import React from "react";
import { useDispatch } from "react-redux";
import { getResource, goAnywhere, queue } from "store/gameSlice";
import { shrink, center } from "Geometry";
import { app } from "store/displayMiddleware";
import HotKey from "./Hotkey";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "50%",
    margin: theme.spacing(0, 1, 1, 0),
    "&.MuiButton-root": {
      minWidth: 0,
    },
  },
}));

export const Toolbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goAnywhereCommand = () => {
    const bounds = shrink(center(app.screen), 10);
    dispatch(queue(goAnywhere(bounds)));
  };

  const getResourceCommand = () => {
    dispatch(queue(getResource()));
  };

  return (
    <>
      <HotKey keys={["g"]} scope={window.document} callback={goAnywhereCommand}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          aria-label="Go anywhere (G)"
          title="Go anywhere (G)"
          onClick={goAnywhereCommand}
        >
          <GoAnywhereIcon />
        </Button>
      </HotKey>
      <HotKey
        keys={["h"]}
        scope={window.document}
        callback={getResourceCommand}
      >
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          aria-label="Collect resource (h)"
          title="Collect resource (h)"
          onClick={getResourceCommand}
        >
          <CollectResourceIcon />
        </Button>
      </HotKey>
    </>
  );
};
