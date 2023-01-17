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
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>---</th>
                                <th>Drawers Start</th>
                                <th>Cash Start</th>
                                <th>Start Total</th>
                                <th>Drawer Out</th>
                                <th>Drawer Back</th>
                                <th>Earnings</th>
                                <th>End Total</th>
                                <th>Vouchers In</th>
                                <th>Vouchers Out</th>
                                <th>Vouchers Total</th>
                                <th>Expected Drawer Back</th>
                                <th>Expected Earnings</th>
                                <th>Expected End Total</th>
                                <th>Drawer Back Difference</th>
                                <th>Earings Difference</th>
                                <th>End Total Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //! COMIENZA LA PRIMERA FILA
                            }

                            <tr>
                                <td>
                                    <b>Coins Total</b>
                                </td>
                                {
                                    // Safe Start
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.coinsTotal
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerOut.coinsTotal
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerIn.coinsTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardSafeStart
                                                    .realAmount.drawerOut
                                                    .coinsTotal
                                            )
                                    )}
                                </td>
                                {
                                    // Cash In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashIns.coinsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerIn
                                            .coinsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer Out
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .coinsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In+DrawerOut
                                }
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardCashOuts.drawerOut
                                                .coinsTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardCashOuts
                                                    .drawerIn.coinsTotal
                                            )
                                    )}
                                </td>
                                {
                                    //
                                }
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardCashOuts.drawerOut
                                                .coinsTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardCashOuts
                                                    .drawerIn.coinsTotal
                                            )
                                    )}
                                </td>
                            </tr>
                            {
                                //! COMIENZA LA SEGUNDA FILA
                            }
                            <tr>
                                <td>
                                    <b>Bills Total</b>
                                </td>

                                {
                                    // Safe Start
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.billsTotal
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
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerIn.billsTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardSafeStart
                                                    .realAmount.drawerOut
                                                    .billsTotal
                                            )
                                    )}
                                </td>
                                {
                                    // Cash In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashIns.billsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerIn
                                            .billsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer Out
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .billsTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In+DrawerOut
                                }
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardCashOuts.drawerOut
                                                .billsTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardCashOuts
                                                    .drawerIn.billsTotal
                                            )
                                    )}
                                </td>
                                {
                                    // Vouchers In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardVouchers.filter(
                                            (item) => item.type === 'In'
                                        ).billsTotal
                                    )}
                                </td>
                            </tr>
                            {
                                //! COMIENZA LA TERCERA FILA
                            }
                            <tr>
                                <td>
                                    <b>Grand Total</b>
                                </td>
                                {
                                    // Safe Start
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.grandTotal
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerOut.grandTotal
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerIn.grandTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardSafeStart
                                                    .realAmount.drawerOut
                                                    .grandTotal
                                            )
                                    )}
                                </td>
                                {
                                    // Cash In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashIns.grandTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerIn
                                            .grandTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer Out
                                }
                                <td>
                                    {currencyFormat(
                                        reduxValues.wizardCashOuts.drawerOut
                                            .grandTotal
                                    )}
                                </td>
                                {
                                    // Cash Out Drawer In+DrawerOut
                                }
                                <td>
                                    {currencyFormat(
                                        Number(
                                            reduxValues.wizardCashOuts.drawerOut
                                                .grandTotal
                                        ) +
                                            Number(
                                                reduxValues.wizardCashOuts
                                                    .drawerIn.grandTotal
                                            )
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={() => onSubmit()}
                    >
                        Save{' '}
                    </button>
                </div>
            </BlockUi>
        </>
    );
};

export default Summary;
React.memo(Summary);
