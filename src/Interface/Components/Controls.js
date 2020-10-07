import React, { useState } from 'react';

const Controls = (props) => {
  const [bidAmountValue, setBidAmountValue] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const changeBid = (e) => {
    const currentBid = e.target.name === 'raise' ? props.bidAmount + bidAmountValue : props.bidAmount - bidAmountValue;
    if ((currentBid <= 0 && e.target.name === 'lower') || currentBid > props.bank) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } else {
      setShowAlert(false);
      props.setBidAmount(currentBid);
    }
  };

  const changeBidAmount = (e) => {
    // eslint-disable-next-line radix
    setBidAmountValue(parseInt(e.target.value));
  };

  return (
    <div className="col-2" style={{ textAlign: 'center' }}>
      <div >
        <h1>Current bid: {props.bidAmount}</h1>
      </div>
      <div>
        <div className="p-10 d-inline"> <button onClick={e => changeBidAmount(e)} type="button" style={{ width: '50px' }} value="1" className="btn btn-success">1</button> </div>
        <div className="p-10 d-inline"> <button onClick={e => changeBidAmount(e)} type="button" style={{ width: '50px' }} value="5" className="btn btn-success">5</button> </div>
        <div className="p-10 d-inline"> <button onClick={e => changeBidAmount(e)} type="button" style={{ width: '50px' }} value="10" className="btn btn-success">10</button> </div>
      </div>
      <br />
      <div >
        <div className="p-1 d-inline"><button onClick={e => changeBid(e)} type="button" style={{ width: '120px' }} name="raise" className="btn btn-primary">Raise bid</button></div>
        <div className="p-1 d-inline"><button onClick={e => changeBid(e)} type="button" style={{ width: '120px' }} name="lower" className="btn btn-primary">Lower bid</button></div>
      </div>
      <div style={{ paddingTop: '5px' }}>
        <div className={showAlert ? 'alert alert-danger' : 'alertHide alert-danger'} role="alert">
          Invalid bid amount.
        </div>
      </div>
    </div>
  );
};

export default Controls;
