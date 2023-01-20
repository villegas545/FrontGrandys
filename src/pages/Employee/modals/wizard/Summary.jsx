/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {saveCashSafe} from '@app/services/';
import {getSafeCashAction} from '@app/store/reducers/safeCashDucks';
import BlockUi from 'react-block-ui';
import {toast} from 'react-toastify';
import {currencyFormat} from '@app/services/utils';
// import {currencyFormat} from '@app/services/utils/';

const Summary = ({onHide, setSubtitle}) => {
    const reduxValues = useSelector((state) => state.safeCash);
    const [block, setBlock] = useState(false);
    const dispatch = useDispatch();
    useState(() => {
        setSubtitle('Summary');
    }, [setSubtitle]);

    const getCoinsTotal = (data) => {
        return (
            (Number(data.pennies) +
                Number(data.nickels * 5) +
                Number(data.dimes * 10) +
                Number(data.quarters * 25)) /
                100 +
            (Number(data.penniesRoll * 50) +
                Number(data.nickelsRoll * 5 * 40) +
                Number(data.dimesRoll * 10 * 50) +
                Number(data.quartersRoll * 25 * 40)) /
                100
        );
    };
    const getBillsTotal = (data) => {
        return (
            Number(data.ones) +
            Number(data.twos * 2) +
            Number(data.fives * 5) +
            Number(data.tens * 10) +
            Number(data.twenties * 20) +
            Number(data.fifties * 50) +
            Number(data.hundreads * 100)
        );
    };
    const getBillsTotalHundreads = (data) => {
        return (
            Number(data.ones) +
            Number(data.twos * 2) +
            Number(data.fives * 5) +
            Number(data.tens * 10) +
            Number(data.twenties * 20) +
            Number(data.fifties * 50) +
            Number(data.hundreds * 100)
        );
    };

    const getCoinsTotalArray = (data) => {
        let total = 0;
        data.forEach((row) => {
            total +=
                (Number(row.pennies) +
                    Number(row.nickels * 5) +
                    Number(row.dimes * 10) +
                    Number(row.quarters * 25)) /
                    100 +
                (Number(row.penniesRoll * 50) +
                    Number(row.nickelsRoll * 5 * 40) +
                    Number(row.dimesRoll * 10 * 50) +
                    Number(row.quartersRoll * 25 * 40)) /
                    100;
        });
        return total;
    };
    const getBillsTotalArray = (data) => {
        let total = 0;
        data.forEach((row) => {
            total +=
                Number(row.ones) +
                Number(row.twos * 2) +
                Number(row.fives * 5) +
                Number(row.tens * 10) +
                Number(row.twenties * 20) +
                Number(row.fifties * 50) +
                Number(row.hundreads * 100);
        });
        return total;
    };
    const getBillsTotalArrayCashOut = (data) => {
        let total = 0;
        data.forEach((row) => {
            total +=
                Number(row.ones) +
                Number(row.twos * 2) +
                Number(row.fives * 5) +
                Number(row.tens * 10) +
                Number(row.twenties * 20) +
                Number(row.fifties * 50) +
                Number(row.hundreds * 100);
        });
        return total;
    };

    const getBillsVoucher = (data) => {
        let totalIn = 0;
        let totalOut = 0;
        data.forEach((row) => {
            if (row.type === 'In') {
                totalIn +=
                    Number(row.ones) +
                    Number(row.twos * 2) +
                    Number(row.fives * 5) +
                    Number(row.tens * 10) +
                    Number(row.twenties * 20) +
                    Number(row.fifties * 50) +
                    Number(row.hundreads * 100);
            } else {
                totalOut -=
                    Number(row.ones) +
                    Number(row.twos * 2) +
                    Number(row.fives * 5) +
                    Number(row.tens * 10) +
                    Number(row.twenties * 20) +
                    Number(row.fifties * 50) +
                    Number(row.hundreads * 100);
            }
        });
        return {totalIn, totalOut};
    };

    const getCoinsVoucher = (data) => {
        let totalIn = 0;
        let totalOut = 0;
        data.forEach((row) => {
            if (row.type === 'In') {
                totalIn +=
                    (Number(row.pennies) +
                        Number(row.nickels * 5) +
                        Number(row.dimes * 10) +
                        Number(row.quarters * 25) +
                        Number(row.penniesRoll) * 50 +
                        Number(row.nickelsRoll * 5 * 40) +
                        Number(row.dimesRoll * 10 * 50) +
                        Number(row.quartersRoll * 25 * 40)) /
                    100;
            } else {
                totalOut -=
                    (Number(row.pennies) +
                        Number(row.nickels * 5) +
                        Number(row.dimes * 10) +
                        Number(row.quarters * 25) +
                        Number(row.penniesRoll) * 50 +
                        Number(row.nickelsRoll * 5 * 40) +
                        Number(row.dimesRoll * 10 * 50) +
                        Number(row.quartersRoll * 25 * 40)) /
                    100;
            }
        });
        return {totalIn, totalOut};
    };
    const onSubmit = async () => {
        try {
            const hoy = new Date();
            setBlock(true);
            await saveCashSafe({
                date: reduxValues.wizardDate,
                cashIn:
                    getCoinsTotalArray(reduxValues.wizardCashIns) +
                    getBillsTotalArray(reduxValues.wizardCashIns),
                cashOut:
                    getCoinsTotalArray(reduxValues.wizardCashOuts) +
                    getBillsTotalArrayCashOut(reduxValues.wizardCashOuts),
                vouchersIn:
                    getCoinsVoucher(reduxValues.wizardVouchers).totalIn +
                    getBillsVoucher(reduxValues.wizardVouchers).totalIn,
                vouchersOut:
                    getCoinsVoucher(reduxValues.wizardVouchers).totalOut +
                    getBillsVoucher(reduxValues.wizardVouchers).totalOut,
                initSafe:
                    getCoinsTotal(reduxValues.wizardSafeStart) +
                    getBillsTotalHundreads(reduxValues.wizardSafeStart),
                expectedAmount:
                    getCoinsTotal(reduxValues.wizardTotalExpected) +
                    getBillsTotal(reduxValues.wizardTotalExpected),
                realAmount:
                    getCoinsTotal(reduxValues.wizardTotalReal) +
                    getBillsTotal(reduxValues.wizardTotalReal),
                // created va en el back
                createdHour: `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`,
                createdCommentaries: reduxValues.wizardTotalReal.comentaries,
                // idRestaurant va en el back
                // status va en el back
                vouchers: reduxValues.wizardVouchers,
                pennies: reduxValues.wizardTotalReal.pennies,
                nickels: reduxValues.wizardTotalReal.nickels,
                dimes: reduxValues.wizardTotalReal.dimes,
                quarters: reduxValues.wizardTotalReal.quarters,
                penniesRoll: reduxValues.wizardTotalReal.penniesRoll,
                nickelsRoll: reduxValues.wizardTotalReal.nickelsRoll,
                dimesRoll: reduxValues.wizardTotalReal.dimesRoll,
                quartersRoll: reduxValues.wizardTotalReal.quartersRoll,
                ones: reduxValues.wizardTotalReal.ones,
                twos: reduxValues.wizardTotalReal.twos,
                fives: reduxValues.wizardTotalReal.fives,
                tens: reduxValues.wizardTotalReal.tens,
                twenties: reduxValues.wizardTotalReal.twenties,
                fifties: reduxValues.wizardTotalReal.fifties,
                hundreds: reduxValues.wizardTotalReal.hundreads
            });
            toast.success('Success!');
            dispatch(getSafeCashAction('reload'));
            onHide();
        } catch (error) {
            console.log(error);
        }
        setBlock(false);
    };
    useEffect(() => {
        console.log(reduxValues);
    }, [reduxValues]);

    const expectedDrawerBackCoins =
        Number(reduxValues.wizardSafeStart.realAmount.drawerIn.coinsTotal) -
        Number(reduxValues.wizardCashIns.coinsTotal) +
        Number(reduxValues.wizardCashOuts.drawerIn.coinsTotal) +
        Number(reduxValues.wizardVouchers.vouchersSafeToDrawer.coinsTotal) -
        Number(reduxValues.wizardVouchers.vouchersDrawerToSafe.coinsTotal);

    const expectedDrawerBackBills =
        Number(reduxValues.wizardSafeStart.realAmount.drawerIn.billsTotal) -
        Number(reduxValues.wizardCashIns.billsTotal) +
        Number(reduxValues.wizardCashOuts.drawerIn.billsTotal) +
        Number(reduxValues.wizardVouchers.vouchersSafeToDrawer.billsTotal) -
        Number(reduxValues.wizardVouchers.vouchersDrawerToSafe.billsTotal);

    const expectedDrawerBackGrandTotal =
        Number(reduxValues.wizardSafeStart.realAmount.drawerIn.grandTotal) -
        Number(reduxValues.wizardCashIns.grandTotal) +
        Number(reduxValues.wizardCashOuts.drawerIn.grandTotal) +
        Number(reduxValues.wizardVouchers.vouchersSafeToDrawer.grandTotal) -
        Number(reduxValues.wizardVouchers.vouchersDrawerToSafe.grandTotal);

    //! DIFERENCE
    const drawerBackDifferenceCoins =
        Number(expectedDrawerBackCoins) -
        Number(reduxValues.wizardSafeDrawerIn.coinsTotal);
    const drawerBackDifferenceBills =
        Number(expectedDrawerBackBills) -
        Number(reduxValues.wizardSafeDrawerIn.billsTotal);
    const drawerBackDifferenceGrandTotal =
        Number(drawerBackDifferenceCoins) + Number(drawerBackDifferenceBills);

    const earingsDifferenceCoins =
        Number(reduxValues.wizardTotalExpected.expected.coinsTotal) -
        Number(reduxValues.wizardSafeDrawerOut.real.coinsTotal);
    const earingsDifferenceBills =
        Number(reduxValues.wizardTotalExpected.expected.billsTotal) -
        Number(reduxValues.wizardSafeDrawerOut.real.billsTotal);
    const earingsDifferenceGrandTotal =
        Number(earingsDifferenceCoins) + Number(earingsDifferenceBills);

    const endTotalDifferenceCoins =
        Number(drawerBackDifferenceCoins) + Number(earingsDifferenceCoins);
    const endTotalDifferenceBills =
        Number(drawerBackDifferenceBills) + Number(earingsDifferenceBills);
    const endTotalDifferenceGrandTotal =
        Number(endTotalDifferenceCoins) + Number(endTotalDifferenceBills);
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <table className="table">
                    <thead>
                        <tr className="bg-dark text-color-white">
                            <th>
                                <b>Descriptions</b>
                            </th>
                            <th>
                                <b>Coins Total</b>
                            </th>
                            <th>
                                <b>Bills Total</b>
                            </th>
                            <th>
                                <b>Grand Total</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Drawers Start</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerIn.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerIn.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerIn.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Safe Cash Start</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerOut.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerOut.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerOut.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>Safe Total (Safe Cash Start+Drawers Start)</th>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.coinsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerOut.coinsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.billsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerOut.billsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.grandTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerOut.grandTotal
                                        )
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Cash In Summary</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashIns.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashIns.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashIns.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Cash Out (Drawer In) Summary</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerIn
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerIn
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerIn
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Cash Out (Drawer Out) Summary</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerOut
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerOut
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardCashOuts.drawerOut
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>
                                Cash Out Summary( Cash Out DrawerIn + Cash Out
                                DrawerOut)
                            </th>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .coinsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardCashOuts.drawerIn
                                                .coinsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .billsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardCashOuts.drawerIn
                                                .billsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .grandTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardCashOuts.drawerIn
                                                .grandTotal
                                        )
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vouchers In</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersIns
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersIns
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersIns
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vouchers Out</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersOuts
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersOuts
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.vouchersOuts
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vouchers Safe To Drawer</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersSafeToDrawer.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersSafeToDrawer.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersSafeToDrawer.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Vouchers Drawer To Safe</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersDrawerToSafe.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersDrawerToSafe.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers
                                        .vouchersDrawerToSafe.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>Vouchers Total</th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardVouchers.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Expected Drawer(Ammount supposed to be in to
                                drawers)
                            </th>
                            <td>{currencyFormat(expectedDrawerBackCoins)}</td>
                            <td>{currencyFormat(expectedDrawerBackBills)}</td>
                            <td>
                                {currencyFormat(expectedDrawerBackGrandTotal)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Expected Safe Cash(Ammount supposed to be in to
                                Safe Cash)
                            </th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardTotalExpected.expected
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardTotalExpected.expected
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardTotalExpected.expected
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>Expected End Total</th>
                            <td>
                                {currencyFormat(
                                    Number(expectedDrawerBackCoins) +
                                        Number(
                                            reduxValues.wizardTotalExpected
                                                .expected.coinsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(expectedDrawerBackBills) +
                                        Number(
                                            reduxValues.wizardTotalExpected
                                                .expected.billsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(expectedDrawerBackGrandTotal) +
                                        Number(
                                            reduxValues.wizardTotalExpected
                                                .expected.grandTotal
                                        )
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Real Drawers (Real Ammount Values in drawers)
                            </th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerIn.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerIn.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerIn.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Real Drawer Safe Cash (Real Values captured by
                                the manager in safe Cash)
                            </th>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerOut.real
                                        .coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerOut.real
                                        .billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeDrawerOut.real
                                        .grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>Real Total</th>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeDrawerIn
                                            .coinsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeDrawerOut.real
                                                .coinsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeDrawerIn
                                            .billsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeDrawerOut.real
                                                .billsTotal
                                        )
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeDrawerIn
                                            .grandTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeDrawerOut.real
                                                .grandTotal
                                        )
                                )}
                            </td>
                        </tr>
                        {/*   <tr>
                            <th>Drawer Back Difference</th>
                            <td>{currencyFormat(drawerBackDifferenceCoins)}</td>
                            <td>{currencyFormat(drawerBackDifferenceBills)}</td>
                            <td>
                                {currencyFormat(drawerBackDifferenceGrandTotal)}
                            </td>
                        </tr> */}
                        <tr className="bg-dark text-color-white">
                            <td colSpan="4" className="text-center">
                                <b>Total</b>
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>Total Difference</th>
                            <td> {currencyFormat(earingsDifferenceCoins)}</td>
                            <td> {currencyFormat(earingsDifferenceBills)}</td>
                            <td>
                                {currencyFormat(earingsDifferenceGrandTotal)}
                            </td>
                        </tr>
                        {/* <tr className="bg-secondary text-color-white">
                            <th>End Total Difference</th>
                            <td> {currencyFormat(endTotalDifferenceCoins)}</td>
                            <td> {currencyFormat(endTotalDifferenceBills)}</td>
                            <td>
                                {currencyFormat(endTotalDifferenceGrandTotal)}
                            </td>
                        </tr> */}
                    </tbody>
                </table>
                <button
                    className="btn btn-danger w-100"
                    type="button"
                    onClick={() => onSubmit()}
                >
                    Save{' '}
                </button>
            </BlockUi>
        </>
    );
};

export default Summary;
React.memo(Summary);
