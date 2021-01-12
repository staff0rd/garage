import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import OrdersIcon from "@material-ui/icons/ListAlt";
import BuyIcon from "@material-ui/icons/ShoppingCart";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { show as showBuyScreen } from "../store/buyScreenSlice";
import { show as showOrderScreen } from "../store/orderScreenSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  })
);

const actions = [
  { icon: <BuyIcon />, name: "Buy", action: showBuyScreen },
  { icon: <OrdersIcon />, name: "Orders", action: showOrderScreen },
  // { icon: <SellIcon />, name: 'Sell', action: showBuyScreen },
];

export const Toolbar = () => {
  const classes = useStyles();
  const [direction] = React.useState<SpeedDialProps["direction"]>("up");
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (creator: ActionCreatorWithoutPayload<string>) => {
    dispatch(creator());
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      hidden={hidden}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={direction}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleClick(action.action)}
        />
      ))}
    </SpeedDial>
  );
};
