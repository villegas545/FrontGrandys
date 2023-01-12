/* eslint-disable indent */
import React, {useState} from 'react';
import CurrencyFormat from 'react-currency-format';
import {useWizard} from 'react-use-wizard';
import BlockUi from 'react-block-ui';
import {useDispatch, useSelector} from 'react-redux';
import {getLastSafeCash} from '@app/services/index';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';

const CaptureSafe = ({setSubTitle}) => {
    const [form, setForm] = useState({
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        penniesRoll: 0,
        nickelsRoll: 0,
        dimesRoll: 0,
        quartersRoll: 0,
        ones: 0,
        twos: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreads: 0,
        total: 0,
        comentaries: ''
    });
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const [block, setBlock] = useState(false);
    const {nextStep, handleStep} = useWizard();
    const reduxValues = useSelector((state) => state.safeCash);
    useState(() => {
        setSubTitle('xxxxx');
    }, [setSubTitle]);
    useState(() => {
        (async () => {
            console.log(reduxValues);
            setBlock(true);
            const lastSafeCash = await getLastSafeCash(reduxValues.wizardDate);
            setBlock(false);
            console.log(lastSafeCash);
            const initValues = {
                pennies: 0,
                nickels: 0,
                dimes: 0,
                quarters: 0,
                penniesRoll: 0,
                nickelsRoll: 0,
                dimesRoll: 0,
                quartersRoll: 0,
                ones: 0,
                twos: 0,
                fives: 0,
                tens: 0,
                twenties: 0,
                fifties: 0,
                hundreads: 0,
                total: 0,
                comentaries: ''
            };
            if (lastSafeCash) {
                console.log(lastSafeCash);
                initValues.pennies += lastSafeCash.pennies;
                initValues.nickels += lastSafeCash.nickels;
                initValues.dimes += lastSafeCash.dimes;
                initValues.quarters += lastSafeCash.quarters;
                initValues.penniesRoll += lastSafeCash.penniesRoll;
                initValues.nickelsRoll += lastSafeCash.nickelsRoll;
                initValues.dimesRoll += lastSafeCash.dimesRoll;
                initValues.quartersRoll += lastSafeCash.quartersRoll;
                initValues.ones += lastSafeCash.ones;
                initValues.twos += lastSafeCash.twos;
                initValues.fives += lastSafeCash.fives;
                initValues.tens += lastSafeCash.tens;
                initValues.twenties += lastSafeCash.twenties;
                initValues.fifties += lastSafeCash.fifties;
                initValues.hundreads += lastSafeCash.hundreds;
                dispatch(
                    wizardVoucher({
                        type: 'wizardSafeStart',
                        total: lastSafeCash
                    })
                );
            } else {
                const iniSafe = {
                    pennies: 0,
                    nickels: 0,
                    dimes: 0,
                    quarters: 0,
                    penniesRoll: 0,
                    nickelsRoll: 0,
                    dimesRoll: 0,
                    quartersRoll: 0,
                    ones: 0,
                    twos: 0,
                    fives: 0,
                    tens: 0,
                    twenties: 0,
                    fifties: 0,
                    hundreads: 0
                };
                dispatch(
                    wizardVoucher({
                        type: 'wizardSafeStart',
                        total: iniSafe
                    })
                );
            }

            reduxValues.wizardCashIns.forEach((cashIn) => {
                initValues.pennies -= cashIn.pennies;
                initValues.nickels -= cashIn.nickels;
                initValues.dimes -= cashIn.dimes;
                initValues.quarters -= cashIn.quarters;
                initValues.penniesRoll -= cashIn.penniesRoll;
                initValues.nickelsRoll -= cashIn.nickelsRoll;
                initValues.dimesRoll -= cashIn.dimesRoll;
                initValues.quartersRoll -= cashIn.quartersRoll;
                initValues.ones -= cashIn.ones;
                initValues.twos -= cashIn.twos;
                initValues.fives -= cashIn.fives;
                initValues.tens -= cashIn.tens;
                initValues.twenties -= cashIn.twenties;
                initValues.fifties -= cashIn.fifties;
                initValues.hundreads -= cashIn.hundreads;
            });
            reduxValues.wizardCashOuts.forEach((cashOut) => {
                initValues.pennies += cashOut.pennies;
                initValues.nickels += cashOut.nickels;
                initValues.dimes += cashOut.dimes;
                initValues.quarters += cashOut.quarters;
                initValues.penniesRoll += cashOut.penniesRoll;
                initValues.nickelsRoll += cashOut.nickelsRoll;
                initValues.dimesRoll += cashOut.dimesRoll;
                initValues.quartersRoll += cashOut.quartersRoll;
                initValues.ones += cashOut.ones;
                initValues.twos += cashOut.twos;
                initValues.fives += cashOut.fives;
                initValues.tens += cashOut.tens;
                initValues.twenties += cashOut.twenties;
                initValues.fifties += cashOut.fifties;
                initValues.hundreads += cashOut.hundreds;
            });
            reduxValues.wizardVouchers.forEach((voucher) => {
                if (voucher.type === 'In') {
                    initValues.pennies += voucher.pennies;
                    initValues.nickels += voucher.nickels;
                    initValues.dimes += voucher.dimes;
                    initValues.quarters += voucher.quarters;
                    initValues.penniesRoll += voucher.penniesRoll;
                    initValues.nickelsRoll += voucher.nickelsRoll;
                    initValues.dimesRoll += voucher.dimesRoll;
                    initValues.quartersRoll += voucher.quartersRoll;
                    initValues.ones += voucher.ones;
                    initValues.twos += voucher.twos;
                    initValues.fives += voucher.fives;
                    initValues.tens += voucher.tens;
                    initValues.twenties += voucher.twenties;
                    initValues.fifties += voucher.fifties;
                    initValues.hundreads += voucher.hundreads;
                } else {
                    initValues.pennies -= voucher.pennies;
                    initValues.nickels -= voucher.nickels;
                    initValues.dimes -= voucher.dimes;
                    initValues.quarters -= voucher.quarters;
                    initValues.penniesRoll -= voucher.penniesRoll;
                    initValues.nickelsRoll -= voucher.nickelsRoll;
                    initValues.dimesRoll -= voucher.dimesRoll;
                    initValues.quartersRoll -= voucher.quartersRoll;
                    initValues.ones -= voucher.ones;
                    initValues.twos -= voucher.twos;
                    initValues.fives -= voucher.fives;
                    initValues.tens -= voucher.tens;
                    initValues.twenties -= voucher.twenties;
                    initValues.fifties -= voucher.fifties;
                    initValues.hundreads -= voucher.hundreads;
                }
            });
            setForm(initValues);
            dispatch(
                wizardVoucher({
                    type: 'wizardTotalExpected',
                    initValues
                })
            );
            console.log(initValues);
            // sumar todos los valores y vaciarlos en los values
        })();
    }, []);

    handleStep(() => {
        dispatch(
            wizardVoucher({
                type: 'wizardTotalReal',
                form
            })
        );
    });

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
                                    value={Number(form.pennies)}
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
                                    value={Number(form.penniesRoll)}
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
                                    value={Number(form.nickels)}
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
                                    value={Number(form.nickelsRoll)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dimes: e.target.value
                                        })
                                    }
                                    value={Number(form.dimes)}
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
                                    value={Number(form.dimesRoll)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quarters: e.target.value
                                        })
                                    }
                                    value={Number(form.quarters)}
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
                                    value={Number(form.quartersRoll)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            ones: e.target.value
                                        })
                                    }
                                    value={Number(form.ones)}
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
                                    value={Number(form.ones)}
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
                                    value={Number(form.twos)}
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
                                    value={Number(form.twos * 2)}
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
                                    value={Number(form.fives)}
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
                                    value={Number(form.fives * 5)}
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
                                    value={Number(form.tens)}
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
                                    value={Number(form.tens * 10)}
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
                                    value={Number(form.twenties)}
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
                                    value={Number(form.twenties * 20)}
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
                                    value={Number(form.fifties)}
                                />{' '}
                            </div>
                            <div> </div>
                            <div>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control"
                                    value={Number(form.fifties * 50)}
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
                                            hundreads: e.target.value
                                        })
                                    }
                                    value={Number(form.hundreads)}
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
                                    value={Number(form.hundreads * 100)}
                                    disabled
                                />{' '}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around">
                        <div className="flex-row p-2 justify-content-around">
                            Real:
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
                                        value={
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
                                        }
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
                                        value={
                                            Number(form.ones) +
                                            Number(form.twos * 2) +
                                            Number(form.fives * 5) +
                                            Number(form.tens * 10) +
                                            Number(form.twenties * 20) +
                                            Number(form.fifties * 50) +
                                            Number(form.hundreads * 100)
                                        }
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
                                        value={
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
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                            Expected:
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
                                        value={
                                            (Number(
                                                reduxValues.wizardTotalExpected
                                                    .pennies
                                            ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .nickels * 5
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .dimes * 10
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .quarters * 25
                                                )) /
                                                100 +
                                            (Number(
                                                reduxValues.wizardTotalExpected
                                                    .penniesRoll * 50
                                            ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .nickelsRoll *
                                                        5 *
                                                        40
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .dimesRoll *
                                                        10 *
                                                        50
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .quartersRoll *
                                                        25 *
                                                        40
                                                )) /
                                                100
                                        }
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
                                        value={
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .ones
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .twos * 2
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .fives * 5
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .tens * 10
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .twenties * 20
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .fifties * 50
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .hundreads * 100
                                            )
                                        }
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
                                        value={
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .ones
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .twos * 2
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .fives * 5
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .tens * 10
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .twenties * 20
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .fifties * 50
                                            ) +
                                            Number(
                                                reduxValues.wizardTotalExpected
                                                    .hundreads * 100
                                            ) +
                                            (Number(
                                                reduxValues.wizardTotalExpected
                                                    .pennies
                                            ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .nickels * 5
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .dimes * 10
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .quarters * 25
                                                )) /
                                                100 +
                                            (Number(
                                                reduxValues.wizardTotalExpected
                                                    .penniesRoll * 50
                                            ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .nickelsRoll *
                                                        5 *
                                                        40
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .dimesRoll *
                                                        10 *
                                                        50
                                                ) +
                                                Number(
                                                    reduxValues
                                                        .wizardTotalExpected
                                                        .quartersRoll *
                                                        25 *
                                                        40
                                                )) /
                                                100
                                        }
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            comentaries: e.target.value
                                        })
                                    }
                                    value={form.comentaries}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-danger"> {error || null}</p>

                    <div className="float-right">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => nextStep()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </BlockUi>
        </>
    );
};

export default CaptureSafe;
React.memo(CaptureSafe);
