import React, {useEffect} from 'react';
import '../modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import BlockUi from 'react-block-ui';
import {useWizard} from 'react-use-wizard';

const ModalDrawerOut = ({idRow, block, setForm, form, error, setSubTitle}) => {
    const {nextStep} = useWizard();
    useEffect(() => {
        setSubTitle('Please Register The Drawer Out');
    }, []);
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            pennies: e.target.value
                                        })
                                    }
                                    value={form.pennies}
                                    className="form-control"
                                />{' '}
                            </div>
                            <div>
                                {' '}
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            penniesRoll: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nickels: e.target.value
                                        })
                                    }
                                    value={form.nickels}
                                />{' '}
                            </div>
                            <div>
                                {' '}
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nickelsRoll: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dimes: e.target.value
                                        })
                                    }
                                    value={form.dimes}
                                />{' '}
                            </div>
                            <div>
                                {' '}
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dimesRoll: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quarters: e.target.value
                                        })
                                    }
                                    value={form.quarters}
                                />{' '}
                            </div>
                            <div>
                                {' '}
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quartersRoll: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            ones: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            twos: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            fives: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tens: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            twenties: e.target.value
                                        })
                                    }
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
                                    value={Number(form.twenties * 20).toFixed(
                                        2
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            fifties: e.target.value
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hundreds: e.target.value
                                        })
                                    }
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
                                    value={Number(form.hundreds * 100).toFixed(
                                        2
                                    )}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            comments: e.target.value
                                        })
                                    }
                                    value={form.comments}
                                />
                            </div>
                            <p className="text-danger"> {true || null}</p>
                            {!idRow ? (
                                <>
                                    {' '}
                                    <div>
                                        <input
                                            type="submit"
                                            className="btn btn-dark btn-lg w-100"
                                            value="Next"
                                            onClick={() => nextStep()}
                                        />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <p className="text-danger"> {error || null}</p>
                </div>
            </BlockUi>
        </>
    );
};

export default ModalDrawerOut;
