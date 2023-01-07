/* eslint-disable no-unused-vars */
import React from 'react';
import '../modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {Modal} from 'react-bootstrap';

const ModalDrawerInDetails = ({onHide, show, idRow}) => {
    console.log(idRow);
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
                    {idRow ? (
                        <>
                            <b>Drawer In Details Balance </b>
                            <br />
                            <h5>
                                <b>User:</b> {idRow.User.name || null}{' '}
                            </h5>
                            <h6>
                                <b>Drawer:</b> {idRow.drawer}
                            </h6>
                        </>
                    ) : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {idRow ? (
                    <>
                        <Body
                            idRow={idRow.totalJson.drawerIn}
                            onHide={onHide}
                        />
                    </>
                ) : null}
            </Modal.Body>
        </Modal>
    );
};

const Body = ({idRow, onHide}) => {
    const disabled = true;
    const form = idRow;
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(
                                    form.pennies / 100 +
                                        (form.penniesRoll * 50) / 100
                                ).toFixed(2)}
                                disabled={disabled}
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
                                value={form.nickels}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={form.nickelsRoll}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(
                                    (form.nickels * 5) / 100 +
                                        (form.nickelsRoll * 5 * 40) / 100
                                ).toFixed(2)}
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
                                value={form.dimes}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={form.dimesRoll}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(
                                    (form.dimes * 10) / 100 +
                                        (form.dimesRoll * 10 * 50) / 100
                                ).toFixed(2)}
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
                                value={form.quarters}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                className="form-control"
                                value={form.quartersRoll}
                                disabled
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(
                                    (form.quarters * 25) / 100 +
                                        (form.quartersRoll * 25 * 40) / 100
                                ).toFixed(2)}
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
                                value={form.ones}
                                disabled
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.ones).toFixed(2)}
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
                                value={form.twos}
                                disabled
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.twos * 2).toFixed(2)}
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
                                value={form.fives}
                                disabled
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.fives * 5).toFixed(2)}
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
                                value={form.tens}
                                disabled
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.tens * 10).toFixed(2)}
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
                                value={form.twenties}
                                disabled
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.twenties * 20).toFixed(2)}
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
                                value={form.fifties}
                                disabled
                            />{' '}
                        </div>
                        <div> </div>
                        <div>
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.fifties * 50).toFixed(2)}
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
                                value={form.hundreds}
                                disabled
                            />{' '}
                        </div>
                        <div />
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={Number(form.hundreds * 100).toFixed(2)}
                                disabled
                            />{' '}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <div className="flex-row p-2 justify-content-around">
                        {/* REAL */}

                        <div className="d-flex justify-content-around mb-3">
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Coins Total
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={(
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100 +
                                        (Number(form.penniesRoll * 50) +
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
                                            Number(
                                                form.quartersRoll * 25 * 40
                                            )) /
                                            100
                                    ).toFixed(2)}
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
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={(
                                        Number(form.ones) +
                                        Number(form.twos * 2) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreds * 100)
                                    ).toFixed(2)}
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
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={(
                                        Number(form.ones) +
                                        Number(form.twos * 2) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreds * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100 +
                                        (Number(form.penniesRoll * 50) +
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
                                            Number(
                                                form.quartersRoll * 25 * 40
                                            )) /
                                            100
                                    ).toFixed(2)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row p-2 justify-content-around">
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
                                style={{
                                    minWidth: '50px'
                                }}
                                value={form.comments}
                                disabled
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

export default ModalDrawerInDetails;
