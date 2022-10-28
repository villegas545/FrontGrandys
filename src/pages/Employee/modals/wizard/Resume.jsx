import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {currencyFormat} from '@app/services/utils';
import {saveCashSafe} from '@app/services/';
import {getSafeCashAction} from '@app/store/reducers/safeCashDucks';
import BlockUi from 'react-block-ui';
import {toast} from 'react-toastify';

const Resume = ({onHide}) => {
    const reduxValues = useSelector((state) => state.safeCash);
    const [block, setBlock] = useState(false);
    const dispatch = useDispatch();
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
    const getCoinsVoucher = (data) => {
        let totalIn = 0;
        let totalOut = 0;
        data.forEach((row) => {
            if (row.type === 'In') {
                totalIn +=
                    (Number(row.pennies) +
                        Number(row.nickels * 5) +
                        Number(row.dimes * 10) +
                        Number(row.quarters * 25)) /
                    100;
            } else {
                totalOut +=
                    (Number(row.pennies) +
                        Number(row.nickels * 5) +
                        Number(row.dimes * 10) +
                        Number(row.quarters * 25)) /
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
                    getCoinsVoucher(reduxValues.wizardVouchers).totalIn,
                vouchersOut:
                    getCoinsVoucher(reduxValues.wizardVouchers).totalOut +
                    getCoinsVoucher(reduxValues.wizardVouchers).totalOut,
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
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <div className="card-body">
                    <div className="d-flex justify-content-around h5">
                        <div>
                            <div>
                                <span className="h4">
                                    <b>Safe Start</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotal(
                                            reduxValues.wizardSafeStart
                                        )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotalHundreads(
                                            reduxValues.wizardSafeStart
                                        )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotal(reduxValues.wizardSafeStart) +
                                        getBillsTotalHundreads(
                                            reduxValues.wizardSafeStart
                                        )
                                )}{' '}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Expected Values</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotal(
                                            reduxValues.wizardTotalExpected
                                        )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotal(
                                            reduxValues.wizardTotalExpected
                                        )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotal(
                                        reduxValues.wizardTotalExpected
                                    ) +
                                        getBillsTotal(
                                            reduxValues.wizardTotalExpected
                                        )
                                )}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Real Values</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotal(
                                            reduxValues.wizardTotalReal
                                        )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotal(
                                            reduxValues.wizardTotalReal
                                        )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotal(reduxValues.wizardTotalReal) +
                                        getBillsTotal(
                                            reduxValues.wizardTotalReal
                                        )
                                )}{' '}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Diference</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotal(
                                            reduxValues.wizardTotalExpected
                                        ) -
                                            getCoinsTotal(
                                                reduxValues.wizardTotalReal
                                            )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotal(
                                            reduxValues.wizardTotalExpected
                                        ) -
                                            getBillsTotal(
                                                reduxValues.wizardTotalReal
                                            )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotal(
                                        reduxValues.wizardTotalExpected
                                    ) +
                                        getBillsTotal(
                                            reduxValues.wizardTotalExpected
                                        ) -
                                        (getCoinsTotal(
                                            reduxValues.wizardTotalReal
                                        ) +
                                            getBillsTotal(
                                                reduxValues.wizardTotalReal
                                            ))
                                )}
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="h4">
                                    <b>Cash In</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotalArray(
                                            reduxValues.wizardCashIns
                                        )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotalArray(
                                            reduxValues.wizardCashIns
                                        )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotalArray(
                                        reduxValues.wizardCashIns
                                    ) +
                                        getBillsTotalArray(
                                            reduxValues.wizardCashIns
                                        )
                                )}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Cash Out</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {currencyFormat(
                                        getCoinsTotalArray(
                                            reduxValues.wizardCashOuts
                                        )
                                    )}
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getBillsTotalArrayCashOut(
                                            reduxValues.wizardCashOuts
                                        )
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsTotalArray(
                                        reduxValues.wizardCashOuts
                                    ) +
                                        getBillsTotalArrayCashOut(
                                            reduxValues.wizardCashOuts
                                        )
                                )}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Vouchers In Values:</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {
                                        currencyFormat(
                                            getCoinsVoucher(
                                                reduxValues.wizardVouchers
                                            )
                                        ).totalIn
                                    }
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getCoinsVoucher(
                                            reduxValues.wizardVouchers
                                        ).totalIn
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsVoucher(reduxValues.wizardVouchers)
                                        .totalIn +
                                        getCoinsVoucher(
                                            reduxValues.wizardVouchers
                                        ).totalIn
                                )}
                            </div>
                            <br />
                            <div>
                                <span className="h4">
                                    <b>Vouchers Out Values:</b>
                                </span>
                                <br />
                                <span>
                                    <b>Coins:</b>
                                    {
                                        currencyFormat(
                                            getCoinsVoucher(
                                                reduxValues.wizardVouchers
                                            )
                                        ).totalOut
                                    }
                                </span>
                                <br />
                                <span>
                                    <b>Bills:</b>
                                    {currencyFormat(
                                        getCoinsVoucher(
                                            reduxValues.wizardVouchers
                                        ).totalOut
                                    )}
                                </span>
                                <br />
                                <b>Total: </b>
                                {currencyFormat(
                                    getCoinsVoucher(reduxValues.wizardVouchers)
                                        .totalOut +
                                        getCoinsVoucher(
                                            reduxValues.wizardVouchers
                                        ).totalOut
                                )}
                            </div>
                        </div>
                    </div>
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

export default Resume;
React.memo(Resume);
