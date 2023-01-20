/* eslint-disable indent */
import React, {useState} from 'react';
import CurrencyFormat from 'react-currency-format';
import {useWizard} from 'react-use-wizard';
import BlockUi from 'react-block-ui';
import {useDispatch, useSelector} from 'react-redux';
import {getLastSafeCash, getCashOutByDate} from '@app/services/index';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';

const CaptureDrawerOut = ({setSubtitle}) => {
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
        hundreds: 0,
        total: 0,
        comentaries: '',
        expected: {
            coinsTotal: 0,
            billsTotal: 0,
            grandTotal: 0
        }
    });
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const [block, setBlock] = useState(false);
    const {nextStep, handleStep} = useWizard();
    const reduxValues = useSelector((state) => state.safeCash);
    useState(() => {
        setSubtitle('Capture The Safe');
    }, [setSubtitle]);
    useState(() => {
        (async () => {
            try {
                console.log(reduxValues);
                setBlock(true);
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
                    hundreds: 0,
                    total: 0,
                    comentaries: '',
                    expected: {
                        coinsTotal: 0,
                        billsTotal: 0,
                        grandTotal: 0
                    }
                };
                // obtener el monto anterior de safeCash--drawer In,drawer Out= (1,000 + 9,000 = 10,000)
                const lastSafeCash = await getLastSafeCash(
                    reduxValues.wizardDate
                );
                if (lastSafeCash) {
                    initValues.pennies += Number(
                        lastSafeCash.realAmount.drawerOut.pennies
                    );
                    initValues.nickels += Number(
                        lastSafeCash.realAmount.drawerOut.nickels
                    );
                    initValues.dimes += Number(
                        lastSafeCash.realAmount.drawerOut.dimes
                    );
                    initValues.quarters += Number(
                        lastSafeCash.realAmount.drawerOut.quarters
                    );
                    initValues.penniesRoll += Number(
                        lastSafeCash.realAmount.drawerOut.penniesRoll
                    );
                    initValues.nickelsRoll += Number(
                        lastSafeCash.realAmount.drawerOut.nickelsRoll
                    );
                    initValues.dimesRoll += Number(
                        lastSafeCash.realAmount.drawerOut.dimesRoll
                    );
                    initValues.quartersRoll += Number(
                        lastSafeCash.realAmount.drawerOut.quartersRoll
                    );
                    initValues.ones += Number(
                        lastSafeCash.realAmount.drawerOut.ones
                    );
                    initValues.twos += Number(
                        lastSafeCash.realAmount.drawerOut.twos
                    );
                    initValues.fives += Number(
                        lastSafeCash.realAmount.drawerOut.fives
                    );
                    initValues.tens += Number(
                        lastSafeCash.realAmount.drawerOut.tens
                    );
                    initValues.twenties += Number(
                        lastSafeCash.realAmount.drawerOut.twenties
                    );
                    initValues.fifties += Number(
                        lastSafeCash.realAmount.drawerOut.fifties
                    );
                    initValues.hundreds += Number(
                        lastSafeCash.realAmount.drawerOut.hundreds
                    );
                }
                // restar a safecash.drawer in el cash in (1,000 - 500 = 500) con 5 cajas abiertas de 100 dolares c/u

                const cashOutByManagerAndDate = await getCashOutByDate(
                    reduxValues.wizardDate
                );
                dispatch(
                    wizardVoucher({
                        type: 'cashOut',
                        cashOutByManagerAndDate
                    })
                );
                cashOutByManagerAndDate.forEach((item) => {
                    initValues.pennies += Number(
                        item.totalJson.drawerOut.pennies
                    );
                    initValues.nickels += Number(
                        item.totalJson.drawerOut.nickels
                    );
                    initValues.dimes += Number(item.totalJson.drawerOut.dimes);
                    initValues.quarters += Number(
                        item.totalJson.drawerOut.quarters
                    );
                    initValues.penniesRoll += Number(
                        item.totalJson.drawerOut.penniesRoll
                    );
                    initValues.nickelsRoll += Number(
                        item.totalJson.drawerOut.nickelsRoll
                    );
                    initValues.dimesRoll += Number(
                        item.totalJson.drawerOut.dimesRoll
                    );
                    initValues.quartersRoll += Number(
                        item.totalJson.drawerOut.quartersRoll
                    );
                    initValues.ones += Number(item.totalJson.drawerOut.ones);
                    initValues.twos += Number(item.totalJson.drawerOut.twos);
                    initValues.fives += Number(item.totalJson.drawerOut.fives);
                    initValues.tens += Number(item.totalJson.drawerOut.tens);
                    initValues.twenties += Number(
                        item.totalJson.drawerOut.twenties
                    );
                    initValues.fifties += Number(
                        item.totalJson.drawerOut.fifties
                    );
                    initValues.hundreds += Number(
                        item.totalJson.drawerOut.hundreds
                    );
                });
                //! AGREGAR LOS VOUCHERS
                initValues.pennies += Number(
                    reduxValues.wizardVouchers.pennies
                );
                initValues.nickels += Number(
                    reduxValues.wizardVouchers.nickels
                );
                initValues.dimes += Number(reduxValues.wizardVouchers.dimes);
                initValues.quarters += Number(
                    reduxValues.wizardVouchers.quarters
                );
                initValues.penniesRoll += Number(
                    reduxValues.wizardVouchers.penniesRoll
                );
                initValues.nickelsRoll += Number(
                    reduxValues.wizardVouchers.nickelsRoll
                );
                initValues.dimesRoll += Number(
                    reduxValues.wizardVouchers.dimesRoll
                );
                initValues.quartersRoll += Number(
                    reduxValues.wizardVouchers.quartersRoll
                );
                initValues.ones += Number(reduxValues.wizardVouchers.ones);
                initValues.twos += Number(reduxValues.wizardVouchers.twos);
                initValues.fives += Number(reduxValues.wizardVouchers.fives);
                initValues.tens += Number(reduxValues.wizardVouchers.tens);
                initValues.twenties += Number(
                    reduxValues.wizardVouchers.twenties
                );
                initValues.fifties += Number(
                    reduxValues.wizardVouchers.fifties
                );
                initValues.hundreds += Number(
                    reduxValues.wizardVouchers.hundreds
                );
                //! TERMINA DE AGREGAR LOS VOUCHESRS
                initValues.expected.coinsTotal =
                    (Number(initValues.pennies) +
                        Number(initValues.nickels * 5) +
                        Number(initValues.dimes * 10) +
                        Number(initValues.quarters * 25)) /
                        100 +
                    (Number(initValues.penniesRoll * 50) +
                        Number(initValues.nickelsRoll * 5 * 40) +
                        Number(initValues.dimesRoll * 10 * 50) +
                        Number(initValues.quartersRoll * 25 * 40)) /
                        100;

                initValues.expected.billsTotal =
                    Number(initValues.ones) +
                    Number(initValues.twos * 2) +
                    Number(initValues.fives * 5) +
                    Number(initValues.tens * 10) +
                    Number(initValues.twenties * 20) +
                    Number(initValues.fifties * 50) +
                    Number(initValues.hundreds * 100);
                initValues.expected.grandTotal =
                    Number(initValues.expected.coinsTotal) +
                    Number(initValues.expected.billsTotal);
                /* initValues.real.coinsTotal = initValues.expected.coinsTotal;
                initValues.real.billsTotal = initValues.expected.billsTotal;
                initValues.real.grandTotal = initValues.expected.grandTotal; */
                // vouchers -- pantalla diferente, ya esta
                // pantalla readonly--sumar a safecash,drawerOut el cash out.drawein (500 del paso anterior(cajones no abiertos) + 500(cajones entregados en el corte) = 1000)
                // pantalla para modificar tus datos, pero te guarda la diferencia -- sumar a safeCash.drawerout el cash out.drawerout (9,000 + X ganancia obtenida al corte = 9000+X)
                // sacar el grand total
                setForm(initValues);
                dispatch(
                    wizardVoucher({
                        type: 'wizardTotalExpected',
                        initValues
                    })
                );
                setBlock(false);

                // sumar todos los valores y vaciarlos en los values
            } catch (err) {
                console.log(err);
                setError(err);
                setBlock(false);
            }
        })();
    }, []);

    handleStep(() => {
        const sendedValues = {...form, real: {}};

        sendedValues.real.billsTotal =
            Number(form.ones) +
            Number(form.twos * 2) +
            Number(form.fives * 5) +
            Number(form.tens * 10) +
            Number(form.twenties * 20) +
            Number(form.fifties * 50) +
            Number(form.hundreds * 100);
        sendedValues.real.coinsTotal =
            (Number(form.pennies) +
                Number(form.nickels * 5) +
                Number(form.dimes * 10) +
                Number(form.quarters * 25)) /
                100 +
            (Number(form.penniesRoll * 50) +
                Number(form.nickelsRoll * 5 * 40) +
                Number(form.dimesRoll * 10 * 50) +
                Number(form.quartersRoll * 25 * 40)) /
                100;
        sendedValues.real.grandTotal =
            Number(sendedValues.real.coinsTotal) +
            Number(sendedValues.real.billsTotal);
        dispatch(
            wizardVoucher({
                type: 'wizardSafeDrawerOut',
                total: sendedValues
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
                                    value={Number(form.hundreds)}
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
                                        value={form.expected.coinsTotal.toFixed(
                                            2
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
                                    <CurrencyFormat
                                        displayType="text"
                                        thousandSeparator
                                        prefix="$"
                                        className="form-control input-sm mr-3"
                                        style={{minWidth: '50px'}}
                                        value={form.expected.billsTotal.toFixed(
                                            2
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
                                    <CurrencyFormat
                                        displayType="text"
                                        thousandSeparator
                                        prefix="$"
                                        className="form-control input-sm mr-3"
                                        style={{minWidth: '50px'}}
                                        value={form.expected.grandTotal.toFixed(
                                            2
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

export default CaptureDrawerOut;
React.memo(CaptureDrawerOut);
