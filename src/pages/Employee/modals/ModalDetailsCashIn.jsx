/* eslint-disable indent */
import React from 'react';
import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';

const ModalDetailsCashIn = ({onHide, show, idRow}) => {
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
                    Drawer
                    {idRow?.drawer ? (
                        <>
                            {` ${idRow.drawer}`} - {idRow.User.name}
                        </>
                    ) : null}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BodyInfo idRow={idRow} onHide={onHide} />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({idRow, onHide}) => {
    const form = idRow;
    return (
        <>
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <div className="d-flex align-items-center">
                        {/* <span className="text" style={{minWidth: '50px'}}>
                            <input
                                type="text"
                                disabled
                                value={form.pennies}
                                className="text"
                            />
                        </span> */}
                        <span
                            className="input-group-text"
                            style={{minWidth: '50px'}}
                        >
                            Date
                        </span>
                        <input
                            type="date"
                            className="form-control mr-3"
                            disabled
                            value={form.date}
                        />
                    </div>
                </div>
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
                                disabled
                                value={form.pennies}
                                className="form-control"
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <input
                                type="text"
                                disabled
                                value={form.penniesRoll}
                                className="form-control"
                            />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={
                                    form.pennies / 100 +
                                    (form.penniesRoll * 50) / 100
                                }
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={
                                    (form.nickels * 5) / 100 +
                                    (form.nickelsRoll * 5 * 40) / 100
                                }
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={
                                    (form.dimes * 10) / 100 +
                                    (form.dimesRoll * 10 * 50) / 100
                                }
                                disabled
                            />{' '}
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div> Quarters</div>
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={
                                    (form.quarters * 25) / 100 +
                                    (form.quartersRoll * 25 * 40) / 100
                                }
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.ones}
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.twos * 2}
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.fives * 5}
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.tens * 10}
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.twenties * 20}
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
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.fifties * 50}
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
                                value={form.hundreads}
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
                                value={form.hundreads * 100}
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
                                        Number(form.hundreads * 100)
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
                                        Number(form.hundreads * 100) +
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
                                defaultValue={form.comentaries}
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

export default React.memo(ModalDetailsCashIn);
React.memo(BodyInfo);
