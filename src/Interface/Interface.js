/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Controls from './Components/Controls';
import HighLow from './Components/HighLow';
import Statistics from './Components/Statistics';
import Options from './Components/Options';
import './interfaceMain.css';
import { changeBank, changeInterface, restartCards } from '../StoreFunctions/actions';
import { SelectNewCardI } from '../Core/GameView';

function Interface() {
  const stateBank = useSelector(state => state.bank);
  const stateInterface = useSelector(state => state.interface);
  const dispatch = useDispatch();
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

  const newGame = (newRreset) => {
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
    SelectNewCardI();
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
        updateBank={updateBank}
      />
      <Options newGame={newGame} />
    </div>
  );
}

export default Interface;
