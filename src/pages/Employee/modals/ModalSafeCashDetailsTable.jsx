// import {currencyFormat} from '@app/services/utils';
import {currencyFormat} from '@app/services/utils';
import React from 'react';
import {Modal} from 'react-bootstrap';
// import {Link} from 'react-router-dom';

const ModalSafeCashDetailsTable = ({onHide, show, values}) => {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <BodyInfo onHide={onHide} values={values} />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({onHide, values}) => {
    console.log(values);
    const form = values;

    return (
        <>
            <div className="card-body">
                <div className="table_details">
                    <div className="d-flex p-2 text-center">
                        <div />
                        <div>Coins</div>
                        <div>Rolls</div>
                        <div>Total</div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Pennies</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                value={form.pennies}
                                className="form-control"
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                value={form.penniesRoll}
                                className="form-control"
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    form.pennies / 100 +
                                        (form.penniesRoll * 50) / 100
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Nickels</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.nickels}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.nickelsRoll}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    (form.nickels * 5) / 100 +
                                        (form.nickelsRoll * 5 * 40) / 100
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Dimes</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.dimes}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.dimesRoll}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    (form.dimes * 10) / 100 +
                                        (form.dimesRoll * 10 * 50) / 100
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> quarters</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.quarters}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.quartersRoll}
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    (form.quarters * 25) / 100 +
                                        (form.quartersRoll * 25 * 40) / 100
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2 text-center">
                        <div />
                        <div>Bills</div>
                        <div />
                        <div>Total</div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 1`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.ones}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(form.ones)}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 2`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.twos}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(Number(form.twos) * 2)}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 5`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.fives}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(Number(form.fives) * 5)}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 10`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.tens}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(Number(form.tens) * 10)}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 20`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.twenties}
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    Number(form.twenties) * 20
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 50`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.fifties}
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    Number(form.fifties) * 50
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> 100`s</div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={form.hundreds}
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={currencyFormat(
                                    Number(form.hundreds) * 100
                                )}
                                disabled
                            />{' '}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="flex-row p-2 justify-content-around">
                        <div className="d-flex justify-content-around mb-3">
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Coins Total
                                </span>
                                <input
                                    type="text"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={currencyFormat(
                                        Number(form.coinsTotal)
                                    )}
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Bills Total
                                </span>
                                <input
                                    type="text"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={currencyFormat(
                                        Number(form.billsTotal)
                                    )}
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Grand Total
                                </span>
                                <input
                                    type="text"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={currencyFormat(
                                        Number(form.grandTotal)
                                    )}
                                    disabled
                                />
                            </div>
                        </div>
                        <div style={{minWidth: '300px'}}>
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Comments
                            </span>
                            <textarea
                                title="Comments"
                                type="text"
                                className="form-control input-sm mr-3"
                                style={{minWidth: '50px'}}
                                value={form.comentaries}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-secondary w-100"
                type="button"
                onClick={() => onHide()}
            >
                Close
            </button>
        </>
    );
};

export default ModalSafeCashDetailsTable;
