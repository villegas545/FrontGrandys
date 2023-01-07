import React, {useEffect} from 'react';
import {currencyFormat} from '@app/services/utils';
import BlockUi from 'react-block-ui';

const Resume = ({formIn, formOut, submit, setSubTitle, error, block}) => {
    useEffect(() => {
        setSubTitle('Please Review The Data');
    }, []);
    const coinsTotalIn =
        (Number(formIn.pennies) +
            Number(formIn.nickels * 5) +
            Number(formIn.dimes * 10) +
            Number(formIn.quarters * 25)) /
            100 +
        (Number(formIn.penniesRoll * 50) +
            Number(formIn.nickelsRoll * 5 * 40) +
            Number(formIn.dimesRoll * 10 * 50) +
            Number(formIn.quartersRoll * 25 * 40)) /
            100;
    const billsTotalIn =
        Number(formIn.ones) +
        Number(formIn.twos * 2) +
        Number(formIn.fives * 5) +
        Number(formIn.tens * 10) +
        Number(formIn.twenties * 20) +
        Number(formIn.fifties * 50) +
        Number(formIn.hundreds * 100);
    const grandTotalIn = Number(coinsTotalIn) + Number(billsTotalIn);

    const coinsTotalOut =
        (Number(formOut.pennies) +
            Number(formOut.nickels * 5) +
            Number(formOut.dimes * 10) +
            Number(formOut.quarters * 25)) /
            100 +
        (Number(formOut.penniesRoll * 50) +
            Number(formOut.nickelsRoll * 5 * 40) +
            Number(formOut.dimesRoll * 10 * 50) +
            Number(formOut.quartersRoll * 25 * 40)) /
            100;
    const billsTotalOut =
        Number(formOut.ones) +
        Number(formOut.twos * 2) +
        Number(formOut.fives * 5) +
        Number(formOut.tens * 10) +
        Number(formOut.twenties * 20) +
        Number(formOut.fifties * 50) +
        Number(formOut.hundreds * 100);
    const grandTotalOut = Number(coinsTotalOut) + Number(billsTotalOut);

    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <div className="card-body">
                    <div className="d-flex justify-content-around h5">
                        <div>
                            <span className="h4">
                                <b>Drawer In</b>
                            </span>
                            <br />
                            <span>
                                <b>Coins:</b>
                                {currencyFormat(coinsTotalIn)}
                            </span>
                            <br />
                            <span>
                                <b>Bills:</b>
                                {currencyFormat(billsTotalIn)}
                            </span>
                            <br />
                            <b>Total: </b>
                            {currencyFormat(grandTotalIn)}{' '}
                        </div>
                        <br />
                        <div>
                            <span className="h4">
                                <b>Drawer Out</b>
                            </span>
                            <br />
                            <span>
                                <b>Coins:</b>
                                {currencyFormat(coinsTotalOut)}
                            </span>
                            <br />
                            <span>
                                <b>Bills:</b>
                                {currencyFormat(billsTotalOut)}
                            </span>
                            <br />
                            <b>Total: </b>
                            {currencyFormat(grandTotalOut)}
                        </div>
                        <br />
                        <div>
                            <span className="h4">
                                <b>Total</b>
                            </span>
                            <br />
                            <span>
                                <b>Coins:</b>
                                {currencyFormat(
                                    Number(coinsTotalIn) + Number(coinsTotalOut)
                                )}
                            </span>
                            <br />
                            <span>
                                <b>Bills:</b>
                                {currencyFormat(
                                    Number(billsTotalIn) + Number(billsTotalOut)
                                )}
                            </span>
                            <br />
                            <b>Total: </b>
                            {currencyFormat(
                                Number(grandTotalIn) + Number(grandTotalOut)
                            )}{' '}
                        </div>
                        <br />
                    </div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        type="button"
                        onClick={() => submit()}
                    >
                        Save{' '}
                    </button>
                    <p className="text-danger"> {error || null}</p>
                </div>
            </BlockUi>
        </>
    );
};

export default Resume;
React.memo(Resume);
