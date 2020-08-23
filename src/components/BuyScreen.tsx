import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { hide } from '../store/buyScreenSlice'
import MaterialTable from 'material-table';
import { tableIcons } from './tableIcons';
import Paper from '@material-ui/core/Paper';
import Countdown, { CountdownRenderProps } from 'react-countdown';

const useStyles = makeStyles(() => ({
  root: {
  },
  table: {
    minWidth: 500,
  }
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyScreen() {
  const open = useSelector((state: RootState) => state.buyScreen.show);
  const offers = useSelector((state: RootState) => state.buyScreen.offers);
  const offerRefresh = useSelector((state: RootState) => state.buyScreen.offerRefresh);
  
  const d = useDispatch();
  const dispatch = useCallback(d, []);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(hide());
  };

  const countdownRenderer = ({ minutes, seconds }: CountdownRenderProps) => (
    <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
  );

  return (
      <Dialog
        className={classes.root}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
      >
        <DialogContent>
          <div className={classes.table}>
            <MaterialTable
              options={{
                pageSizeOptions: [],
                padding: "dense",
              }}
              localization={{
                pagination: {
                  labelRowsSelect: '',
                }
              }}
              components={{
                Container: props => <Paper {...props} elevation={0}/>
              }}
              icons={tableIcons}
              columns={[
                { title: 'Id', field: 'id', hidden: true },
                { title: 'Count', field: 'count' },
                { title: 'Name', field: 'name' },
                { title: 'PerUnit', field: 'costPerUnit', type: 'numeric', 
                  cellStyle: { width: 30, maxWidth: 30, padding: 0 },
                  headerStyle: { width: 30, maxWidth: 30 } },
                { title: 'Total', field: 'cost', type: 'numeric' }
              ]}
              data={JSON.parse(JSON.stringify(offers))}
              title={<div>Buy (<Countdown date={offerRefresh} renderer={countdownRenderer} />)</div>}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}
