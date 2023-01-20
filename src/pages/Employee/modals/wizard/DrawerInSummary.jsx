/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import {useWizard} from 'react-use-wizard';
import BlockUi from 'react-block-ui';
import {useDispatch, useSelector} from 'react-redux';
import {
    getLastSafeCash,
    getCashOutByDate,
    getCashInByDate
} from '@app/services/index';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';
import {getToday} from '@app/services/utils';

const DrawerInSummary = ({setSubtitle}) => {
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
        comentaries: ''
    });
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const [block, setBlock] = useState(false);
    const [dateState, setDateState] = useState(getToday());
    const {nextStep, handleStep} = useWizard();
    const reduxValues = useSelector((state) => state.safeCash);
    useState(() => {
        setSubtitle('Drawer In Review');
    }, [setSubtitle]);

    const initialFunction = async () => {
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
                comentaries: ''
            };
            // obtener el monto anterior de safeCash--drawer In,drawer Out= (1,000 + 9,000 = 10,000)
            const lastSafeCash = await getLastSafeCash(dateState);

            if (lastSafeCash) {
                dispatch(
                    wizardVoucher({
                        type: 'wizardSafeStart',
                        total: lastSafeCash
                    })
                );
                initValues.pennies += Number(
                    lastSafeCash.realAmount.drawerIn.pennies
                );
                initValues.nickels += Number(
                    lastSafeCash.realAmount.drawerIn.nickels
                );
                initValues.dimes += Number(
                    lastSafeCash.realAmount.drawerIn.dimes
                );
                initValues.quarters += Number(
                    lastSafeCash.realAmount.drawerIn.quarters
                );
                initValues.penniesRoll += Number(
                    lastSafeCash.realAmount.drawerIn.penniesRoll
                );
                initValues.nickelsRoll += Number(
                    lastSafeCash.realAmount.drawerIn.nickelsRoll
                );
                initValues.dimesRoll += Number(
                    lastSafeCash.realAmount.drawerIn.dimesRoll
                );
                initValues.quartersRoll += Number(
                    lastSafeCash.realAmount.drawerIn.quartersRoll
                );
                initValues.ones += Number(
                    lastSafeCash.realAmount.drawerIn.ones
                );
                initValues.twos += Number(
                    lastSafeCash.realAmount.drawerIn.twos
                );
                initValues.fives += Number(
                    lastSafeCash.realAmount.drawerIn.fives
                );
                initValues.tens += Number(
                    lastSafeCash.realAmount.drawerIn.tens
                );
                initValues.twenties += Number(
                    lastSafeCash.realAmount.drawerIn.twenties
                );
                initValues.fifties += Number(
                    lastSafeCash.realAmount.drawerIn.fifties
                );
                initValues.hundreds += Number(
                    lastSafeCash.realAmount.drawerIn.hundreds
                );
            } else {
                dispatch(
                    wizardVoucher({
                        type: 'wizardSafeStart',
                        total: {
                            realAmount: {
                                drawerIn: {
                                    ones: 0,
                                    tens: 0,
                                    twos: 0,
                                    dimes: 0,
                                    fives: 0,
                                    fifties: 1,
                                    nickels: 0,
                                    pennies: 0,
                                    hundreds: 0,
                                    uarters: 0,
                                    twenties: 0,
                                    dimesRoll: 0,
                                    billsTotal: 0,
                                    coinsTotal: 0,
                                    grandTotal: 0,
                                    nickelsRoll: 0,
                                    penniesRoll: 0,
                                    quartersRoll: 0
                                },
                                drawerOut: {
                                    ones: 0,
                                    tens: 0,
                                    twos: 0,
                                    dimes: 0,
                                    fives: 0,
                                    fifties: 1,
                                    nickels: 0,
                                    pennies: 0,
                                    hundreds: 0,
                                    uarters: 0,
                                    twenties: 0,
                                    dimesRoll: 0,
                                    billsTotal: 0,
                                    coinsTotal: 0,
                                    grandTotal: 0,
                                    nickelsRoll: 0,
                                    penniesRoll: 0,
                                    quartersRoll: 0
                                }
                            }
                        }
                    })
                );
            }
            // restar a safecash.drawer in el cash in (1,000 - 500 = 500) con 5 cajas abiertas de 100 dolares c/u

            //! INCREMENTAR LOS VOUCHERS SAFETODRAWER
            initValues.pennies += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .penniesTotalTotal
            );
            initValues.nickels += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .nickelsTotalTotal
            );
            initValues.dimes += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer.dimesTotalTotal
            );
            initValues.quarters += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .quartersTotalTotal
            );
            initValues.penniesRoll += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .penniesRollTotalTotal
            );
            initValues.nickelsRoll += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .nickelsRollTotalTotal
            );
            initValues.dimesRoll += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .dimesRollTotalTotal
            );
            initValues.quartersRoll += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .quartersRollTotalTotal
            );
            initValues.ones += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer.onesTotalTotal
            );
            initValues.twos += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer.twosTotalTotal
            );
            initValues.fives += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer.fivesTotalTotal
            );
            initValues.tens += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer.tensTotalTotal
            );
            initValues.twenties += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .twentiesTotalTotal
            );
            initValues.fifties += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .fiftiesTotalTotal
            );
            initValues.hundreds += Number(
                reduxValues.wizardVouchers.vouchersSafeToDrawer
                    .hundredsTotalTotal
            );

            //! Decrementar LOS VOUCHERS DRAWERTOSAFE
            initValues.pennies -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .penniesTotalTotal
            );
            initValues.nickels -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .nickelsTotalTotal
            );
            initValues.dimes -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe.dimesTotalTotal
            );
            initValues.quarters -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .quartersTotalTotal
            );
            initValues.penniesRoll -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .penniesRollTotalTotal
            );
            initValues.nickelsRoll -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .nickelsRollTotalTotal
            );
            initValues.dimesRoll -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .dimesRollTotalTotal
            );
            initValues.quartersRoll -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .quartersRollTotalTotal
            );
            initValues.ones -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe.onesTotalTotal
            );
            initValues.twos -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe.twosTotalTotal
            );
            initValues.fives -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe.fivesTotalTotal
            );
            initValues.tens -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe.tensTotalTotal
            );
            initValues.twenties -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .twentiesTotalTotal
            );
            initValues.fifties -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .fiftiesTotalTotal
            );
            initValues.hundreds -= Number(
                reduxValues.wizardVouchers.vouchersDrawerToSafe
                    .hundredsTotalTotal
            );

            const cashInByManagerAndDate = await getCashInByDate(dateState);

            const totalCashIn = {
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
                coinsTotal: 0,
                billsTotal: 0,
                grandTotal: 0
            };
            cashInByManagerAndDate.forEach((item) => {
                totalCashIn.pennies += Number(item.pennies);
                totalCashIn.nickels += Number(item.nickels);
                totalCashIn.dimes += Number(item.dimes);
                totalCashIn.quarters += Number(item.quarters);
                totalCashIn.penniesRoll += Number(item.penniesRoll);
                totalCashIn.nickelsRoll += Number(item.nickelsRoll);
                totalCashIn.dimesRoll += Number(item.dimesRoll);
                totalCashIn.quartersRoll += Number(item.quartersRoll);
                totalCashIn.ones += Number(item.ones);
                totalCashIn.twos += Number(item.twos);
                totalCashIn.fives += Number(item.fives);
                totalCashIn.tens += Number(item.tens);
                totalCashIn.twenties += Number(item.twenties);
                totalCashIn.fifties += Number(item.fifties);
                totalCashIn.hundreds += Number(item.hundreads);
            });
            totalCashIn.coinsTotal =
                (Number(totalCashIn.pennies) +
                    Number(totalCashIn.nickels * 5) +
                    Number(totalCashIn.dimes * 10) +
                    Number(totalCashIn.quarters * 25)) /
                    100 +
                (Number(totalCashIn.penniesRoll * 50) +
                    Number(totalCashIn.nickelsRoll * 5 * 40) +
                    Number(totalCashIn.dimesRoll * 10 * 50) +
                    Number(totalCashIn.quartersRoll * 25 * 40)) /
                    100;
            totalCashIn.billsTotal =
                Number(totalCashIn.ones) +
                Number(totalCashIn.twos * 2) +
                Number(totalCashIn.fives * 5) +
                Number(totalCashIn.tens * 10) +
                Number(totalCashIn.twenties * 20) +
                Number(totalCashIn.fifties * 50) +
                Number(totalCashIn.hundreds * 100);
            totalCashIn.grandTotal =
                Number(totalCashIn.coinsTotal) + Number(totalCashIn.billsTotal);
            totalCashIn.cashInArray = cashInByManagerAndDate;
            dispatch(
                wizardVoucher({
                    type: 'wizardCashIns',
                    cashIns: totalCashIn
                })
            );
            initValues.pennies -= Number(totalCashIn.pennies);
            initValues.nickels -= Number(totalCashIn.nickels);
            initValues.dimes -= Number(totalCashIn.dimes);
            initValues.quarters -= Number(totalCashIn.quarters);
            initValues.penniesRoll -= Number(totalCashIn.penniesRoll);
            initValues.nickelsRoll -= Number(totalCashIn.nickelsRoll);
            initValues.dimesRoll -= Number(totalCashIn.dimesRoll);
            initValues.quartersRoll -= Number(totalCashIn.quartersRoll);
            initValues.ones -= Number(totalCashIn.ones);
            initValues.twos -= Number(totalCashIn.twos);
            initValues.fives -= Number(totalCashIn.fives);
            initValues.tens -= Number(totalCashIn.tens);
            initValues.twenties -= Number(totalCashIn.twenties);
            initValues.fifties -= Number(totalCashIn.fifties);
            initValues.hundreds -= Number(totalCashIn.hundreds);

            const totalCashOut = {
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
                coinsTotal: 0,
                billsTotal: 0,
                grandTotal: 0,
                drawerIn: {
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
                    hundreds: 0
                },
                drawerOut: {
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
                    hundreds: 0
                }
            };
            const cashOutByManagerAndDate = await getCashOutByDate(dateState);
            cashOutByManagerAndDate.forEach((item) => {
                // DRAWER IN
                totalCashOut.drawerIn.pennies += Number(
                    item.totalJson.drawerIn.pennies
                );
                totalCashOut.drawerIn.nickels += Number(
                    item.totalJson.drawerIn.nickels
                );
                totalCashOut.drawerIn.dimes += Number(
                    item.totalJson.drawerIn.dimes
                );
                totalCashOut.drawerIn.quarters += Number(
                    item.totalJson.drawerIn.quarters
                );
                totalCashOut.drawerIn.penniesRoll += Number(
                    item.totalJson.drawerIn.penniesRoll
                );
                totalCashOut.drawerIn.nickelsRoll += Number(
                    item.totalJson.drawerIn.nickelsRoll
                );
                totalCashOut.drawerIn.dimesRoll += Number(
                    item.totalJson.drawerIn.dimesRoll
                );
                totalCashOut.drawerIn.quartersRoll += Number(
                    item.totalJson.drawerIn.quartersRoll
                );
                totalCashOut.drawerIn.ones += Number(
                    item.totalJson.drawerIn.ones
                );
                totalCashOut.drawerIn.twos += Number(
                    item.totalJson.drawerIn.twos
                );
                totalCashOut.drawerIn.fives += Number(
                    item.totalJson.drawerIn.fives
                );
                totalCashOut.drawerIn.tens += Number(
                    item.totalJson.drawerIn.tens
                );
                totalCashOut.drawerIn.twenties += Number(
                    item.totalJson.drawerIn.twenties
                );
                totalCashOut.drawerIn.fifties += Number(
                    item.totalJson.drawerIn.fifties
                );
                totalCashOut.drawerIn.hundreds += Number(
                    item.totalJson.drawerIn.hundreds
                );
                // DRAWER OUT
                totalCashOut.drawerOut.pennies += Number(
                    item.totalJson.drawerOut.pennies
                );
                totalCashOut.drawerOut.nickels += Number(
                    item.totalJson.drawerOut.nickels
                );
                totalCashOut.drawerOut.dimes += Number(
                    item.totalJson.drawerOut.dimes
                );
                totalCashOut.drawerOut.quarters += Number(
                    item.totalJson.drawerOut.quarters
                );
                totalCashOut.drawerOut.penniesRoll += Number(
                    item.totalJson.drawerOut.penniesRoll
                );
                totalCashOut.drawerOut.nickelsRoll += Number(
                    item.totalJson.drawerOut.nickelsRoll
                );
                totalCashOut.drawerOut.dimesRoll += Number(
                    item.totalJson.drawerOut.dimesRoll
                );
                totalCashOut.drawerOut.quartersRoll += Number(
                    item.totalJson.drawerOut.quartersRoll
                );
                totalCashOut.drawerOut.ones += Number(
                    item.totalJson.drawerOut.ones
                );
                totalCashOut.drawerOut.twos += Number(
                    item.totalJson.drawerOut.twos
                );
                totalCashOut.drawerOut.fives += Number(
                    item.totalJson.drawerOut.fives
                );
                totalCashOut.drawerOut.tens += Number(
                    item.totalJson.drawerOut.tens
                );
                totalCashOut.drawerOut.twenties += Number(
                    item.totalJson.drawerOut.twenties
                );
                totalCashOut.drawerOut.fifties += Number(
                    item.totalJson.drawerOut.fifties
                );
                totalCashOut.drawerOut.hundreds += Number(
                    item.totalJson.drawerOut.hundreds
                );
            });

            // drawer in total cash out
            totalCashOut.drawerIn.coinsTotal =
                (Number(totalCashOut.drawerIn.pennies) +
                    Number(totalCashOut.drawerIn.nickels * 5) +
                    Number(totalCashOut.drawerIn.dimes * 10) +
                    Number(totalCashOut.drawerIn.quarters * 25)) /
                    100 +
                (Number(totalCashOut.drawerIn.penniesRoll * 50) +
                    Number(totalCashOut.drawerIn.nickelsRoll * 5 * 40) +
                    Number(totalCashOut.drawerIn.dimesRoll * 10 * 50) +
                    Number(totalCashOut.drawerIn.quartersRoll * 25 * 40)) /
                    100;
            totalCashOut.drawerIn.billsTotal =
                Number(totalCashOut.drawerIn.ones) +
                Number(totalCashOut.drawerIn.twos * 2) +
                Number(totalCashOut.drawerIn.fives * 5) +
                Number(totalCashOut.drawerIn.tens * 10) +
                Number(totalCashOut.drawerIn.twenties * 20) +
                Number(totalCashOut.drawerIn.fifties * 50) +
                Number(totalCashOut.drawerIn.hundreds * 100);

            totalCashOut.drawerIn.grandTotal =
                Number(totalCashOut.drawerIn.coinsTotal) +
                Number(totalCashOut.drawerIn.billsTotal);
            // drawer out total cash out
            totalCashOut.drawerOut.coinsTotal =
                (Number(totalCashOut.drawerOut.pennies) +
                    Number(totalCashOut.drawerOut.nickels * 5) +
                    Number(totalCashOut.drawerOut.dimes * 10) +
                    Number(totalCashOut.drawerOut.quarters * 25)) /
                    100 +
                (Number(totalCashOut.drawerOut.penniesRoll * 50) +
                    Number(totalCashOut.drawerOut.nickelsRoll * 5 * 40) +
                    Number(totalCashOut.drawerOut.dimesRoll * 10 * 50) +
                    Number(totalCashOut.drawerOut.quartersRoll * 25 * 40)) /
                    100;
            totalCashOut.drawerOut.billsTotal =
                Number(totalCashOut.drawerOut.ones) +
                Number(totalCashOut.drawerOut.twos * 2) +
                Number(totalCashOut.drawerOut.fives * 5) +
                Number(totalCashOut.drawerOut.tens * 10) +
                Number(totalCashOut.drawerOut.twenties * 20) +
                Number(totalCashOut.drawerOut.fifties * 50) +
                Number(totalCashOut.drawerOut.hundreds * 100);

            totalCashOut.drawerOut.grandTotal =
                Number(totalCashOut.drawerOut.coinsTotal) +
                Number(totalCashOut.drawerOut.billsTotal);
            // termina drawer out
            totalCashOut.cashOutArray = cashOutByManagerAndDate;
            console.log(totalCashOut);
            dispatch(
                wizardVoucher({
                    type: 'wizardCashOuts',
                    cashOuts: totalCashOut
                })
            );
            initValues.pennies += Number(totalCashOut.drawerIn.pennies);
            initValues.nickels += Number(totalCashOut.drawerIn.nickels);
            initValues.dimes += Number(totalCashOut.drawerIn.dimes);
            initValues.quarters += Number(totalCashOut.drawerIn.quarters);
            initValues.penniesRoll += Number(totalCashOut.drawerIn.penniesRoll);
            initValues.nickelsRoll += Number(totalCashOut.drawerIn.nickelsRoll);
            initValues.dimesRoll += Number(totalCashOut.drawerIn.dimesRoll);
            initValues.quartersRoll += Number(
                totalCashOut.drawerIn.quartersRoll
            );
            initValues.ones += Number(totalCashOut.drawerIn.ones);
            initValues.twos += Number(totalCashOut.drawerIn.twos);
            initValues.fives += Number(totalCashOut.drawerIn.fives);
            initValues.tens += Number(totalCashOut.drawerIn.tens);
            initValues.twenties += Number(totalCashOut.drawerIn.twenties);
            initValues.fifties += Number(totalCashOut.drawerIn.fifties);
            initValues.hundreds += Number(totalCashOut.drawerIn.hundreds);
            console.log('aquyiiii');

            initValues.billsTotal =
                Number(initValues.ones) +
                Number(initValues.twos * 2) +
                Number(initValues.fives * 5) +
                Number(initValues.tens * 10) +
                Number(initValues.twenties * 20) +
                Number(initValues.fifties * 50) +
                Number(initValues.hundreds * 100);

            initValues.coinsTotal =
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

            initValues.grandTotal =
                Number(initValues.coinsTotal) + Number(initValues.billsTotal);

            // vouchers -- pantalla diferente, ya esta
            // pantalla readonly--sumar a safecash,drawerin el cash out.drawein (500 del paso anterior(cajones no abiertos) + 500(cajones entregados en el corte) = 1000)
            // pantalla para modificar tus datos, pero te guarda la diferencia -- sumar a safeCash.drawerout el cash out.drawerout (9,000 + X ganancia obtenida al corte = 9000+X)
            // sacar el grand total
            setForm(initValues);
            dispatch(
                wizardVoucher({
                    type: 'wizardDate',
                    date: dateState
                })
            );
            console.log('hi', dateState);
            setBlock(false);

            // sumar todos los valores y vaciarlos en los values
        } catch (err) {
            console.log(err);
            setError(err);
            setBlock(false);
        }
    };
    useEffect(() => {
        initialFunction();
    }, [dateState]);

    handleStep(() => {
        dispatch(
            wizardVoucher({
                type: 'wizardSafeDrawerIn',
                total: form
            })
        );
    });

    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <div className="card-body">
                    <div className="d-flex justify-content-end">
                        <div>
                            Date:{' '}
                            <input
                                type="date"
                                className="form-control mr-3"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        date: e.target.value
                                    });
                                    setDateState(e.target.value);
                                    console.log(e.target.value);
                                }}
                                defaultValue={getToday()}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            pennies: e.target.value
                                        })
                                    }
                                    value={Number(form.pennies)}
                                    className="form-control"
                                    disabled
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nickels: e.target.value
                                        })
                                    }
                                    value={Number(form.nickels)}
                                    disabled
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dimes: e.target.value
                                        })
                                    }
                                    value={Number(form.dimes)}
                                    disabled
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quarters: e.target.value
                                        })
                                    }
                                    value={Number(form.quarters)}
                                    disabled
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            ones: e.target.value
                                        })
                                    }
                                    value={Number(form.ones)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            twos: e.target.value
                                        })
                                    }
                                    value={Number(form.twos)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            fives: e.target.value
                                        })
                                    }
                                    value={Number(form.fives)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tens: e.target.value
                                        })
                                    }
                                    value={Number(form.tens)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            twenties: e.target.value
                                        })
                                    }
                                    value={Number(form.twenties)}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hundreds: e.target.value
                                        })
                                    }
                                    value={Number(form.hundreds)}
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
                                        value={Number(form.coinsTotal).toFixed(
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
                                        value={Number(form.billsTotal).toFixed(
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
                                        value={Number(form.grandTotal).toFixed(
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

export default DrawerInSummary;
React.memo(DrawerInSummary);
