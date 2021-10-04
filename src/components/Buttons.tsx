import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { getResource, goAnywhere, queue } from "store/gameSlice";
import { BoardManager } from "store/BoardManager";
import HotKey from "./Hotkey";
import { Avatar, Button } from "@material-ui/core";

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
  avatar: {
    width: 24,
    height: 24,
    backgroundColor: "red",
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
          <Avatar className={classes.avatar}>Z</Avatar>
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
          <Avatar className={classes.avatar}>X</Avatar>
        </Button>
      </HotKey>
    </>
  );
};
