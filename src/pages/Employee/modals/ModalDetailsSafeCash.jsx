/* eslint-disable indent */
import React, {useState, useEffect} from 'react';

import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import {countSafeCash} from '@app/services/';
import WizardComponent from '@app/pages/Employee/modals/wizard/WizardComponent';

const ModalDetailsSafeCash = ({onHide, show}) => {
    const [count, setCount] = useState();
    useEffect(() => {
        if (show) {
            (async () => {
                console.log('hi morrillo');
                setCount(await countSafeCash());
            })();
        }
    }, [show]);
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Safe Cash
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {count ? (
                    <>
                        {count === 'allow' ? (
                            <WizardComponent onHide={onHide} />
                        ) : (
                            <div>
                                You must accept pending registrations before
                                continuing
                            </div>
                        )}
                    </>
                ) : null}
            </Modal.Body>
        </Modal>
    );
};
export default ModalDetailsSafeCash;
