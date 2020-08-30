import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar, SnackbarMessage } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RootState } from '../store/rootReducer';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

type SnackMessageProps = {
    id: string | number;
    message: SnackbarMessage;
}

const SnackMessage = React.forwardRef<unknown, SnackMessageProps>((props, ref) => {
    const classes = useStyles();
    const notification = useSelector((state: RootState) => state.notification.notifications.find(p => p.key === props.id));
    const [progress, setProgress] = React.useState(0);

    const [MAX] = useState(notification!.expiry!);
    const [MIN] = useState(new Date().getTime());

    const normalise = (value: number) => (value - MIN) * 100 / (MAX - MIN);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(normalise(new Date().getTime()));
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
        // @ts-ignore
        <Paper ref={ref} className={classes.paper}>
            <Typography>
                {props.message}
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
        </Paper>
    );
});

export default SnackMessage;