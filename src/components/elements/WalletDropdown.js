import React, { useContext, useEffect } from 'react';

import { AppContext } from '../ContextProvider';
import { maskAddress } from '../../helpers/utils';
import Button from 'react-bootstrap/Button';


const WalletDropdown = props => {
  const { actions } = useContext(AppContext);
  const { createWallet } = actions;

  const {
    availableWallets,
    setAvailableWallets,
    wallets,
    setWallet,
    walletAddress,
    setWalletAddress,
    walletsLoaded,
  } = props;


  useEffect(() => {
    const availableWallets = Object.keys(wallets)
      .reduce((acc, curr) => {
        if (wallets[curr].balance > 0) acc[curr] = wallets[curr];
        return acc;
      }, {});
    const selectedAddress = Object.keys(availableWallets)[0];
    const selectedWallet = wallets[selectedAddress];

    if (selectedAddress && selectedWallet) {
      setWalletAddress(selectedAddress);
      setWallet(selectedWallet);
    }
    setAvailableWallets(availableWallets);
  }, [wallets]);

  return (
    <>
      {walletsLoaded && Object.keys(availableWallets).length > 0 &&
        <select
          className="form-control autoWidth"
          onChange={e => {
            setWallet(wallets[e.target.value]);
            setWalletAddress(e.target.value);
          }}
          value={walletAddress}
        >
          {Object.keys(availableWallets).map(address =>
            <option value={address} key={address}>
              {maskAddress(address)} ({wallets[address].balance} CCX)
            </option>
          )}
        </select>
      }
      {walletsLoaded && Object.keys(wallets).length > 0 && Object.keys(availableWallets).length === 0 &&
        <div>
          Balance too low. Send some funds to your wallet to process this payment.
        </div>
      }
      {walletsLoaded && Object.keys(wallets).length === 0 &&
        <div>
          You have no wallets yet. Create one
          <Button className="btn-uppercase-sm btn-create-wallet" onClick={() => createWallet()}>
            here
          </Button>
        </div>
      }
    </>
  )
};

export default WalletDropdown;
