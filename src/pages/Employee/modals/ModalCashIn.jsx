/* eslint-disable indent */
import React, {useState, useEffect} from 'react';

import {Modal} from 'react-bootstrap';
import './modalDetailsStyles.scss';
import CurrencyFormat from 'react-currency-format';
import {useSelector, useDispatch} from 'react-redux';
import {addCashInService} from '@app/services/';
import {
    ListBox,
    processListBoxDragAndDrop
} from '@progress/kendo-react-listbox';
import {getCashInAction} from '@app/store/reducers/cashInDucks';
import {getToday} from '@app/services/utils';

const ModalCashIn = ({onHide, show, idRow, action, user, employees}) => {
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

const BodyInfo = ({idRow, action, user, employees, onHide}) => {
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
        idEmployee: user.id
    });
    const dispatch = useDispatch();
    const cashIn = useSelector((store) => store.cashIn);
    const [actionButton, setActionButton] = useState();
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
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

    // LISTBOX DRAGANDDROP
    const [state, setState] = React.useState({
        notDiscontinued: [],
        discontinued: [],
        draggedItem: {}
    });
    useEffect(() => {
        employees = employees.map((employee) => {
            return {...employee, Discontinued: false};
        });
        employees.push({
            idEmployee: 111111111111111,
            name: 'Drop here the employee',
            Discontinued: true
        });
        setState({
            notDiscontinued: employees.filter(
                (product) => !product.Discontinued
            ),
            discontinued: employees.filter((product) => product.Discontinued),
            draggedItem: {}
        });
    }, []);
    const handleDragStart = (e) => {
        setState({...state, draggedItem: e.dataItem});
    };

    const handleDrop = (e) => {
        const result = processListBoxDragAndDrop(
            state.notDiscontinued,
            state.discontinued,
            state.draggedItem,
            e.dataItem,
            'idEmployee'
        );
        setState({
            ...state,
            notDiscontinued: result.listBoxOneData,
            discontinued: result.listBoxTwoData
        });
    };
    const addCashIn = async () => {
        try {
            const request = form;
            request.employees = state.discontinued;
            const response = await addCashInService(request);
            if (response.message === 'existentEmployees') {
                setError(
                    `The followewing employees are already captured: ${response.existentsEmployees.join(
                        ', '
                    )}`
                );
            } else {
                dispatch(getCashInAction('reload'));
                onHide();
            }
        } catch (err) {
            console.log(err);
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
    return (
        <>
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
                                value={form.hundreads * 100}
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
                                    value={(
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
                                    value={(
                                        Number(form.ones) +
                                        Number(form.twos * 2) +
                                        Number(form.fives * 5) +
                                        Number(form.tens * 10) +
                                        Number(form.twenties * 20) +
                                        Number(form.fifties * 50) +
                                        Number(form.hundreads * 100) +
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
                            <span style={{width: '100%', textAlign: 'center'}}>
                                Employees
                            </span>
                            <ListBox
                                data={state.notDiscontinued}
                                textField="name"
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                            />
                            <ListBox
                                data={state.discontinued}
                                textField="name"
                                style={{
                                    marginLeft: '12px'
                                }}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                            />
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
        </>
    );
};

export default React.memo(ModalCashIn);
React.memo(BodyInfo);
