import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';

import { AppContext } from '../../ContextProvider';
import { useFormInput, useFormValidation } from '../../../helpers/hooks';
import CopyButton from '../CopyButton';
import { maskAddress } from '../../../helpers/utils';


const IPNForm = props => {
  const { address, wallet } = props;
  const { actions, state } = useContext(AppContext);
  const { updateIPNConfig } = actions;
  const { appSettings, layout } = state;
  const { formSubmitted, message } = layout;

  const { value: IPNName, bind: bindIPNName } = useFormInput('');
  const { value: IPNURL, bind: bindIPNURL } = useFormInput('');
  const { value: IPNSuccessInputURL, bind: bindIPNSuccessInputURL } = useFormInput('');
  const { value: IPNFailedInputURL, bind: bindIPNFailedInputURL } = useFormInput('');
  const { value: IPNMaxRetries, bind: bindIPNMaxRetries } = useFormInput('');
  const { value: IPNTxThreshold, bind: bindIPNTxThreshold } = useFormInput('');
  const IPNWallet = address;

  const IPNFormValidation = (
    IPNName !== '' &&
    IPNWallet !== '' &&
    IPNURL !== '' && IPNURL.startsWith('http') &&
    IPNSuccessInputURL !== '' && IPNSuccessInputURL.startsWith('http') &&
    IPNFailedInputURL !== '' && IPNFailedInputURL.startsWith('http') &&
    parseInt(IPNMaxRetries) &&
    parseInt(IPNTxThreshold)
  );
  const IPNFormValid = useFormValidation(IPNFormValidation);

  const handleIPNKeyFocus = event => event.target.firstChild
    ? event.target.firstChild.select()
    : event.target.select();

  const clientURL = client => `${appSettings.IPNURL}/?client=${client}&amount=AMOUNT&ref=REF`;

  return (
    <Card key={address}>
      <Card.Header>
		<div class="row no-gutters">
			<div class="col-5 col-sm-4">
				<Accordion.Toggle as={Button} variant="link" eventKey={address}>
				  <FontAwesomeIcon icon="caret-down" fixedWidth /> {maskAddress(address)}
				</Accordion.Toggle>			
			</div>
			<div class="col-7 col-sm-8 PaymentInfo">
				{(wallet.ipn && wallet.ipn.clientKey)
				  ? <div className="fa-pull-right">
					  Client Key: {wallet.ipn.clientKey}&nbsp;&nbsp;
					  <CopyButton text={wallet.ipn.clientKey} toolTipText="Copy Client IPN Key" />
					</div>
				  : <div className="fa-pull-right">
					IPN not yet configured for this wallet
				  </div>
				}
			</div>
		</div>
      </Card.Header>
      <Accordion.Collapse eventKey={address}>
        <Card.Body>
          <div className="form-layout form-layout-7">
            {message.ipnForm &&
              <div className="text-danger mg-b-20">{message.ipnForm}</div>
            }
            <form
              className="form-layout form-layout-2"
              onSubmit={e =>
                updateIPNConfig({
                  e,
                  IPNName,
                  IPNWallet,
                  IPNURL,
                  IPNSuccessInputURL,
                  IPNFailedInputURL,
                  IPNMaxRetries,
                  IPNTxThreshold,
                  id: 'ipnForm',
                })
              }
            >
              <input type="hidden" readOnly value={address} />
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  Name of the business
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNName}
                    placeholder={wallet.ipn ? wallet.ipn.name : 'Business Name'}
                    type="text"
                    name="ipnName"
                    className="form-control"
                    minLength={1}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  Callback URL
                  <label className="codeExample">
                    e.g. <code>https://example.com/ccx_transaction_received?tx=TX_HASH&ref=ORDER_ID</code>
                  </label>
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNURL}
                    placeholder={wallet.ipn ? wallet.ipn.ipnUrl : 'Callback URL'}
                    type="url"
                    name="ipnURL"
                    className="form-control"
                    minLength={10}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  URL to redirect on successful payment
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNSuccessInputURL}
                    placeholder={wallet.ipn ? wallet.ipn.successIpnUrl : 'Success URL'}
                    type="url"
                    name="ipnSuccessURL"
                    className="form-control"
                    minLength={10}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  URL to redirect on failed payment
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNFailedInputURL}
                    placeholder={wallet.ipn ? wallet.ipn.failedIpnUrl : 'Failed URL'}
                    type="url"
                    name="ipnFailedURL"
                    className="form-control"
                    minLength={10}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  Number of retries to call callback URL (max. 10 times)
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNMaxRetries}
                    placeholder={wallet.ipn ? wallet.ipn.maxRetries : 'Max. Retries'}
                    type="number"
                    name="ipnMaxRetries"
                    className="form-control autoWidth"
                    min={0}
                    max={10}
                  />
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-5 col-sm-4">
                  Number of confirmations before calling callback URL
                </div>
                <div className="col-7 col-sm-8 wallet-address">
                  <input
                    {...bindIPNTxThreshold}
                    placeholder={wallet.ipn ? wallet.ipn.txThreshold : 'Nr. of Confirmations'}
                    type="number"
                    name="ipnTxThreshold"
                    className="form-control autoWidth"
                    min={1}
                    max={10}
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  id="btnUpdateIPN"
                  className="btn btn-outline-primary btn-uppercase-sm"
                  disabled={formSubmitted || !IPNFormValid}
                >
                  UPDATE
                </button>
              </div>
            </form>
            {wallet.ipn && wallet.ipn.clientKey &&
              <div class="paymentInstructions">
                <div className="d-flex flex flex-column">
                  <div className="mg-b-15">
                    Use this URL to receive CCX payments from your Website:
                  </div>
                  <div className="d-flex flex flex-row align-items-stretch">
                    <pre className="flex-1 paymentURL" onClick={handleIPNKeyFocus}>
                      <input readOnly type="text" value={clientURL(wallet.ipn.clientKey)} />
                    </pre>
                    <div>
                      <CopyButton text={clientURL(wallet.ipn.clientKey)} toolTipText="Copy IPN URL" />
                    </div>
                  </div>
                  <div>
                    Modify <code>AMOUNT</code> and <code>REF</code> values to suit your needs.<br />
                    Callback URL, after successful payment, will include <strong>Transaction Hash</strong>, along with <code>REF</code> value, e.g.<br />
                    <code>{wallet.ipn.ipnUrl}?tx=TX_HASH&ref=REF</code>.
                  </div>
                </div>
              </div>
            }
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default IPNForm;
