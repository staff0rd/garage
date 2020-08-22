import React from 'react';
import { Game } from './Game';
import './App.css';
import { Colors } from '@staff0rd/typescript'
import * as PIXI from 'pixi.js';
import { Config } from './Config';

const getConfig: (() => Config) = () => ({
  tileSize: 50,
});

const App = () => {
  const pixiUpdate = (element: HTMLDivElement) => {

    if (element && element.children.length <= 0) {
        const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, backgroundColor: Colors.BlueGrey.C900 });
        element.appendChild(app.view);
        const game = new Game(getConfig(), app);
        game.init();
    }
}

  return (<div>
      <div ref={pixiUpdate} />
    </div>
    );
}

export default App;
