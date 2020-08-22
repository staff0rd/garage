import React, { useEffect } from 'react';
import { Game } from './Game';
import { Colors } from '@staff0rd/typescript';
import * as PIXI from 'pixi.js';
import { Config } from './Config';
import { Toolbar } from './components/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const getConfig: (() => Config) = () => ({
  tileSize: 50,
});

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
  useEffect(() => {
    window.onresize = () => {
      app.view.width = window.innerWidth;
      app.view.height = window.innerHeight;
    };
  }, []);

  const pixiUpdate = (element: HTMLDivElement) => {
    if (element && element.children.length <= 0) {
        
        element.appendChild(app.view);
        const game = new Game(getConfig(), app);
        game.init();
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.pixi} ref={pixiUpdate} />
      <Toolbar />
    </div>
  );
}

export default App;
