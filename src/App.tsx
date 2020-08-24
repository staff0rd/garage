import React, { useEffect, useCallback } from 'react';
import { Game } from './Game';
import { Colors } from '@staff0rd/typescript';
import * as PIXI from 'pixi.js';
import { Toolbar } from './components/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import BuyScreen from './components/BuyScreen';
import { RootState } from './store/rootReducer';
import { refreshOffers } from './store/buyScreenSlice'
import { useSelector, useDispatch } from 'react-redux';

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

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Colors.BlueGrey.C900
});

const App = () => {
  const classes = useStyles();
  const config = useSelector((state: RootState) => state.app.config);
  const dispatch = useCallback(useDispatch(), []);
  
  const refresh = useCallback(() => {
    console.log('refresh')
    const nextRefresh = new Date();
    nextRefresh.setSeconds(nextRefresh.getSeconds() + config.offerRefreshSeconds);
    dispatch(refreshOffers(nextRefresh.getTime()));
  }, [dispatch, config.offerRefreshSeconds]);

  useEffect(() => { 
    const timer = setInterval(refresh, config.offerRefreshSeconds * 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    window.onresize = () => {
      app.view.width = window.innerWidth;
      app.view.height = window.innerHeight;
    };
  }, []);

  const pixiUpdate = (element: HTMLDivElement) => {
    if (element && element.children.length <= 0) {
        element.appendChild(app.view);
        const game = new Game(config, app);
        game.init();
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.pixi} ref={pixiUpdate} />
      <Toolbar />
      <BuyScreen />
    </div>
  );
}

export default App;
