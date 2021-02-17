import { makeStyles } from "@material-ui/core/styles";
import GoAnywhereIcon from "@material-ui/icons/CallMissedOutgoing";
import CollectResourceIcon from "@material-ui/icons/LocalGroceryStore";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addResource,
  getRandomBoardPosition,
  getResource,
  goAnywhere,
  queue,
} from "store/gameSlice";
import { shrink, center } from "Geometry";
import { app } from "store/displayMiddleware";
import HotKey from "./Hotkey";
import { Button } from "@material-ui/core";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { v4 as guid } from "uuid";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "50%",
    margin: theme.spacing(0, 1, 1, 0),
    "&.MuiButton-root": {
      minWidth: 0,
    },
  },
}));

const bounds = () => shrink(center(app.screen), 10);

export const Toolbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goAnywhereCommand = () => {
    dispatch(queue(goAnywhere(bounds())));
  };

  const getResourceCommand = () => {
    dispatch(queue(getResource()));
  };

  const addResourceCommand = () => {
    dispatch(addResource({ ...getRandomBoardPosition(bounds()), id: guid() }));
  };

  return (
    <>
      <HotKey keys={["KeyG"]} scope={window.document}>
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
      <HotKey keys={["KeyH"]} scope={window.document}>
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
      <HotKey keys={["KeyN"]} scope={window.document}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          aria-label="Add resource (n)"
          title="Add resource (n)"
          onClick={addResourceCommand}
        >
          <NewReleasesIcon />
        </Button>
      </HotKey>
    </>
  );
};
