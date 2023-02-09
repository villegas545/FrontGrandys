import React from 'react';

import {Modal} from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

export const ModalTotals = ({onHide, show, money}) => {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <BodyInfo onHide={onHide} money={money} />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({onHide, money}) => {
    console.log(money);
    const form = {
        pennies: money.pennies,
        nickels: money.nickels,
        dimes: money.dimes,
        quarters: money.quarters,
        penniesRoll: money.penniesRoll,
        nickelsRoll: money.nickelsRoll,
        dimesRoll: money.dimesRoll,
        quartersRoll: money.quartersRoll,
        ones: money.ones,
        twos: money.twos,
        fives: money.fives,
        tens: money.tens,
        twenties: money.twenties,
        fifties: money.fifties,
        hundreds: money.hundreds
    };

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
                                disabled
                                value={form.hundreds}
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
                                    value={Number(
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100 +
                                            (Number(form.penniesRoll * 50) +
                                                Number(
                                                    form.nickelsRoll * 5 * 40
                                                ) +
                                                Number(
                                                    form.dimesRoll * 10 * 50
                                                ) +
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
                                    value={Number(
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
                                    value={Number(
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
                                                Number(
                                                    form.nickelsRoll * 5 * 40
                                                ) +
                                                Number(
                                                    form.dimesRoll * 10 * 50
                                                ) +
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

export default ModalTotals;
