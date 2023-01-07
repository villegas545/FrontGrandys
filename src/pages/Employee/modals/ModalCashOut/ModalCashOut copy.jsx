/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
// eslint-disable-next-line no-unused-vars
import {toast} from 'react-toastify';
import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {useSelector, useDispatch} from 'react-redux';
import BlockUi from 'react-block-ui';
import {
    addCashOutService,
    cashOutApiInfo,
    getCashInByEmployeeAndDate,
    getCashRegisterEndupsByDayAndEmployeeAndRejected
} from '@app/services/';
import {getCashOutAction} from '@app/store/reducers/cashOutDucks';
import {getToday} from '@app/services/utils';

const ModalCashOut = ({onHide, show, idRow, action, user}) => {
    const [drawer, setDrawer] = useState('');
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details Balance - {user.user || null}{' '}
                    {user ? user.name : null}
                    Drawer {drawer}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BodyInfo
                    idRow={idRow}
                    action={action}
                    user={user}
                    onHide={onHide}
                    setDrawer={setDrawer}
                />
            </Modal.Body>
        </Modal>
    );
};

// eslint-disable-next-line no-unused-vars

const BodyInfo = ({idRow, user, onHide, setDrawer}) => {
    console.log(user);
    const [block, setBlock] = useState(false);
    const dispatch = useDispatch();
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
        comments: '',
        date: getToday(),
        idEmployee: user.id
    });
    const [apiInfo, setApiInfo] = React.useState();
    const [cashIn, setCashIn] = React.useState(0);
    const [error, setError] = React.useState();
    const [dateState, setDateState] = useState(getToday());
    // eslint-disable-next-line no-unused-vars
    const getApiInfo = async (date) => {
        try {
            setBlock(true);
            setApiInfo(await cashOutApiInfo(date));
            const resCashIn = await getCashInByEmployeeAndDate(date);
            if (resCashIn) {
                const coinsTotal =
                    (resCashIn.pennies +
                        resCashIn.nickels * 5 +
                        resCashIn.dimes * 10 +
                        resCashIn.quarters * 25) /
                        100 +
                    (resCashIn.penniesRoll * 50 +
                        resCashIn.nickelsRoll * 5 * 40 +
                        resCashIn.dimesRoll * 10 * 50 +
                        resCashIn.quartersRoll * 25 * 40) /
                        100;
                const billsTotal =
                    resCashIn.ones +
                    resCashIn.twos * 2 +
                    resCashIn.fives * 5 +
                    resCashIn.tens * 10 +
                    resCashIn.twenties * 20 +
                    resCashIn.fifties * 50 +
                    resCashIn.hundreads * 100;
                const totalTotal = Number(coinsTotal) + Number(billsTotal);
                setDrawer(resCashIn.drawer);
                setCashIn(totalTotal);
            } else {
                setCashIn(0);
            }

            setBlock(false);
        } catch (err) {
            console.log(err);
        }
    };
    // cargar si esta cancelado
    useEffect(() => {
        (async () => {
            const res = await getCashRegisterEndupsByDayAndEmployeeAndRejected(
                dateState
            );
            await getApiInfo(dateState);
            console.log(res);
            if (res) {
                const {
                    pennies,
                    nickels,
                    dimes,
                    quarters,
                    penniesRoll,
                    nickelsRoll,
                    dimesRoll,
                    quartersRoll,
                    ones,
                    twos,
                    fives,
                    tens,
                    twenties,
                    fifties,
                    hundreds,
                    comments
                } = res;
                setForm({
                    ...form,
                    pennies,
                    nickels,
                    dimes,
                    quarters,
                    penniesRoll,
                    nickelsRoll,
                    dimesRoll,
                    quartersRoll,
                    ones,
                    twos,
                    fives,
                    tens,
                    twenties,
                    fifties,
                    hundreds,
                    comments
                });
            }
        })();
    }, [dateState]);

    /*    useEffect(() => {
        getApiInfo(getToday());
    }, []); */

    useEffect(() => {
        console.log(cashIn);
    }, [cashIn]);

    /* GET PIPO TOTAL */
    const getPipoTotal = (apiData) => {
        try {
            let pipoTotal = 0;
            apiData.userPipo.forEach((element) => {
                console.log(element);
                if (element.pipo_type === 'pay out') {
                    pipoTotal -= element.amount;
                } else {
                    pipoTotal += element.amount;
                }
            });
            console.log(pipoTotal);
            return pipoTotal;
        } catch (err) {
            return 0;
        }
    };

    /* GET SALES TYPE */
    const owedTotal = (apiData) => {
        try {
            let cashOwed = 0;
            let creditOwed = 0;
            apiData.owed2House[0].payments.forEach((element) => {
                console.log(element);
                if (element.payment_type === 'Credit') {
                    creditOwed = element.amount;
                }
                if (element.payment_type === 'Cash') {
                    cashOwed = element.amount;
                }
            });
            return {cashOwed, creditOwed};
        } catch (err) {
            return {cashOwed: 0, creditOwed: 0};
        }
    };

    //! Envio de formulario
    const submit = async () => {
        try {
            const coinsTotal =
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
            const billsTotal =
                Number(form.ones) +
                Number(form.twos * 2) +
                Number(form.fives * 5) +
                Number(form.tens * 10) +
                Number(form.twenties * 20) +
                Number(form.fifties * 50) +
                Number(form.hundreds * 100);
            const grandTotal = Number(coinsTotal) + Number(billsTotal);
            const pipo = getPipoTotal(apiInfo);
            const cashSales = owedTotal(apiInfo).cashOwed;
            const creditSales = owedTotal(apiInfo).creditOwed;
            const expected = Number(cashIn) + Number(cashSales) + Number(pipo);
            const difference = Number(grandTotal) - Number(expected);
            const dataform = form;
            dataform.coinsTotal = Number(coinsTotal).toFixed(2);
            dataform.billsTotal = Number(billsTotal).toFixed(2);
            dataform.grandTotal = Number(grandTotal).toFixed(2);
            dataform.pipo = Number(pipo).toFixed(2);
            dataform.cashSales = Number(cashSales).toFixed(2);
            dataform.creditSales = Number(creditSales).toFixed(2);
            dataform.expected = Number(expected).toFixed(2);
            dataform.difference = Number(difference).toFixed(2);
            dataform.cashIn = Number(cashIn).toFixed(2);
            setBlock(true);
            const response = await addCashOutService(dataform);
            setBlock(false);
            if (response.message === 'existentEmployees') {
                setError(
                    `The employee already has an Open Cash Out Registry, "Please Close It First"`
                );
            } else {
                dispatch(getCashOutAction('reload'));
                toast.success('The registry is saved');
                onHide();
            }
        } catch (err) {
            console.log(err);
            setError('err.data.error');
        }
    };

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
                            ``
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
                                            value="Register"
                                            onClick={() => submit()}
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

export default ModalCashOut;
