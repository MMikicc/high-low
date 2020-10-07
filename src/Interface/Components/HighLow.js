import React from 'react';

const HighLow = (props) => {
  const playGame = (e) => {
    console.log(e.target.name);
  };
  return (
    <div style={{ textAlign: 'center' }} className="col-2">
      <h1>Play</h1>
      <div>
        <button onClick={(e) => { playGame(e); }} type="button" style={{ width: '120px' }} name="higher" className="btn btn-primary">Higher</button>
      </div>
      <br />
      <div>
        <button onClick={(e) => { playGame(e); }} type="button" style={{ width: '120px' }} name="lower" className="btn btn-primary">Lower</button>
      </div>
    </div>
  );
};

export default HighLow;
