import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../ContextProvider';
import PortfolioCCX from '../cards/PortfolioCCX';
import PortfolioBTC from '../cards/PortfolioBTC';
import Transactions from '../cards/Transactions';
import Height from '../cards/Height';
import Wallet from '../elements/Wallet';
import MarketStats from '../cards/MarketStats';
import ImportWalletModal from '../modals/ImportWallet';


const Dashboard = props => {
  const { actions, state, ...rest } = useContext(AppContext);
  const { createWallet } = actions;
  const { appSettings, layout, wallets } = state;
  const { walletsLoaded } = layout;

  const [importWalletModalOpen, toggleImportWalletModalOpen] = useState(false);

  const walletsKeys = Object.keys(wallets);

  return (
    <div className="slim-mainpanel">
      <div className="container">

        <div className="slim-pageheader">
          <ol className="breadcrumb slim-breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="slim-pagetitle">Dashboard</h6>
        </div>

        <div className="card card-dash-one mg-t-20">
          <div className="row no-gutters">
            <div className="col-lg-3"><PortfolioCCX /></div>
            <div className="col-lg-3"><PortfolioBTC /></div>
            <div className="col-lg-3"><Transactions /></div>
            <div className="col-lg-3"><Height /></div>
          </div>
        </div>

        <div className="section-wrapper mg-t-20">
          <div className="d-flex flex-row width-100 justify-content-between mg-b-10">
            <label className="section-title d-inline-block">Your Wallets</label>
            <div>
              {walletsLoaded && (walletsKeys.length < appSettings.maxWallets || walletsKeys.length === 0) &&
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    window.confirm('You are about to create a new wallet. Proceed?') &&
                    createWallet()
                  }}
                >
                  CREATE NEW WALLET
                </button>
              }
              {walletsLoaded && (walletsKeys.length < appSettings.maxWallets + 1 || walletsKeys.length === 0) &&
                <button
                  className="btn btn-primary btn-sm mg-l-10"
                  onClick={() => toggleImportWalletModalOpen(!importWalletModalOpen)}
                >
                  IMPORT WALLET
                </button>
              }
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="list-group list-group-user">
                {walletsLoaded &&
                <>
                  {
                    walletsKeys.length > 0 &&
                    walletsKeys.map(address => <Wallet key={address} wallet={wallets[address]} address={address} />)
                  }
                  {walletsKeys.length === 0 &&
                    <div className="section-title text-center">You don't have any wallets. Please create one</div>
                  }
                </>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="row row-sm mg-t-20 flex-stretch-vertical">
          <div className="col-lg-12"><MarketStats /></div>
        </div>

        <ImportWalletModal
          {...rest}
          show={importWalletModalOpen}
          toggleModal={() => toggleImportWalletModalOpen(!importWalletModalOpen)}
        />

      </div>
    </div>
  )
};

export default Dashboard;
