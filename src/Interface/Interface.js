/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Controls from './Components/Controls';
import HighLow from './Components/HighLow';
import Statistics from './Components/Statistics';
import Options from './Components/Options';
import './interfaceMain.css';
import { changeBank, changeInterface, restartCards } from '../StoreFunctions/actions';
import { drawBackground } from '../Core/GameEngine';
import { reDraw, SelectCard } from '../Core/GameView';
import { CARDS } from '../Models/stateTypes';

function Interface() {
  const stateBank = useSelector(state => state.bank);
  const stateInterface = useSelector(state => state.interface);
  const dispatch = useDispatch();
  const canvas = useSelector(state => state.canvas);
  const sprites = useSelector(state => state.sprites);
  const [bidAmount, setBidAmount] = useState(10);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('bidAmount')) {
      // eslint-disable-next-line radix
      setBidAmount(parseInt(sessionStorage.getItem('bidAmount')));
    }
  }, []);

  useEffect(() => {
    setShow(stateInterface);
  }, [stateInterface]);

  const reOpenCards = () => {
    dispatch(restartCards());
  };

  const newGame = (newRreset) => { // to be implemented in GameEngine
    dispatch(changeInterface());
    if (newRreset === 'reset') {
      if (stateBank > 100) {
        dispatch(changeBank(-(stateBank - 100)));
        sessionStorage.setItem('bank', stateBank - (stateBank - 100));
      } else {
        dispatch(changeBank(100 - stateBank));
        sessionStorage.setItem('bank', stateBank + (100 - stateBank));
      }
    }
    sessionStorage.setItem('bidAmount', 10);
    setBidAmount(10);
    reOpenCards();
    const c = canvas.current;
    const context = c.getContext('2d');
    drawBackground(context);
    reDraw(context, sprites.find(sprite => sprite.name === CARDS));
    SelectCard(context, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10, 50, window.innerHeight / 10, sprites.find(sprite => sprite.name === CARDS), 'default');
  };

  const updateBank = (result) => {
    if (result) {
      dispatch(changeBank(bidAmount));
      sessionStorage.setItem('bank', stateBank + bidAmount);
    } else if (stateBank - bidAmount === 0) {
      newGame('reset');
    } else {
      dispatch(changeBank(-bidAmount));
      sessionStorage.setItem('bank', stateBank - bidAmount);
      if (stateBank - bidAmount < bidAmount) {
        setBidAmount(stateBank - bidAmount);
        sessionStorage.setItem('bidAmount', stateBank - bidAmount);
      }
      newGame('new_game');
    }
  };

  return (
    <div className={show ? 'interface row' : 'interfaceDisable row'} style={{ height: window.innerHeight * 0.25 }}>
      <Statistics bank={stateBank} />
      <Controls bank={stateBank} bidAmount={bidAmount} setBidAmount={setBidAmount} />
      <HighLow
        bidAmount={bidAmount}
        canvas={canvas}
        updateBank={updateBank}
      />
      <Options newGame={newGame} />
    </div>
  );
}

export default Interface;
