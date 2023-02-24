/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {saveCashSafe} from '@app/services/';
import {
    getSafeCashAction,
    wizardVoucher
} from '@app/store/reducers/safeCashDucks';
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

    const onSubmit = async () => {
        try {
            const hoy = new Date();
            setBlock(true);
            await saveCashSafe({
                date: reduxValues.wizardDate,
                // created va en el back
                createdHour: `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`,
                jsonValues: reduxValues
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

    //! WIZARDEXPECTEDENDTOTAL
    useEffect(() => {
        const wizardExpectedEndTotal = {};
    }, []);

    //! WIZARDEXPECTEDVALUES
    useEffect(() => {
        console.log('hihi');
        const wizardExpectedValues = {
            pennies:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.pennies
                ) -
                Number(reduxValues.wizardCashIns.pennies) +
                Number(reduxValues.wizardCashOuts.drawerIn.pennies) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .penniesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .penniesTotalTotal
                ),
            nickels:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.nickels
                ) -
                Number(reduxValues.wizardCashIns.nickels) +
                Number(reduxValues.wizardCashOuts.drawerIn.nickels) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .nickelsTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .nickelsTotalTotal
                ),
            dimes:
                Number(reduxValues.wizardSafeStart.realAmount.drawerIn.dimes) -
                Number(reduxValues.wizardCashIns.dimes) +
                Number(reduxValues.wizardCashOuts.drawerIn.dimes) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .dimesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .dimesTotalTotal
                ),
            quarters:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.quarters
                ) -
                Number(reduxValues.wizardCashIns.quarters) +
                Number(reduxValues.wizardCashOuts.drawerIn.quarters) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .quartersTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .quartersTotalTotal
                ),
            penniesRoll:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.penniesRoll
                ) -
                Number(reduxValues.wizardCashIns.penniesRoll) +
                Number(reduxValues.wizardCashOuts.drawerIn.penniesRoll) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .penniesRollTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .penniesRollTotalTotal
                ),
            nickelsRoll:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.nickelsRoll
                ) -
                Number(reduxValues.wizardCashIns.nickelsRoll) +
                Number(reduxValues.wizardCashOuts.drawerIn.nickelsRoll) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .nickelsRollTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .nickelsRollTotalTotal
                ),
            dimesRoll:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.dimesRoll
                ) -
                Number(reduxValues.wizardCashIns.dimesRoll) +
                Number(reduxValues.wizardCashOuts.drawerIn.dimesRoll) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .dimesRollTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .dimesRollTotalTotal
                ),
            quartersRoll:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.quartersRoll
                ) -
                Number(reduxValues.wizardCashIns.quartersRoll) +
                Number(reduxValues.wizardCashOuts.drawerIn.quartersRoll) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .quartersRollTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .quartersRollTotalTotal
                ),
            ones:
                Number(reduxValues.wizardSafeStart.realAmount.drawerIn.ones) -
                Number(reduxValues.wizardCashIns.ones) +
                Number(reduxValues.wizardCashOuts.drawerIn.ones) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .onesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .onesTotalTotal
                ),
            twos:
                Number(reduxValues.wizardSafeStart.realAmount.drawerIn.twos) -
                Number(reduxValues.wizardCashIns.twos) +
                Number(reduxValues.wizardCashOuts.drawerIn.twos) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .twosTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .twosTotalTotal
                ),
            fives:
                Number(reduxValues.wizardSafeStart.realAmount.drawerIn.fives) -
                Number(reduxValues.wizardCashIns.fives) +
                Number(reduxValues.wizardCashOuts.drawerIn.fives) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .fivesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .fivesTotalTotal
                ),
            tens:
                Number(reduxValues.wizardSafeStart.realAmount.drawerIn.tens) -
                Number(reduxValues.wizardCashIns.tens) +
                Number(reduxValues.wizardCashOuts.drawerIn.tens) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .tensTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .tensTotalTotal
                ),
            twenties:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.twenties
                ) -
                Number(reduxValues.wizardCashIns.twenties) +
                Number(reduxValues.wizardCashOuts.drawerIn.twenties) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .twentiesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .twentiesTotalTotal
                ),
            fifties:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.fifties
                ) -
                Number(reduxValues.wizardCashIns.fifties) +
                Number(reduxValues.wizardCashOuts.drawerIn.fifties) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .fiftiesTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .fiftiesTotalTotal
                ),
            hundreds:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.hundreds
                ) -
                Number(reduxValues.wizardCashIns.hundreds) +
                Number(reduxValues.wizardCashOuts.drawerIn.hundreds) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer
                        .hundredsTotalTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe
                        .hundredsTotalTotal
                ),
            coinsTotal:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.coinsTotal
                ) -
                Number(reduxValues.wizardCashIns.coinsTotal) +
                Number(reduxValues.wizardCashOuts.drawerIn.coinsTotal) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer.coinsTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe.coinsTotal
                ),
            billsTotal:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.billsTotal
                ) -
                Number(reduxValues.wizardCashIns.billsTotal) +
                Number(reduxValues.wizardCashOuts.drawerIn.billsTotal) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer.billsTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe.billsTotal
                ),
            grandTotal:
                Number(
                    reduxValues.wizardSafeStart.realAmount.drawerIn.grandTotal
                ) -
                Number(reduxValues.wizardCashIns.grandTotal) +
                Number(reduxValues.wizardCashOuts.drawerIn.grandTotal) +
                Number(
                    reduxValues.wizardVouchers.vouchersSafeToDrawer.grandTotal
                ) -
                Number(
                    reduxValues.wizardVouchers.vouchersDrawerToSafe.grandTotal
                )
        };
        dispatch(
            wizardVoucher({
                type: 'wizardExpectedDrawer',
                expectedValues: wizardExpectedValues
            })
        );
        const wizardExpectedEndTotal = {
            pennies:
                Number(wizardExpectedValues.pennies) +
                Number(reduxValues.wizardTotalExpected.pennies),
            nickels:
                Number(wizardExpectedValues.nickels) +
                Number(reduxValues.wizardTotalExpected.nickels),
            dimes:
                Number(wizardExpectedValues.dimes) +
                Number(reduxValues.wizardTotalExpected.dimes),
            quarters:
                Number(wizardExpectedValues.quarters) +
                Number(reduxValues.wizardTotalExpected.quarters),
            penniesRoll:
                Number(wizardExpectedValues.penniesRoll) +
                Number(reduxValues.wizardTotalExpected.penniesRoll),
            nickelsRoll:
                Number(wizardExpectedValues.nickelsRoll) +
                Number(reduxValues.wizardTotalExpected.nickelsRoll),
            dimesRoll:
                Number(wizardExpectedValues.dimesRoll) +
                Number(reduxValues.wizardTotalExpected.dimesRoll),
            quartersRoll:
                Number(wizardExpectedValues.quartersRoll) +
                Number(reduxValues.wizardTotalExpected.quartersRoll),
            ones:
                Number(wizardExpectedValues.ones) +
                Number(reduxValues.wizardTotalExpected.ones),
            twos:
                Number(wizardExpectedValues.twos) +
                Number(reduxValues.wizardTotalExpected.twos),
            fives:
                Number(wizardExpectedValues.fives) +
                Number(reduxValues.wizardTotalExpected.fives),
            tens:
                Number(wizardExpectedValues.tens) +
                Number(reduxValues.wizardTotalExpected.tens),
            twenties:
                Number(wizardExpectedValues.twenties) +
                Number(reduxValues.wizardTotalExpected.twenties),
            fifties:
                Number(wizardExpectedValues.fifties) +
                Number(reduxValues.wizardTotalExpected.fifties),
            hundreds:
                Number(wizardExpectedValues.hundreds) +
                Number(reduxValues.wizardTotalExpected.hundreds),
            coinsTotal:
                Number(wizardExpectedValues.coinsTotal) +
                Number(reduxValues.wizardTotalExpected.expected.coinsTotal),
            billsTotal:
                Number(wizardExpectedValues.billsTotal) +
                Number(reduxValues.wizardTotalExpected.expected.billsTotal),
            grandTotal:
                Number(wizardExpectedValues.grandTotal) +
                Number(reduxValues.wizardTotalExpected.expected.grandTotal)
        };
        dispatch(
            wizardVoucher({
                type: 'wizardExpectedEndTotal',
                expectedValues: wizardExpectedEndTotal
            })
        );

        const realTotalValues = {
            pennies:
                Number(reduxValues.wizardSafeDrawerIn.pennies) +
                Number(reduxValues.wizardSafeDrawerOut.pennies),
            nickels:
                Number(reduxValues.wizardSafeDrawerIn.nickels) +
                Number(reduxValues.wizardSafeDrawerOut.nickels),
            dimes:
                Number(reduxValues.wizardSafeDrawerIn.dimes) +
                Number(reduxValues.wizardSafeDrawerOut.dimes),
            quarters:
                Number(reduxValues.wizardSafeDrawerIn.quarters) +
                Number(reduxValues.wizardSafeDrawerOut.quarters),
            penniesRoll:
                Number(reduxValues.wizardSafeDrawerIn.penniesRoll) +
                Number(reduxValues.wizardSafeDrawerOut.penniesRoll),
            nickelsRoll:
                Number(reduxValues.wizardSafeDrawerIn.nickelsRoll) +
                Number(reduxValues.wizardSafeDrawerOut.nickelsRoll),
            dimesRoll:
                Number(reduxValues.wizardSafeDrawerIn.dimesRoll) +
                Number(reduxValues.wizardSafeDrawerOut.dimesRoll),
            quartersRoll:
                Number(reduxValues.wizardSafeDrawerIn.quartersRoll) +
                Number(reduxValues.wizardSafeDrawerOut.quartersRoll),
            ones:
                Number(reduxValues.wizardSafeDrawerIn.ones) +
                Number(reduxValues.wizardSafeDrawerOut.ones),
            twos:
                Number(reduxValues.wizardSafeDrawerIn.twos) +
                Number(reduxValues.wizardSafeDrawerOut.twos),
            fives:
                Number(reduxValues.wizardSafeDrawerIn.fives) +
                Number(reduxValues.wizardSafeDrawerOut.fives),
            tens:
                Number(reduxValues.wizardSafeDrawerIn.tens) +
                Number(reduxValues.wizardSafeDrawerOut.tens),
            twenties:
                Number(reduxValues.wizardSafeDrawerIn.twenties) +
                Number(reduxValues.wizardSafeDrawerOut.twenties),
            fifties:
                Number(reduxValues.wizardSafeDrawerIn.fifties) +
                Number(reduxValues.wizardSafeDrawerOut.fifties),
            hundreds:
                Number(reduxValues.wizardSafeDrawerIn.hundreds) +
                Number(reduxValues.wizardSafeDrawerOut.hundreds),
            coinsTotal:
                Number(reduxValues.wizardSafeDrawerIn.coinsTotal) +
                Number(reduxValues.wizardSafeDrawerOut.real.coinsTotal),
            billsTotal:
                Number(reduxValues.wizardSafeDrawerIn.billsTotal) +
                Number(reduxValues.wizardSafeDrawerOut.real.billsTotal),
            grandTotal:
                Number(reduxValues.wizardSafeDrawerIn.grandTotal) +
                Number(reduxValues.wizardSafeDrawerOut.real.grandTotal)
        };
        dispatch(
            wizardVoucher({
                type: 'wizardRealTotalValues',
                expectedValues: realTotalValues
            })
        );
        const differenceValues = {
            pennies:
                Number(wizardExpectedEndTotal.pennies) -
                Number(realTotalValues.pennies),
            nickels:
                Number(wizardExpectedEndTotal.nickels) -
                Number(realTotalValues.nickels),
            dimes:
                Number(wizardExpectedEndTotal.dimes) -
                Number(realTotalValues.dimes),
            quarters:
                Number(wizardExpectedEndTotal.quarters) -
                Number(realTotalValues.quarters),
            penniesRoll:
                Number(wizardExpectedEndTotal.penniesRoll) -
                Number(realTotalValues.penniesRoll),
            nickelsRoll:
                Number(wizardExpectedEndTotal.nickelsRoll) -
                Number(realTotalValues.nickelsRoll),
            dimesRoll:
                Number(wizardExpectedEndTotal.dimesRoll) -
                Number(realTotalValues.dimesRoll),
            quartersRoll:
                Number(wizardExpectedEndTotal.quartersRoll) -
                Number(realTotalValues.quartersRoll),
            ones:
                Number(wizardExpectedEndTotal.ones) -
                Number(realTotalValues.ones),
            twos:
                Number(wizardExpectedEndTotal.twos) -
                Number(realTotalValues.twos),
            fives:
                Number(wizardExpectedEndTotal.fives) -
                Number(realTotalValues.fives),
            tens:
                Number(wizardExpectedEndTotal.tens) -
                Number(realTotalValues.tens),
            twenties:
                Number(wizardExpectedEndTotal.twenties) -
                Number(realTotalValues.twenties),
            fifties:
                Number(wizardExpectedEndTotal.fifties) -
                Number(realTotalValues.fifties),
            hundreds:
                Number(wizardExpectedEndTotal.hundreds) -
                Number(realTotalValues.hundreds),
            coinsTotal:
                Number(wizardExpectedEndTotal.coinsTotal) -
                Number(realTotalValues.coinsTotal),
            billsTotal:
                Number(wizardExpectedEndTotal.billsTotal) -
                Number(realTotalValues.billsTotal),
            grandTotal:
                Number(wizardExpectedEndTotal.grandTotal) -
                Number(realTotalValues.grandTotal)
        };
        dispatch(
            wizardVoucher({
                type: 'wizardDiferenceTotal',
                expectedValues: differenceValues
            })
        );
    }, []);
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
    const earingsDifferenceCoins =
        Number(reduxValues.wizardTotalExpected.expected.coinsTotal) -
        Number(reduxValues.wizardSafeDrawerOut.real.coinsTotal);
    const earingsDifferenceBills =
        Number(reduxValues.wizardTotalExpected.expected.billsTotal) -
        Number(reduxValues.wizardSafeDrawerOut.real.billsTotal);
    const earingsDifferenceGrandTotal =
        Number(earingsDifferenceCoins) + Number(earingsDifferenceBills);

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
                                        .drawerOut.real.coinsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerOut.real.billsTotal
                                )}
                            </td>
                            <td>
                                {currencyFormat(
                                    reduxValues.wizardSafeStart.realAmount
                                        .drawerOut.real.grandTotal
                                )}
                            </td>
                        </tr>
                        <tr className="bg-secondary text-color-white">
                            <th>
                                <label title="(Safe Cash Start + Drawers Start)">
                                    Safe Total
                                </label>
                            </th>
                            <td>
                                {currencyFormat(
                                    Number(
                                        reduxValues.wizardSafeStart.realAmount
                                            .drawerIn.coinsTotal
                                    ) +
                                        Number(
                                            reduxValues.wizardSafeStart
                                                .realAmount.drawerOut.real
                                                .coinsTotal
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
                                                .realAmount.drawerOut.real
                                                .billsTotal
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
                                                .realAmount.drawerOut.real
                                                .grandTotal
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
                            <th>Cash Out From Drawer In</th>
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
                            <th>Cash Out From Drawer Out</th>
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
                                <label
                                    title="( Cash Out DrawerIn + Cash Out
                                        DrawerOut)"
                                >
                                    Cash Out Summary
                                </label>
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
                            {
                                // it the operation of adding vouchersIn plus VouchersD2S minus the summatory of VouchersOut and VouchersS2D
                                // (VouchersIn + VouchersD2S) - (VouchersOut + VouchersS2D)
                            }
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
                                <label
                                    title="(Ammount supposed to be into
                                        drawers)"
                                >
                                    Expected Drawer
                                </label>
                            </th>
                            <td>{currencyFormat(expectedDrawerBackCoins)}</td>
                            <td>{currencyFormat(expectedDrawerBackBills)}</td>
                            <td>
                                {currencyFormat(expectedDrawerBackGrandTotal)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label
                                    title="(Ammount supposed to be into
                                Safe Cash)"
                                >
                                    Expected Safe Cash
                                </label>
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
                                <label title="(Real Ammount Values in drawers)">
                                    Real Drawers
                                </label>
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
                                <label
                                    title="(Real Values captured by
                                the manager in Safe Cash)"
                                >
                                    Real Drawer Safe Cash
                                </label>
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
