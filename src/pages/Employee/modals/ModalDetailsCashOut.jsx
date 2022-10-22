/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading';

import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {useSelector} from 'react-redux';
import {addCashOutService, cashOutApiInfo} from '@app/services/';
import {getToday} from '@app/services/utils';

const ModalDetailsCashOut = ({onHide, show, idRow, action, user}) => {
    console.log(user);
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
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BodyInfo idRow={idRow} action={action} user={user} />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({idRow, action, user}) => {
    console.log(user);
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
        comentaries: '',
        date: '',
        idEmployee: user.id
    });
    const [apiInfo, setApiInfo] = React.useState();
    const [cargando, setCargando] = React.useState(false);
    const getApiInfo = async (date) => {
        setCargando(true);
        setApiInfo(await cashOutApiInfo(date));
        setCargando(false);
    };

    useEffect(() => {
        getApiInfo(getToday());
    }, []);

    const cashOut = useSelector((store) => store.cashOut);
    // eslint-disable-next-line no-unused-vars
    const [actionButton, setActionButton] = useState();
    useEffect(() => {
        const filtered = cashOut.details.find(
            (element) => element.id === idRow
        );
        if (filtered) {
            setForm({
                pennies: filtered.pennies,
                nickels: filtered.nickels,
                dimes: filtered.dimes,
                quarters: filtered.quarters,
                ones: filtered.ones,
                twos: filtered.twos,
                fives: filtered.fives,
                tens: filtered.tens,
                twenties: filtered.twenties,
                fifties: filtered.fifties,
                hundreds: filtered.hundreds,
                comentaries: filtered.comentaries,
                date: filtered.date
            });
        }
        if (action) {
            switch (action) {
                case 'add':
                    setActionButton('Register');
                    break;
                default:
                    console.log('como chingas');
                    break;
            }
        }
    }, []);
    const addCashOut = async () => {
        try {
            await addCashOutService(form);
        } catch (error) {
            console.log(error);
        }
        console.log('click en add');
    };
    // eslint-disable-next-line no-unused-vars
    const submit = () => {
        switch (action) {
            case 'add':
                addCashOut();
                break;
            default:
                console.log('default');
                break;
        }
    };

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
        } catch (error) {
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
        } catch (error) {
            return {cashOwed: 0, creditOwed: 0};
        }
    };

    return (
        <>
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
                                getApiInfo(e.target.value);
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
                                value={
                                    form.pennies / 100 +
                                    (form.penniesRoll * 50) / 100
                                }
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
                                value={
                                    (form.nickels * 5) / 100 +
                                    (form.nickelsRoll * 5 * 40) / 100
                                }
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
                                value={
                                    (form.dimes * 10) / 100 +
                                    (form.dimesRoll * 10 * 50) / 100
                                }
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
                                value={
                                    (form.quarters * 25) / 100 +
                                    (form.quartersRoll * 25 * 40) / 100
                                }
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
                                value={form.ones}
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
                                value={form.twos * 2}
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
                                value={form.fives * 5}
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
                                value={form.tens * 10}
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
                                value={form.twenties * 20}
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
                                value={form.fifties * 50}
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
                                value={form.hundreds * 100}
                                disabled
                            />{' '}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <div className="flex-row p-2 justify-content-around">
                        {/* REAL */}
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
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
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
                                        Number(form.hundreds * 100)
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
                                        Number(form.hundreds * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100 +
                                        (Number(form.penniesRoll * 50) +
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
                                            Number(
                                                form.quartersRoll * 25 * 40
                                            )) /
                                            100
                                    }
                                    disabled
                                />
                            </div>
                        </div>
                        {apiInfo ? (
                            <>
                                {/* EXPECTED */}
                                Expected:
                                <div className="d-flex justify-content-around mb-3">
                                    <div>
                                        <span
                                            className="input-group-text"
                                            style={{minWidth: '100px'}}
                                        >
                                            Pay in/out
                                        </span>
                                        <CurrencyFormat
                                            displayType="text"
                                            thousandSeparator
                                            prefix="$"
                                            className="form-control input-sm mr-3"
                                            style={{minWidth: '50px'}}
                                            value={getPipoTotal(apiInfo)}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span
                                            className="input-group-text"
                                            style={{minWidth: '100px'}}
                                        >
                                            Cash Sales
                                        </span>
                                        <CurrencyFormat
                                            displayType="text"
                                            thousandSeparator
                                            prefix="$"
                                            className="form-control input-sm mr-3"
                                            style={{minWidth: '50px'}}
                                            value={owedTotal(apiInfo).cashOwed}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span
                                            className="input-group-text"
                                            style={{minWidth: '100px'}}
                                        >
                                            Credit sales
                                        </span>
                                        <CurrencyFormat
                                            displayType="text"
                                            thousandSeparator
                                            prefix="$"
                                            className="form-control input-sm mr-3"
                                            style={{minWidth: '50px'}}
                                            value={
                                                owedTotal(apiInfo).creditOwed
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {/* CASH CUT */}
                        Cash Cut:
                        <div className="d-flex justify-content-around mb-3">
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Total Sales
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
                                        Number(form.hundreds * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100 +
                                        (Number(form.penniesRoll * 50) +
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
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
                                    Expected
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={
                                        owedTotal(apiInfo).cashOwed +
                                        getPipoTotal(apiInfo)
                                    }
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Difference
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
                                            Number(form.nickelsRoll * 5 * 40) +
                                            Number(form.dimesRoll * 10 * 50) +
                                            Number(
                                                form.quartersRoll * 25 * 40
                                            )) /
                                            100 -
                                        owedTotal(apiInfo).cashOwed +
                                        getPipoTotal(apiInfo)
                                    ).toFixed(2)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row p-2 justify-content-around">
                        {/* Comentarios */}
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
                                style={{minWidth: '50px', height: '12rem'}}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        comentaries: e.target.value
                                    })
                                }
                                value={form.comentaries}
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
                                        value={actionButton}
                                        onClick={() => submit()}
                                    />
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            <ReactLoading
                style={{
                    display: cargando ? 'block' : 'none',
                    position: 'absolute',
                    zIndex: '9999',
                    top: '30%',
                    left: '50%',
                    height: '150px',
                    width: '150px',
                    color: '#D11F1F'
                }}
                color="#D11F1F"
                width="300px"
                type="spinningBubbles"
                height="100px"
            />
        </>
    );
};

export default ModalDetailsCashOut;
