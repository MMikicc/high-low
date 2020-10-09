import React from 'react';

const Statistics = props => (
  <div className="col-2 offset-1" style={{ textAlign: 'center' }}>
    <h1>Coins: { props.bank }</h1>
  </div>
);

export default Statistics;
