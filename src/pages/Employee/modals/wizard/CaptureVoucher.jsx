import {currencyFormat} from '@app/services/utils';
import React, {useState, useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import nextId from 'react-id-generator';
import {useWizard} from 'react-use-wizard';
import {useDispatch} from 'react-redux';
import {wizardVoucher} from '@app/store/reducers/safeCashDucks';

const CaptureVoucher = ({setSubtitle}) => {
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
        type: 'In'
    });
    const [vouchers, setVouchers] = useState([]);
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const {nextStep, handleStep} = useWizard();
    useEffect(() => {
        setSubtitle('Capture Vouchers');
    }, [setSubtitle]);
    handleStep(() => {
        console.log({
            type: 'wizardCashIns',
            cashIns: vouchers
        });
        let request = vouchers;
        request = request.map((voucher) => {
            const coinsTotalSummary =
                (Number(voucher.pennies) +
                    Number(voucher.nickels * 5) +
                    Number(voucher.dimes * 10) +
                    Number(voucher.quarters * 25)) /
                    100 +
                (Number(voucher.penniesRoll * 50) +
                    Number(voucher.nickelsRoll * 5 * 40) +
                    Number(voucher.dimesRoll * 10 * 50) +
                    Number(voucher.quartersRoll * 25 * 40)) /
                    100;
            const billsTotalSummary =
                Number(voucher.ones) +
                Number(voucher.twos * 2) +
                Number(voucher.fives * 5) +
                Number(voucher.tens * 10) +
                Number(voucher.twenties * 20) +
                Number(voucher.fifties * 50) +
                Number(voucher.hundreds * 100);

            const grandTotalSummary =
                Number(coinsTotalSummary) + Number(billsTotalSummary);
            return {
                ...voucher,
                coinsTotal: coinsTotalSummary,
                billsTotal: billsTotalSummary,
                grandTotal: grandTotalSummary
            };
        });
        //! vouchersin
        const vouchersIns = {};
        vouchersIns.arrays = request.filter((item) => item.type === 'In');

        vouchersIns.penniesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.pennies),
            0
        );
        vouchersIns.nickelsTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.nickels),
            0
        );
        vouchersIns.dimesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimes),
            0
        );
        vouchersIns.quartersTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.quarters),
            0
        );
        vouchersIns.penniesRollTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.penniesRoll),
            0
        );
        vouchersIns.nickelsRollTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.nickelsRoll),
            0
        );
        vouchersIns.dimesRollTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimesRoll),
            0
        );
        vouchersIns.quartersRollTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimesRoll),
            0
        );
        vouchersIns.onesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.ones),
            0
        );
        vouchersIns.twosTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.twos),
            0
        );
        vouchersIns.fivesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.fives),
            0
        );
        vouchersIns.tensTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.tens),
            0
        );
        vouchersIns.twentiesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.twenties),
            0
        );
        vouchersIns.fiftiesTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.fifties),
            0
        );
        vouchersIns.hundredsTotalTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.hundreds),
            0
        );
        vouchersIns.coinsTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.coinsTotal),
            0
        );
        vouchersIns.billsTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.billsTotal),
            0
        );
        vouchersIns.grandTotal = vouchersIns.arrays.reduce(
            (a, b) => Number(a) + Number(b.grandTotal),
            0
        );

        //! vouchersout
        const vouchersOuts = {};
        vouchersOuts.arrays = request.filter((item) => item.type === 'Out');

        vouchersOuts.penniesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.pennies),
            0
        );
        vouchersOuts.nickelsTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.nickels),
            0
        );
        vouchersOuts.dimesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimes),
            0
        );
        vouchersOuts.quartersTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.quarters),
            0
        );
        vouchersOuts.penniesRollTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.penniesRoll),
            0
        );
        vouchersOuts.nickelsRollTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.nickelsRoll),
            0
        );
        vouchersOuts.dimesRollTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimesRoll),
            0
        );
        vouchersOuts.quartersRollTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.dimesRoll),
            0
        );
        vouchersOuts.onesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.ones),
            0
        );
        vouchersOuts.twosTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.twos),
            0
        );
        vouchersOuts.fivesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.fives),
            0
        );
        vouchersOuts.tensTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.tens),
            0
        );
        vouchersOuts.twentiesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.twenties),
            0
        );
        vouchersOuts.fiftiesTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.fifties),
            0
        );
        vouchersOuts.hundredsTotalTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.hundreds),
            0
        );
        vouchersOuts.coinsTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.coinsTotal),
            0
        );
        vouchersOuts.billsTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.billsTotal),
            0
        );
        vouchersOuts.grandTotal = vouchersOuts.arrays.reduce(
            (a, b) => Number(a) + Number(b.grandTotal),
            0
        );

        //        otro
        //! Voucher drawertosafe
        const vouchersDrawerToSafe = {};
        vouchersDrawerToSafe.arrays = request.filter(
            (item) => item.type === 'DrawerToSafe'
        );

        vouchersDrawerToSafe.penniesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.pennies),
                0
            );
        vouchersDrawerToSafe.nickelsTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.nickels),
                0
            );
        vouchersDrawerToSafe.dimesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimes),
                0
            );
        vouchersDrawerToSafe.quartersTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.quarters),
                0
            );
        vouchersDrawerToSafe.penniesRollTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.penniesRoll),
                0
            );
        vouchersDrawerToSafe.nickelsRollTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.nickelsRoll),
                0
            );
        vouchersDrawerToSafe.dimesRollTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimesRoll),
                0
            );
        vouchersDrawerToSafe.quartersRollTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimesRoll),
                0
            );
        vouchersDrawerToSafe.onesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.ones),
                0
            );
        vouchersDrawerToSafe.twosTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.twos),
                0
            );
        vouchersDrawerToSafe.fivesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.fives),
                0
            );
        vouchersDrawerToSafe.tensTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.tens),
                0
            );
        vouchersDrawerToSafe.twentiesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.twenties),
                0
            );
        vouchersDrawerToSafe.fiftiesTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.fifties),
                0
            );
        vouchersDrawerToSafe.hundredsTotalTotal =
            vouchersDrawerToSafe.arrays.reduce(
                (a, b) => Number(a) + Number(b.hundreds),
                0
            );
        vouchersDrawerToSafe.coinsTotal = vouchersDrawerToSafe.arrays.reduce(
            (a, b) => Number(a) + Number(b.coinsTotal),
            0
        );
        vouchersDrawerToSafe.billsTotal = vouchersDrawerToSafe.arrays.reduce(
            (a, b) => Number(a) + Number(b.billsTotal),
            0
        );
        vouchersDrawerToSafe.grandTotal = vouchersDrawerToSafe.arrays.reduce(
            (a, b) => Number(a) + Number(b.grandTotal),
            0
        );

        //! SafeToDrawer
        const vouchersSafeToDrawer = {};
        vouchersSafeToDrawer.arrays = request.filter(
            (item) => item.type === 'SafeToDrawer'
        );

        vouchersSafeToDrawer.penniesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.pennies),
                0
            );
        vouchersSafeToDrawer.nickelsTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.nickels),
                0
            );
        vouchersSafeToDrawer.dimesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimes),
                0
            );
        vouchersSafeToDrawer.quartersTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.quarters),
                0
            );
        vouchersSafeToDrawer.penniesRollTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.penniesRoll),
                0
            );
        vouchersSafeToDrawer.nickelsRollTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.nickelsRoll),
                0
            );
        vouchersSafeToDrawer.dimesRollTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimesRoll),
                0
            );
        vouchersSafeToDrawer.quartersRollTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.dimesRoll),
                0
            );
        vouchersSafeToDrawer.onesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.ones),
                0
            );
        vouchersSafeToDrawer.twosTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.twos),
                0
            );
        vouchersSafeToDrawer.fivesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.fives),
                0
            );
        vouchersSafeToDrawer.tensTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.tens),
                0
            );
        vouchersSafeToDrawer.twentiesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.twenties),
                0
            );
        vouchersSafeToDrawer.fiftiesTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.fifties),
                0
            );
        vouchersSafeToDrawer.hundredsTotalTotal =
            vouchersSafeToDrawer.arrays.reduce(
                (a, b) => Number(a) + Number(b.hundreds),
                0
            );
        vouchersSafeToDrawer.coinsTotal = vouchersSafeToDrawer.arrays.reduce(
            (a, b) => Number(a) + Number(b.coinsTotal),
            0
        );
        vouchersSafeToDrawer.billsTotal = vouchersSafeToDrawer.arrays.reduce(
            (a, b) => Number(a) + Number(b.billsTotal),
            0
        );
        vouchersSafeToDrawer.grandTotal = vouchersSafeToDrawer.arrays.reduce(
            (a, b) => Number(a) + Number(b.grandTotal),
            0
        );

        const coinsTotalTotal =
            Number(vouchersIns.coinsTotal) +
            Number(vouchersDrawerToSafe.coinsTotal) -
            Number(vouchersOuts.coinsTotal) -
            Number(vouchersSafeToDrawer.coinsTotal);
        const billsTotalTotal =
            Number(vouchersIns.billsTotal) +
            Number(vouchersDrawerToSafe.billsTotal) -
            Number(vouchersOuts.billsTotal) -
            Number(vouchersSafeToDrawer.billsTotal);
        const grandTotalTotal =
            Number(vouchersIns.grandTotal) +
            Number(vouchersDrawerToSafe.grandTotal) -
            Number(vouchersOuts.grandTotal) -
            Number(vouchersSafeToDrawer.grandTotal);

        dispatch(
            wizardVoucher({
                type: 'wizardVouchers',
                vouchers: {
                    pennies:
                        Number(vouchersIns.penniesTotalTotal) +
                        Number(vouchersDrawerToSafe.penniesTotalTotal) -
                        Number(vouchersOuts.penniesTotalTotal) -
                        Number(vouchersSafeToDrawer.penniesTotalTotal),
                    nickels:
                        Number(vouchersIns.nickelsTotalTotal) +
                        Number(vouchersDrawerToSafe.nickelsTotalTotal) -
                        Number(vouchersOuts.nickelsTotalTotal) -
                        Number(vouchersSafeToDrawer.nickelsTotalTotal),
                    dimes:
                        Number(vouchersIns.dimesTotalTotal) +
                        Number(vouchersDrawerToSafe.dimesTotalTotal) -
                        Number(vouchersOuts.dimesTotalTotal) -
                        Number(vouchersSafeToDrawer.dimesTotalTotal),
                    quarters:
                        Number(vouchersIns.quartersTotalTotal) +
                        Number(vouchersDrawerToSafe.quartersTotalTotal) -
                        Number(vouchersOuts.quartersTotalTotal) -
                        Number(vouchersSafeToDrawer.quartersTotalTotal),
                    penniesRoll:
                        Number(vouchersIns.penniesRollTotalTotal) +
                        Number(vouchersDrawerToSafe.penniesRollTotalTotal) -
                        Number(vouchersOuts.penniesRollTotalTotal) -
                        Number(vouchersSafeToDrawer.penniesRollTotalTotal),
                    nickelsRoll:
                        Number(vouchersIns.nickelsRollTotalTotal) +
                        Number(vouchersDrawerToSafe.nickelsRollTotalTotal) -
                        Number(vouchersOuts.nickelsRollTotalTotal) -
                        Number(vouchersSafeToDrawer.nickelsRollTotalTotal),
                    dimesRoll:
                        Number(vouchersIns.dimesRollTotalTotal) +
                        Number(vouchersDrawerToSafe.dimesRollTotalTotal) -
                        Number(vouchersOuts.dimesRollTotalTotal) -
                        Number(vouchersSafeToDrawer.dimesRollTotalTotal),
                    quartersRoll:
                        Number(vouchersIns.quartersRollTotalTotal) +
                        Number(vouchersDrawerToSafe.quartersRollTotalTotal) -
                        Number(vouchersOuts.quartersRollTotalTotal) -
                        Number(vouchersSafeToDrawer.quartersRollTotalTotal),
                    ones:
                        Number(vouchersIns.onesTotalTotal) +
                        Number(vouchersDrawerToSafe.onesTotalTotal) -
                        Number(vouchersOuts.onesTotalTotal) -
                        Number(vouchersSafeToDrawer.onesTotalTotal),
                    twos:
                        Number(vouchersIns.twosTotalTotal) +
                        Number(vouchersDrawerToSafe.twosTotalTotal) -
                        Number(vouchersOuts.twosTotalTotal) -
                        Number(vouchersSafeToDrawer.twosTotalTotal),
                    fives:
                        Number(vouchersIns.fivesTotalTotal) +
                        Number(vouchersDrawerToSafe.fivesTotalTotal) -
                        Number(vouchersOuts.fivesTotalTotal) -
                        Number(vouchersSafeToDrawer.fivesTotalTotal),
                    tens:
                        Number(vouchersIns.tensTotalTotal) +
                        Number(vouchersDrawerToSafe.tensTotalTotal) -
                        Number(vouchersOuts.tensTotalTotal) -
                        Number(vouchersSafeToDrawer.tensTotalTotal),
                    twenties:
                        Number(vouchersIns.twentiesTotalTotal) +
                        Number(vouchersDrawerToSafe.twentiesTotalTotal) -
                        Number(vouchersOuts.twentiesTotalTotal) -
                        Number(vouchersSafeToDrawer.twentiesTotalTotal),
                    fifties:
                        Number(vouchersIns.fiftiesTotalTotal) +
                        Number(vouchersDrawerToSafe.fiftiesTotalTotal) -
                        Number(vouchersOuts.fiftiesTotalTotal) -
                        Number(vouchersSafeToDrawer.fiftiesTotalTotal),
                    hundreds:
                        Number(vouchersIns.hundredsTotalTotal) +
                        Number(vouchersDrawerToSafe.hundredsTotalTotal) -
                        Number(vouchersOuts.hundredsTotalTotal) -
                        Number(vouchersSafeToDrawer.hundredsTotalTotal),
                    coinsTotal: coinsTotalTotal,
                    billsTotal: billsTotalTotal,
                    grandTotal: grandTotalTotal,
                    vouchersIns,
                    vouchersOuts,
                    vouchersDrawerToSafe,
                    vouchersSafeToDrawer
                }
            })
        );
    });
    const addVoucher = async () => {
        try {
            console.log(form);
            const formulario = form;
            formulario.id = nextId();
            formulario.total =
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
                    Number(form.quartersRoll * 25 * 40)) /
                    100;
            setVouchers((old) => [...old, formulario]);
            setForm({
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
                type: 'In'
            });
        } catch (err) {
            console.log(err);
        }
    };
    const removeVoucher = (id) => {
        console.log(id);
        setVouchers(vouchers.filter((voucher) => voucher.id !== id));
    };
    const getTotalVouchers = (vouchersTotal) => {
        console.log(vouchersTotal);
        let total = 0;
        vouchersTotal.forEach((voucher) => {
            if (voucher.type === 'In' || voucher.type === 'DrawerToSafe') {
                total += Number(voucher.total);
            } else {
                total -= Number(voucher.total);
            }
        });
        return total;
    };
    return (
        <>
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <div className="d-flex align-items-center">
                        <span
                            className="input-group-text"
                            style={{minWidth: '50px'}}
                        >
                            Type
                        </span>
                        <select
                            className="form-control"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    type: e.target.value
                                })
                            }
                            value={form.type}
                        >
                            <option>In</option>
                            <option>Out</option>
                            <option value="DrawerToSafe">
                                Move Money From Drawer To Safe Cash
                            </option>
                            <option value="SafeToDrawer">
                                Move Money From Safe Cash To Drawer
                            </option>
                        </select>
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

                    <div className="d-flex flex-wrap justify-content-around">
                        <table className="table table-light text-center">
                            <thead>
                                <tr>
                                    <th>Total</th>
                                    <th>Type</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map((voucher) => (
                                    <tr key={voucher.id}>
                                        <td>{currencyFormat(voucher.total)}</td>
                                        <td>{voucher.type}</td>
                                        <td>
                                            {' '}
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    removeVoucher(voucher.id)
                                                }
                                            >
                                                <i className="fas fa-trash-alt text-danger " />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>{}</th>
                                    <th>Total:</th>
                                    <th>
                                        {currencyFormat(
                                            getTotalVouchers(vouchers)
                                        )}
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <p className="text-danger"> {error || null}</p>
                <div>
                    <input
                        type="submit"
                        className="btn btn-dark btn-lg"
                        value="Add Voucher"
                        onClick={() => addVoucher()}
                    />
                </div>
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
        </>
    );
};

export default CaptureVoucher;
React.memo(CaptureVoucher);
