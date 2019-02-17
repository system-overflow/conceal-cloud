import React, { useContext } from 'react';

import { AppContext } from '../ContextProvider';


const PortfolioCCX = () => {
  const { appSettings, wallets } = useContext(AppContext);

  const totalCCX = Object.keys(wallets).reduce((acc, curr) => acc + wallets[curr].balance || acc, 0);

  return (
    <div className="dash-content">
      <label className="tx-primary">PORTFOLIO CCX</label>
      <h2>{totalCCX.toLocaleString(undefined, { minimumFractionDigits: appSettings.coinDecimals })} CCX</h2>
    </div>
  )
};

export default PortfolioCCX;
