import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Controls from './Components/Controls';
import HighLow from './Components/HighLow';
import Statistics from './Components/Statistics';
import Options from './Components/Options';
import './interfaceMain.css';

function Interface() {
  const stateBank = useSelector(state => state.bank);
  const [bidAmount, setBidAmount] = useState(10);

  return (
    <div className="interface row" style={{ height: window.innerHeight * 0.25 }}>
      <Statistics bank={stateBank} />
      <Controls bank={stateBank} bidAmount={bidAmount} setBidAmount={setBidAmount} />
      <HighLow bidAmount={bidAmount} />
      <Options />
    </div>
  );
}

export default Interface;
