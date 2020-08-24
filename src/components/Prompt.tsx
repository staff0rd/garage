import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface PromptProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    options: PromptOptions;
}

export type PromptOptions = {
    ok: Function;
    cancel?: Function;
    title: string;
    text: string;
}

export default function Prompt(props: PromptProps) {

  const {
      options: {ok},
      options: {cancel},
      options: {title},
      options: {text},
      open,
      setOpen,
  } = props;

  const handleOk = () => {
      handleClose();
      ok();
  }

  const handleCancel = () => {
      handleClose();
      cancel && cancel();
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  );
}
