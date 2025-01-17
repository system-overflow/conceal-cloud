import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import WAValidator from 'multicoin-address-validator';

import { AppContext } from '../ContextProvider';
import { useFormInput, useFormValidation } from '../../helpers/hooks';


const ContactModal = props => {
  const { contact, toggleModal, ...rest } = props;
  const { actions } = useContext(AppContext);
  const { addContact } = actions;

  const { value: label, bind: bindLabel, reset: resetLabel } = useFormInput(contact ? contact.label : '');
  const { value: address, bind: bindAddress, reset: resetAddress } = useFormInput(contact ? contact.address : '');
  const { value: paymentID, bind: bindPaymentID, reset: resetPaymentID } = useFormInput(contact ? contact.paymentID : '');

  const formValidation = contact
    ? (
        label.length > 0 &&
        WAValidator.validate(address, 'CCX') &&
        (paymentID === '' || paymentID.length === 64) &&
        !(label === contact.label && address === contact.address && paymentID === contact.paymentID)
      )
    : (
        label.length > 0 &&
        WAValidator.validate(address, 'CCX') &&
        (paymentID === '' || paymentID.length === 64)
      );
  const formValid = useFormValidation(formValidation);

  return (
    <Modal
      {...rest}
      size="lg"
      id="dlgAddContact"
      onHide={() => toggleModal('contact')}
    >
      <Modal.Header closeButton>
        <Modal.Title>{!props.contact ? 'Add New' : 'Edit'} Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={e =>
            addContact(
              {
                e,
                label,
                address,
                paymentID,
                entryID: contact ? contact.entryID : null,
                edit: !!props.contact,
                id: 'contactForm',
              },
              [
                resetLabel,
                resetAddress,
                resetPaymentID,
                toggleModal,
              ],
            )
          }
        >
          <div className="form-layout form-layout-7">
            <div className="row no-gutters">
              <div className="col-5 col-sm-3">
                Label
              </div>
              <div className="col-7 col-sm-9 wallet-address">
                <input
                  {...bindLabel}
                  size={2}
                  placeholder="Label"
                  className="form-control"
                  name="label"
                  type="text"
                  minLength={1}
                />
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-5 col-sm-3">
                Address
              </div>
              <div className="col-7 col-sm-9 wallet-address receive-address">
                <input
                  {...bindAddress}
                  size={2}
                  placeholder="Address"
                  className="form-control"
                  name="address"
                  type="text"
                  minLength={98}
                  maxLength={98}
                />
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-5 col-sm-3">
                Payment ID (optional)
              </div>
              <div className="col-7 col-sm-9 wallet-address">
                <input
                  {...bindPaymentID}
                  size={6}
                  placeholder="Payment ID"
                  className="form-control"
                  name="paymentID"
                  type="text"
                  maxLength={64}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formValid}
            className="btn btn-outline-primary btn-uppercase-sm btnSaveContact"
          >
            SAVE
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-secondary" onClick={() => toggleModal('contact')}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
};

export default ContactModal;
