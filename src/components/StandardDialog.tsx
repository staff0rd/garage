import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { ScreenTransition } from "./ScreenTransition";

type StandardDialogProps = {
  open: boolean;
  handleClose: () => void;
  children?: JSX.Element;
};

export const StandardDialog = (props: StandardDialogProps) => {
  const { open, handleClose, children } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={ScreenTransition}
      keepMounted
      maxWidth="lg"
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
