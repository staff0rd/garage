import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar, OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { useEffect } from "react";
import { RootState } from "../store/rootReducer";
import { removeSnackbar } from "../store/notificationSlice";
import SnackMessage from './SnackMessage';

let displayed: string[] = [];

const Notifier = () => {
  
  const dispatch = useDispatch();
  const notifications = useSelector((store: RootState) => store.notification.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: string) => {
      displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string) => {
      displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
      notifications.forEach(({ key, message, dismissed = false, expiry }) => {
          if (dismissed) {
              closeSnackbar(key);
              return;
          }
          // do nothing if snackbar is already displayed
          if (displayed.includes(key)) return;
          
          const options: OptionsObject = {
            content: (key: SnackbarKey, message: SnackbarMessage) => { 
              return <SnackMessage id={key} message={message} />
            },
            autoHideDuration: expiry! - new Date().getTime(),
          }

          // display snackbar using notistack
          enqueueSnackbar(message, {
              key,
              ...options,
              onClose: (event, reason, myKey) => {
                  if (options.onClose) {
                      options.onClose(event, reason, myKey);
                  }
              },
              onExited: (event, myKey) => {
                  dispatch(removeSnackbar(myKey.toString()));
                  removeDisplayed(myKey.toString());
              },
          });
          storeDisplayed(key);
      });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
}

export default Notifier;