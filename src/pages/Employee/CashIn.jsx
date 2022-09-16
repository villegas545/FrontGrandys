/* eslint-disable indent */
import TableCashIn from '@app/pages/Employee/Tables/TableCashIn';
import {getCashInAction} from '@app/store/reducers/cashInDucks';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import ModalDetailsCashIn from '@app/pages/Employee/modals/ModalDetailsCashIn';
import {getRestaurantByLevel, getUsersByRestaurant} from '@app/services/';
import {currencyFormat} from '@app/services/utils';
import {processListBoxDragAndDrop} from '@progress/kendo-react-listbox';

const columns = [
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Restaurant',
        accessor: 'restaurant'
    },
    {
        Header: 'Name',
        accessor: 'user'
    },
    {
        Header: 'Coins Total',
        accessor: 'coinsTotal'
    },
    {
        Header: 'Bills Total',
        accessor: 'billsTotal'
    },
    {
        Header: 'Grand Total',
        accessor: 'grandTotal'
    },
    {
        Header: 'Status',
        accessor: 'status'
    }
];
const CashIn = () => {
    const dispatch = useDispatch();
    const cashIn = useSelector((store) => store.cashIn);
    const [modalShow, setModalShow] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [employees, setEmployees] = useState([]);
    const user = useSelector((store) => store.localVariables);
    // eslint-disable-next-line no-unused-vars
    const [formSearch, setFormSearch] = useState({
        restaurant: '',
        employee: '',
        status: '',
        startDate: '',
        endDate: ''
    });
    const [state, setState] = React.useState({
        notDiscontinued: [],
        discontinued: [],
        draggedItem: {}
    });
    useEffect(() => {
        (async () => {
            // dispatch(getCashInAction());
            // setRestaurants(await getRestaurantByLevel());
            const resRestaurant = await getRestaurantByLevel();
            setRestaurants(resRestaurant);
            if (
                localStorage.getItem('role') === 'Manager' ||
                localStorage.getItem('role') === 'Manager Asistent'
            ) {
                if (resRestaurant.length === 1) {
                    let resEmployees = await getUsersByRestaurant(
                        resRestaurant[0].idRestaurant
                    );
                    setEmployees(resEmployees);
                    resEmployees = resEmployees.map((employee) => {
                        return {...employee, Discontinued: false};
                    });
                    resEmployees.push({
                        idEmployee: 111111111111111,
                        name: 'Drop here the employee',
                        Discontinued: true
                    });
                    setState({
                        notDiscontinued: resEmployees.filter(
                            (product) => !product.Discontinued
                        ),
                        discontinued: resEmployees.filter(
                            (product) => product.Discontinued
                        ),
                        draggedItem: {}
                    });
                }
            }
        })();
    }, []);

    useEffect(() => {
        console.log(cashIn);
    }, [cashIn]);
    const search = async () => {
        dispatch(getCashInAction(formSearch));
    };
    // LIST DROPANDDRAG

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
        /*     console.log(result.listBoxOneData);
        if (
            !result.listBoxTwoData.some(
                (element) => element.idEmployee === '111111111111111'
            )
        ) {
            result.listBoxTwoData.push({
                idEmployee: 111111111111111,
                name: 'Drop Here the employee',
                Discontinued: true
            });
        } */
        setState({
            ...state,
            notDiscontinued: result.listBoxOneData,
            discontinued: result.listBoxTwoData
        });
    };
    return (
        <>
            <section className="content-header mt-3">
                <div className="container-fluid">
                    <div
                        className="input-group mb-3"
                        style={{display: 'flex', flexFlow: 'row wrap'}}
                    >
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Restaurant
                            </span>
                            <select
                                className="form-control mr-3"
                                style={{minWidth: '100px'}}
                                onChange={async (e) => {
                                    setEmployees(
                                        await getUsersByRestaurant(
                                            e.target.value
                                        )
                                    );
                                    setFormSearch({
                                        ...formSearch,
                                        restaurant: e.target.value
                                    });
                                }}
                            >
                                {restaurants.length > 1 ? (
                                    <option selected>Select a value</option>
                                ) : null}
                                {restaurants.map((restaurant) => (
                                    <option value={restaurant.idRestaurant}>
                                        {restaurant.restaurantName}
                                    </option>
                                ))}
                                {localStorage.getItem('role') === 'Admin' ? (
                                    <option value="all">All</option>
                                ) : null}
                            </select>
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                User
                            </span>
                            <select
                                className="form-control mr-3"
                                style={{minWidth: '100px'}}
                                onChange={async (e) =>
                                    setFormSearch({
                                        ...formSearch,
                                        employee: e.target.value
                                    })
                                }
                            >
                                <option selected>Select a value</option>
                                {employees.map((employee) => (
                                    <option value={employee.idEmployee}>
                                        {employee.name}
                                    </option>
                                ))}
                                {localStorage.getItem('role') !== 'Employee' ? (
                                    <option value="all">All</option>
                                ) : null}
                            </select>
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Status
                            </span>
                            <select
                                className="form-control mr-3"
                                style={{minWidth: '100px'}}
                                onChange={async (e) =>
                                    setFormSearch({
                                        ...formSearch,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option selected>Select a value</option>
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Cancelled</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            {' '}
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Start Date
                            </span>
                            <input
                                type="date"
                                className="form-control mr-3"
                                onChange={async (e) =>
                                    setFormSearch({
                                        ...formSearch,
                                        startDate: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 10%'
                            }}
                        >
                            {' '}
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                End Date
                            </span>
                            <input
                                type="date"
                                className="form-control mr-3"
                                onChange={async (e) =>
                                    setFormSearch({
                                        ...formSearch,
                                        endDate: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 10%'
                            }}
                        >
                            {' '}
                            <input
                                type="submit"
                                value="Search"
                                className="form-control btn btn-danger btn-xs mr-3 text-lg"
                                style={{minWidth: '80px'}}
                                onClick={() => search()}
                            />
                        </div>
                    </div>

                    <div
                        className="d-flex justify-content-end align-items-md-center"
                        /*      style={{
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            flex: '1 10%'
                        }} */
                    >
                        <span>
                            <b>
                                {' '}
                                Cash Total: {currencyFormat(cashIn.cashTotal)}
                            </b>
                        </span>{' '}
                        {localStorage.getItem('role') === 'Manager' ||
                        localStorage.getItem('role') === 'Manager Assistant' ? (
                            <input
                                type="submit"
                                value="Open Cash In"
                                className="form-control btn btn-danger btn-xs mr-3 text-md ml-5"
                                style={{
                                    minWidth: '40px',
                                    width: '20%',
                                    float: 'right'
                                }}
                                onClick={() => setModalShow(true)}
                            />
                        ) : null}
                    </div>
                    <TableCashIn columns={columns} data={cashIn.tableInfo} />
                    {
                        // Este modal es para abrirlo desde el opencash in, desde el boton rojo
                    }
                    <ModalDetailsCashIn
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        action="add"
                        user={user}
                        employees={employees}
                        state={state}
                        handleDragStart={handleDragStart}
                        handleDrop={handleDrop}
                    />
                </div>
            </section>
        </>
    );
};

export default React.memo(CashIn);
