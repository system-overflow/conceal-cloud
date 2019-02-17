import React, { useContext } from 'react';

import { AppContext } from '../ContextProvider';


const PortfolioBTC = () => {
  const { prices, wallets } = useContext(AppContext);

  const totalCCX = Object.keys(wallets).reduce((acc, curr) => acc + wallets[curr].balance || acc, 0);

  return (
    <div className="dash-content">
      <label className="tx-primary">PORTFOLIO BTC</label>
      <h2>{(prices.priceCCXBTC * totalCCX).toLocaleString(undefined, { minimumFractionDigits: 8 })} BTC</h2>
    </div>
  )
};

export default PortfolioBTC;
