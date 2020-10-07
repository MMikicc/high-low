import React from 'react';

const Options = () => {
  const newGame = (e) => {
    if (e.event.target === 'new_game') {
      console.log('New game');
    } else {
      console.log('Reset game');
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className="col-2">
      <h1>Options</h1>
      <div>
        <button onClick={(e) => { newGame(e); }} type="button" style={{ width: '120px' }} name="new_game" className="btn btn-primary">New Game</button>
      </div>
      <br />
      <div>
        <button onClick={(e) => { newGame(e); }} type="button" style={{ width: '120px' }} name="reset_game" className="btn btn-primary">Reset Game</button>
      </div>
    </div>
  );
};
export default Options;
