/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading';

import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {useSelector} from 'react-redux';
import {addCashOutService, cashOutApiInfo} from '@app/services/';

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
    const [cargando, setCargando] = React.useState(false);
    useEffect(() => {
        (async () => {
            setCargando(true);
            const apiInfo = await cashOutApiInfo('2022-10-04');
            setCargando(false);
            console.log(apiInfo);
        })();
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
    return (
        <>
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <div>
                        Date:{' '}
                        <input
                            type="date"
                            className="form-control mr-3"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    date: e.target.value
                                })
                            }
                            value={form.date}
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
                            <input type="text" className="form-control" />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.pennies}
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
                            <input type="text" className="form-control" />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.nickels * 5}
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
                            <input type="text" className="form-control" />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.dimes * 10}
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
                            <input type="text" className="form-control" />{' '}
                        </div>
                        <div>
                            {' '}
                            <CurrencyFormat
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                className="form-control"
                                value={form.quarters * 25}
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
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100)
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
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100
                                    }
                                    disabled
                                />
                            </div>
                        </div>
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
                                    value={0}
                                    disabled
                                />
                            </div>
                            <div>
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '100px'}}
                                >
                                    Owed
                                </span>
                                <CurrencyFormat
                                    displayType="text"
                                    thousandSeparator
                                    prefix="$"
                                    className="form-control input-sm mr-3"
                                    style={{minWidth: '50px'}}
                                    value={0}
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
                                    value={0}
                                    disabled
                                />
                            </div>
                        </div>
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
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
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
                                        Number(form.ones) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100)
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
                                    value={
                                        Number(form.ones) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100) +
                                        (Number(form.pennies) +
                                            Number(form.nickels * 5) +
                                            Number(form.dimes * 10) +
                                            Number(form.quarters * 25)) /
                                            100
                                    }
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
