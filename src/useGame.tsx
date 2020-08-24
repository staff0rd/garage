import { useEffect, useCallback, useState } from 'react';
import { Game } from './Game';
import { Colors } from '@staff0rd/typescript';
import * as PIXI from 'pixi.js';
import { RootState } from './store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Colors.BlueGrey.C900
});

window.onresize = () => {
  app.view.width = window.innerWidth;
  app.view.height = window.innerHeight;
};

export const useGame = () => {
  const config = useSelector((state: RootState) => state.app.config);
  const orders = useSelector((state: RootState) => state.orderScreen.orders);
  const [game] = useState<Game>(new Game(config, app));
  const dispatch = useCallback(useDispatch(), []);

  const checkOrders = useCallback(() => {
    const ordersReady = orders.filter(o => o.arriving <= new Date().getTime());
    console.log(`orders: ${orders.length}, ready: ${ordersReady.length}`);
    ordersReady.forEach(o => {
      const delivered = game.deliver(o);
    });
  }, [orders, game]);

  useEffect(() => {
    const timer = setInterval(checkOrders, config.checkOrdersMilliseconds);
    return () => clearInterval(timer);
  }, [checkOrders, config.checkOrdersMilliseconds]);

  useEffect(() => {
    game.init();
  }, [game]);

  return { app };
};


