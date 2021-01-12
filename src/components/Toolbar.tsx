import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import GoAnywhereIcon from "@material-ui/icons/CallMissedOutgoing";
import OrdersIcon from "@material-ui/icons/ListAlt";
import BuyIcon from "@material-ui/icons/ShoppingCart";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import React from "react";
import { useDispatch } from "react-redux";
import { show as showBuyScreen } from "../store/buyScreenSlice";
import { show as showOrderScreen } from "../store/orderScreenSlice";
import { goAnywhere, queue } from "store/playerSlice";
import { shrink, center } from "Geometry";

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

// eslint-disable-next-line
const buyActions = [
  { icon: <BuyIcon />, name: "Buy", creator: showBuyScreen },
  { icon: <OrdersIcon />, name: "Orders", creator: showOrderScreen },
  //{ icon: <SellIcon />, name: "Sell", action: showBuyScreen },
];

type Props = {
  app: PIXI.Application;
};

export const Toolbar = (props: Props) => {
  const { app } = props;
  const classes = useStyles();
  const [direction] = React.useState<SpeedDialProps["direction"]>("up");
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);
  const dispatch = useDispatch();

  const commands = [
    {
      icon: <GoAnywhereIcon />,
      name: "Go anywhere",
      action: () => {
        dispatch(queue(goAnywhere(shrink(center(app.screen), 10))));
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
      {commands.map((command) => (
        <SpeedDialAction
          key={command.name}
          icon={command.icon}
          tooltipTitle={command.name}
          onClick={command.action}
        />
      ))}
    </SpeedDial>
  );
};
