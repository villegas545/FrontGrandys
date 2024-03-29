/* eslint-disable indent */
import TableCashOut from '@app/pages/Employee/Tables/TableCashOut';
import {getCashOutAction} from '@app/store/reducers/cashOutDucks';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import ModalDetailsCashOut from '@app/pages/Employee/modals/ModalCashOut/WizardComponent';
import {getRestaurantByLevel, getUsersByRestaurant} from '@app/services/';
import {currencyFormat, getToday} from '@app/services/utils';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';

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
        Header: 'Drawer',
        accessor: 'drawer'
    },
    {
        Header: 'Drawer In',
        accessor: 'drawerInCurrency'
    },
    {
        Header: 'Drawer Out',
        accessor: 'drawerOutCurrency'
    },
    {
        Header: 'Grand Total',
        accessor: 'grandTotalCurrency'
    },
    {
        Header: 'PIPO',
        accessor: 'pipoCurrency'
    },
    {
        Header: 'Owed to House',
        accessor: 'owedToHouseCurrency'
    },
    {
        Header: 'Difference',
        accessor: 'differenceCurrency'
    },
    {
        Header: 'Strike',
        accessor: 'strikes'
    },
    {
        Header: 'Status',
        accessor: 'status'
    }
];
const CashOut = () => {
    const dispatch = useDispatch();
    const cashOut = useSelector((store) => store.cashOut);
    const [modalShow, setModalShow] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [employees, setEmployees] = useState([]);
    const user = useSelector((store) => store.localVariables);
    // eslint-disable-next-line no-unused-vars
    const [formSearch, setFormSearch] = useState({
        restaurant: '',
        employee: '',
        status: '',
        startDate: getToday(),
        endDate: getToday()
    });

    useEffect(() => {
        (async () => {
            dispatch(changeReactLoading(true));
            try {
                const resRestaurant = await getRestaurantByLevel();
                setRestaurants(resRestaurant);
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
            dispatch(changeReactLoading(false));
        })();
    }, []);

    useEffect(() => {
        console.log(cashOut);
    }, [cashOut]);
    const search = async () => {
        dispatch(getCashOutAction(formSearch));
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
                                    dispatch(changeReactLoading(true));
                                    try {
                                        setEmployees(
                                            await getUsersByRestaurant(
                                                e.target.value
                                            )
                                        );
                                        setFormSearch({
                                            ...formSearch,
                                            restaurant: e.target.value
                                        });
                                    } catch (err) {
                                        console.log(err);
                                    }
                                    dispatch(changeReactLoading(false));
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
                                {localStorage.getItem('role') ===
                                'Cash Admin' ? (
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
                                {localStorage.getItem('role') !==
                                'Cash Employee' ? (
                                    <option selected>Select a value</option>
                                ) : (
                                    <option>
                                        {localStorage.getItem('user')}
                                    </option>
                                )}
                                {employees.map((employee) => (
                                    <option value={employee.idEmployee}>
                                        {employee.name}
                                    </option>
                                ))}
                                {localStorage.getItem('role') !==
                                'Cash Employee' ? (
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
                                defaultValue={getToday()}
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
                                defaultValue={getToday()}
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
                    <div className="d-flex justify-content-around align-items-md-center">
                        <span>
                            <b>
                                {' '}
                                Cash Total:{' '}
                                {currencyFormat(cashOut.cashTotalTotal)}
                            </b>
                        </span>{' '}
                        <span>
                            <b>
                                {' '}
                                Total PIPO: {currencyFormat(cashOut.pipoTotal)}
                            </b>
                        </span>{' '}
                        <span>
                            <b>
                                {' '}
                                Total owed2House:{' '}
                                {currencyFormat(cashOut.owedTotal)}
                            </b>
                        </span>{' '}
                        <span>
                            <b>
                                {' '}
                                Total Difference:{' '}
                                {currencyFormat(cashOut.difTotal)}
                            </b>
                        </span>{' '}
                        <span>
                            <b> Total Strikes: {cashOut.strikesTotal}</b>
                        </span>{' '}
                        {localStorage.getItem('role') !== 'Cash Admin' ? (
                            <input
                                type="submit"
                                value="Open Cash Out"
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
                    <hr />
                    <TableCashOut columns={columns} data={cashOut.data} />
                    {
                        // Este modal es para abrirlo desde el opencash in, desde el boton rojo
                    }
                    <ModalDetailsCashOut
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        action="add"
                        user={user}
                        employees={employees}
                    />
                </div>
            </section>
        </>
    );
};

export default CashOut;
