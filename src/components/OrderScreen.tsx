import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { hide, Order } from '../store/orderScreenSlice'
import CancelOrderIcon from '@material-ui/icons/Cancel';
import Prompt, { PromptOptions } from './Prompt';
import { addMoney } from '../store/appSlice';
import { removeOrder } from '../store/orderScreenSlice';
import { StandardTable } from './StandardTable';
import { StandardDialog } from './StandardDialog';
import { Countdown } from './Countdown';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
  }
}));

export default function OrderScreen() {
  const open = useSelector((state: RootState) => state.orderScreen.show);
  const orders = useSelector((state: RootState) => state.orderScreen.orders);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [promptOptions, setPromptOptions] = useState<PromptOptions>({
    ok: () => {},
    text: '',
    title: '',
  }) 
  
  const d = useDispatch();
  const dispatch = useCallback(d, []);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(hide());
  };

  const confirm = (order: Order) => {
    setPromptOptions({
      title: 'Confirm',
      text: `Cancel ${order.count} x ${order.name} for $${order.cost * .25}?`,
      ok: () => {
        dispatch(addMoney(order.cost * .75));
        dispatch(removeOrder(order.id));
        handleClose();
      }
    });
    setShowConfirm(true);
  }
  return (
    <>
      <StandardDialog open={open} handleClose={handleClose}>
        <div className={classes.table}>
          <StandardTable
            columns={[
              { field: 'id', hidden: true },
              { field: 'partId', hidden: true },
              { title: 'Count', field: 'count' },
              { title: 'Name', field: 'name' },
              { title: 'Total', field: 'cost', type: 'numeric' },
              { title: 'Due', field: 'arriving', render: (p) => <Countdown date={p.arriving} />}
            ]}
            actions={[
              (rowData: Order) => ({
                icon: CancelOrderIcon,
                tooltip: 'Cancel',
                onClick: (event, rowData: any) => confirm(rowData),
              })
            ]}
            data={JSON.parse(JSON.stringify(orders))}
            title='Orders'
          />
        </div>
      </StandardDialog>
      <Prompt open={showConfirm} setOpen={setShowConfirm} options={promptOptions} />
    </>
  );
}
