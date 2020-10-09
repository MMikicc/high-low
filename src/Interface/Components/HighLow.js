import React from 'react';
import { useDispatch } from 'react-redux';
import { SelectCardAnimation } from '../../Core/GameView';
import { changeInterface } from '../../StoreFunctions/actions';

const HighLow = (props) => {
  const dispatch = useDispatch();

  const PlayGame = (e) => {
    dispatch(changeInterface());
    const checkWin = SelectCardAnimation(props.canvas, e.target.name);
    const result = checkWin();
    if (!result) {
      setTimeout(() => {
        props.updateBank(result);
      }, 4000);
    } else {
      setTimeout(() => {
        props.updateBank(result);
      }, 2000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className="col-2">
      <h1>Play</h1>
      <div>
        <button onClick={(e) => { PlayGame(e); }} type="button" style={{ width: '120px' }} name="higher" className="btn btn-primary">Higher</button>
      </div>
      <br />
      <div>
        <button onClick={(e) => { PlayGame(e); }} type="button" style={{ width: '120px' }} name="lower" className="btn btn-primary">Lower</button>
      </div>
    </div>
  );
};

export default HighLow;
