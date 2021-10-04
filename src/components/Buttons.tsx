import { makeStyles } from "@material-ui/core/styles";
import GoAnywhereIcon from "@material-ui/icons/CallMissedOutgoing";
import CollectResourceIcon from "@material-ui/icons/LocalGroceryStore";
import React from "react";
import { useDispatch } from "react-redux";
import { addResource, getResource, goAnywhere, queue } from "store/gameSlice";
import { BoardManager } from "store/BoardManager";
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
    "&.MuiButton-containedSizeSmall": {
      padding: theme.spacing(1),
    },
  },
}));

type Props = {
  board: BoardManager;
};

export const Buttons = ({ board }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goAnywhereCommand = () => {
    dispatch(queue(goAnywhere(board.bounds)));
  };

  const getResourceCommand = () => {
    dispatch(queue(getResource()));
  };

  const addResourceCommand = () => {
    dispatch(
      addResource({
        ...board.getRandomBoardPosition(),
        id: guid(),
        visible: false,
      })
    );
  };

  return (
    <>
      <HotKey keys={["KeyZ"]} scope={window.document}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          aria-label="Go anywhere (Z)"
          title="Go anywhere (Z)"
          onClick={goAnywhereCommand}
        >
          <GoAnywhereIcon />
        </Button>
      </HotKey>
      <HotKey keys={["KeyX"]} scope={window.document}>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          aria-label="Collect resource (X)"
          title="Collect resource (X)"
          onClick={getResourceCommand}
        >
          <CollectResourceIcon />
        </Button>
      </HotKey>
    </>
  );
};
