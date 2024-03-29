/* eslint-disable indent */
import React, {useState, useEffect} from 'react';

import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {useSelector, useDispatch} from 'react-redux';
import {
    addCashInService,
    getCashRegisterStartup,
    getRestaurantByLevel,
    getUsersByRestaurant,
    getDrawerToCashIn,
    getCashOutByEmployeeAndDate
} from '@app/services/';
import BlockUi from 'react-block-ui';

import {getCashInAction} from '@app/store/reducers/cashInDucks';
import {currencyFormat, getToday} from '@app/services/utils';

const ModalCashIn = ({onHide, show, idRow, action, user, employees}) => {
    console.log(employees);

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
                <BodyInfo
                    idRow={idRow}
                    action={action}
                    user={user}
                    employees={employees}
                    onHide={onHide}
                />
            </Modal.Body>
        </Modal>
    );
};

const BodyInfo = ({idRow, action, onHide}) => {
    const [block, setBlock] = useState(false);
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
        hundreads: 0,
        comentaries: '',
        date: '',
        drawer: 'empty',
        employee: 'empty'
    });
    const [dateState, setDateState] = useState(getToday());
    const dispatch = useDispatch();
    const cashIn = useSelector((store) => store.cashIn);
    const [actionButton, setActionButton] = useState();
    const [canceledList, setCanceledList] = useState();
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const [employees, setEmployees] = useState([]);

    // obtener empleados por rol y restaruant
    useEffect(() => {
        (async () => {
            try {
                const resRestaurant = await getRestaurantByLevel();
                if (
                    localStorage.getItem('role') === 'Cash Manager' ||
                    localStorage.getItem('role') === 'Cash Manager Assistant'
                ) {
                    if (resRestaurant.length === 1) {
                        setEmployees(
                            await getUsersByRestaurant(
                                resRestaurant[0].idRestaurant
                            )
                        );
                    }
                }
                if (localStorage.getItem('role') === 'Cash Employee') {
                    console.log('hi');
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // CODIGO PARA LLENAR FORMULARIO EN CASO DE TENER UN CANCELADO
    useEffect(() => {
        // vaya a la api y traiga la fecha actual y rellenar los campos
        (async () => {
            try {
                await getCashOutByEmployeeAndDate(dateState);
            } catch (err) {
                alert(err.response.data.message);
                console.log(err.response.data.message);
                onHide();
            }
        })();
    }, [dateState]);
    // TERMINA CODIGO PARA LLENAR FORMULARIO EN CASO DE TENER UN CANCELADO
    useEffect(() => {
        const filtered = cashIn.details.find((element) => element.id === idRow);
        if (filtered) {
            setForm({
                employees: [],
                pennies: filtered.pennies,
                nickels: filtered.nickels,
                dimes: filtered.dimes,
                quarters: filtered.quarters,
                penniesRoll: filtered.penniesRoll,
                nickelsRoll: filtered.nickelsRoll,
                dimesRoll: filtered.dimesRoll,
                quartersRoll: filtered.quartersRoll,
                ones: filtered.ones,
                twos: filtered.twos,
                fives: filtered.fives,
                tens: filtered.tens,
                twenties: filtered.twenties,
                fifties: filtered.fifties,
                hundreads: filtered.hundreads,
                comentaries: filtered.comentaries,
                date: filtered.date
            });
        } else {
            // const today = new Date();
            setForm({...form, date: getToday()});
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

    const addCashIn = async () => {
        try {
            const request = form;
            /* request.employees = state.discontinued; */
            console.log(form);
            if (form.employee === 'empty' || form.drawer === 'empty') {
                setError(`Employee or drawer fields can't be empty`);
                return;
            }
            setBlock(true);
            const response = await addCashInService(request);
            setBlock(false);
            if (response.message === 'existentEmployees') {
                setError(
                    `The following employees are already captured: ${response.existentsEmployees.join(
                        ', '
                    )}`
                );
            } else {
                dispatch(getCashInAction('reload'));
                onHide();
            }
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
            setBlock(false);
            onHide();
        }
        console.log('click en add');
    };
    const submit = () => {
        switch (action) {
            case 'add':
                addCashIn();
                break;
            default:
                console.log('default');
                break;
        }
    };
    const getCanceledCashIns = async (date) => {
        const param = `?startDate=${date}&endDate=${date}&status=Rejected&employee=all`;
        const list = await getCashRegisterStartup(param);
        setCanceledList(list);
        console.log(list);

        console.log(canceledList);
    };
    useEffect(() => {
        console.log(form);
    }, [form]);
    const fillForm = (element) => {
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
            hundreads,
            comentaries,
            employee,
            drawer
        } = element;
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
            hundreads,
            comentaries,
            employee,
            drawer
        });
        setCanceledList();
    };
    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                {canceledList ? (
                    <table className="table table-light">
                        <tr>
                            <th>Name</th>
                            <th>Coins Total</th>
                            <th>Rolls Total</th>
                            <th>Bills Total</th>
                            <th>Total</th>
                            <th>Select</th>
                        </tr>
                        {canceledList.map((element) => (
                            <tr>
                                <td>{element.User.name}</td>
                                <td>
                                    {currencyFormat(
                                        (element.pennies +
                                            element.nickels * 5 +
                                            element.dimes * 10 +
                                            element.quarters * 25) /
                                            100
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        (element.penniesRoll * 50 +
                                            element.nickelsRoll * 5 * 40 +
                                            element.dimesRoll * 10 * 50 +
                                            element.quartersRoll * 25 * 40) /
                                            100
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        element.ones +
                                            element.twos * 2 +
                                            element.fives * 5 +
                                            element.tens * 10 +
                                            element.twenties * 20 +
                                            element.fifties * 50 +
                                            element.hundreads * 20
                                    )}
                                </td>
                                <td>
                                    {currencyFormat(
                                        (element.pennies +
                                            element.nickels * 5 +
                                            element.dimes * 10 +
                                            element.quarters * 25 +
                                            element.penniesRoll * 50 +
                                            element.nickelsRoll * 5 * 40 +
                                            element.dimesRoll * 10 * 50 +
                                            element.quartersRoll * 25 * 40) /
                                            100 +
                                            element.ones +
                                            element.twos * 2 +
                                            element.fives * 5 +
                                            element.tens * 10 +
                                            element.twenties * 20 +
                                            element.fifties * 50 +
                                            element.hundreads * 20
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => fillForm(element)}
                                    >
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                ) : (
                    <div className="card-body">
                        <div className="d-flex justify-content-end">
                            <div className="d-flex align-items-center">
                                <span
                                    className="input-group-text"
                                    style={{minWidth: '50px'}}
                                >
                                    Date
                                </span>
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
                                    value={form.date}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        getCanceledCashIns(dateState)
                                    }
                                >
                                    Fix canceled
                                </button>
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
                                                (form.nickelsRoll * 5 * 40) /
                                                    100
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
                                                (form.quartersRoll * 25 * 40) /
                                                    100
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
                                        value={Number(form.fives * 5).toFixed(
                                            2
                                        )}
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
                                        value={Number(form.tens * 10).toFixed(
                                            2
                                        )}
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
                                        value={Number(
                                            form.twenties * 20
                                        ).toFixed(2)}
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
                                        value={Number(
                                            form.fifties * 50
                                        ).toFixed(2)}
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
                                                hundreads: e.target.value
                                            })
                                        }
                                        value={form.hundreads}
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
                                        value={Number(
                                            form.hundreads * 100
                                        ).toFixed(2)}
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
                                                    Number(
                                                        form.quarters * 25
                                                    )) /
                                                    100 +
                                                    (Number(
                                                        form.penniesRoll * 50
                                                    ) +
                                                        Number(
                                                            form.nickelsRoll *
                                                                5 *
                                                                40
                                                        ) +
                                                        Number(
                                                            form.dimesRoll *
                                                                10 *
                                                                50
                                                        ) +
                                                        Number(
                                                            form.quartersRoll *
                                                                25 *
                                                                40
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
                                                    Number(form.hundreads * 100)
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
                                                    Number(
                                                        form.hundreads * 100
                                                    ) +
                                                    (Number(form.pennies) +
                                                        Number(
                                                            form.nickels * 5
                                                        ) +
                                                        Number(
                                                            form.dimes * 10
                                                        ) +
                                                        Number(
                                                            form.quarters * 25
                                                        )) /
                                                        100 +
                                                    (Number(
                                                        form.penniesRoll * 50
                                                    ) +
                                                        Number(
                                                            form.nickelsRoll *
                                                                5 *
                                                                40
                                                        ) +
                                                        Number(
                                                            form.dimesRoll *
                                                                10 *
                                                                50
                                                        ) +
                                                        Number(
                                                            form.quartersRoll *
                                                                25 *
                                                                40
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
                                        defaultValue={form.comentaries}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                comentaries: e.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            {!idRow ? (
                                <div className="d-flex flex-wrap justify-content-around">
                                    <span
                                        style={{
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Select Employee
                                    </span>
                                    <select
                                        className="form-control mr-3"
                                        style={{minWidth: '100px'}}
                                        onChange={async (e) =>
                                            setForm({
                                                ...form,
                                                employee: e.target.value
                                            })
                                        }
                                    >
                                        <option selected value="empty">
                                            Select a value
                                        </option>
                                        {employees.map((employee) => (
                                            <option value={employee.idEmployee}>
                                                {employee.name}
                                            </option>
                                        ))}
                                    </select>

                                    <span
                                        style={{
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Select Drawer
                                    </span>
                                    <select
                                        id="drawer"
                                        name="drawer"
                                        className="form-control mr-3"
                                        style={{minWidth: '100px'}}
                                        onChange={async (e) => {
                                            const drawerInfo =
                                                await getDrawerToCashIn(
                                                    e.target.value
                                                );
                                            console.log(drawerInfo);
                                            if (drawerInfo !== 'Empty Drawer') {
                                                setForm({
                                                    ...form,
                                                    drawer: e.target.value,
                                                    ...drawerInfo,
                                                    hundreads:
                                                        drawerInfo.hundreds,
                                                    date: form.date
                                                });
                                            } else {
                                                setForm({
                                                    ...form,
                                                    drawer: e.target.value
                                                });
                                            }
                                        }}
                                    >
                                        <option value="empty">
                                            Select a drawer
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            ) : null}
                        </div>

                        <p className="text-danger"> {error || null}</p>
                        {!idRow ? (
                            <>
                                {' '}
                                <div>
                                    <input
                                        type="submit"
                                        className="btn btn-dark btn-lg"
                                        value={actionButton}
                                        onClick={() => submit()}
                                    />
                                </div>
                            </>
                        ) : null}
                    </div>
                )}
            </BlockUi>
        </>
    );
};

export default React.memo(ModalCashIn);
React.memo(BodyInfo);
