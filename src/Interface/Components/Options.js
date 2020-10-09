import React from 'react';

const Options = (props) => {
  const newGame = (e) => {
    if (e.target.name === 'new_game') {
      props.newGame('new_game');
    } else {
      props.newGame('reset');
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className="col-2">
      <h1>Options</h1>
      <div>
        <button onClick={(e) => { newGame(e); }} type="button" style={{ width: '120px' }} name="new_game" className="btn btn-success">New Game</button>
      </div>
      <br />
      <div>
        <button onClick={(e) => { newGame(e); }} type="button" style={{ width: '120px' }} name="reset_game" className="btn btn-danger">Reset Game</button>
      </div>
    </div>
  );
};
export default Options;
