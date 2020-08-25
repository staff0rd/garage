import React, { useEffect, useCallback } from 'react';
import { Toolbar } from './components/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import BuyScreen from './components/BuyScreen';
import { RootState } from './store/rootReducer';
import { refreshOffers } from './store/buyScreenSlice'
import { useSelector, useDispatch } from 'react-redux';
import OrderScreen from './components/OrderScreen';
import { useGame } from './useGame';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  pixi: {
    width: '100%',
    height: '100%',
  },
}));

const App = () => {
  const classes = useStyles();
  const config = useSelector((state: RootState) => state.app.config);
  
  const dispatch = useCallback(useDispatch(), []);

  const { app } = useGame();
  
  const refresh = useCallback(() => {
    const nextRefresh = new Date();
    nextRefresh.setSeconds(nextRefresh.getSeconds() + config.offerRefreshSeconds);
    dispatch(refreshOffers(nextRefresh.getTime()));
  }, [dispatch, config.offerRefreshSeconds]);

  useEffect(() => { 
    refresh();
    const timer = setInterval(refresh, config.offerRefreshSeconds * 1000);
    return () => clearInterval(timer);
  }, [refresh, config.offerRefreshSeconds]);

  const pixiUpdate = (element: HTMLDivElement) => {
    if (element && element.children.length <= 0) {
        element.appendChild(app.view);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.pixi} ref={pixiUpdate} />
      <Toolbar />
      <BuyScreen />
      <OrderScreen />
    </div>
  );
}

export default App;
