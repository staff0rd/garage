import React, { useEffect, useState } from 'react';
import { Game } from './Game';
import { Colors } from '@staff0rd/typescript';
import * as PIXI from 'pixi.js';
import { Config } from './Config';
import { Toolbar } from './components/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleModal } from './components/SimpleModal';

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

enum OpenModal {
  None,
  Buy,
  Sell,
}

const App = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState<OpenModal>(OpenModal.None);

  const handleClose = () => {
    setOpenModal(OpenModal.None);
  }

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

  const body = (
    <>
      <h1>A thing</h1>
      <p>The body</p>
    </>
  );

  return (
    <div className={classes.root}>
      <div className={classes.pixi} ref={pixiUpdate} />
      <Toolbar />
      <SimpleModal open={openModal !== OpenModal.None} handleClose={handleClose} body={body} />
    </div>
  );
}

export default App;
