import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { makeStyles } from '@material-ui/core/styles';
import { hide, BuyableItem, removeOffer } from '../store/buyScreenSlice'
import AcceptOfferIcon from '@material-ui/icons/AddBox';
import Prompt, { PromptOptions } from './Prompt';
import { removeMoney } from '../store/appSlice';
import { addOrder } from '../store/orderScreenSlice';
import { Random, Guid } from '@staff0rd/typescript';
import { StandardTable } from './StandardTable';
import { StandardDialog } from './StandardDialog';
import { Countdown } from './Countdown';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
  }
}));

export default function BuyScreen() {
  const open = useSelector((state: RootState) => state.buyScreen.show);
  const offers = useSelector((state: RootState) => state.buyScreen.offers);
  const offerRefresh = useSelector((state: RootState) => state.buyScreen.offerRefresh);
  const money = useSelector((state: RootState) => state.app.money);
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

  const confirm = (offer: BuyableItem) => {
    setPromptOptions({
      title: 'Confirm',
      text: `Buy ${offer.count} x ${offer.name} for $${offer.cost}?`,
      ok: () => {
        dispatch(removeOffer(offer.id));
        dispatch(removeMoney(offer.cost));
        const arrive = new Date();
        arrive.setSeconds(arrive.getSeconds() + Random.between(10, 30));
        dispatch(addOrder({
          arriving: arrive.getTime(),
          cost: offer.cost,
          id: Guid(),
          partId: offer.partId,
          name: offer.name,
          count: offer.count,
        }))
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
              { field: 'partId', hidden: true},
              { title: 'Count', field: 'count' },
              { title: 'Name', field: 'name' },
              { title: 'PerUnit', field: 'costPerUnit', type: 'numeric', 
                cellStyle: { width: 30, maxWidth: 30, padding: 0 },
                headerStyle: { width: 30, maxWidth: 30 } },
              { title: 'Total', field: 'cost', type: 'numeric' }
            ]}
            actions={[
              (rowData: BuyableItem) => ({
                icon: AcceptOfferIcon,
                tooltip: 'Buy',
                onClick: (event, rowData: any) => confirm(rowData),
                disabled: rowData.cost > money
              })
            ]}
            data={JSON.parse(JSON.stringify(offers))}
            title={<div>Buy (<Countdown date={offerRefresh} />)</div>}
          />
        </div>
      </StandardDialog>
      <Prompt open={showConfirm} setOpen={setShowConfirm} options={promptOptions} />
    </>
  );
}
