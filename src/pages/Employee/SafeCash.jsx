/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
import TableSafeCash from '@app/pages/Employee/Tables/TableSafeCash';
import {getSafeCashAction} from '@app/store/reducers/safeCashDucks';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import ModalDetailsSafeCash from '@app/pages/Employee/modals/ModalDetailsSafeCash';
import {getRestaurantByLevel, getManagersByRestaurant} from '@app/services/';
import {getToday} from '@app/services/utils';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';

const columns = [
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Restaurant',
        accessor: 'Restaurant.name'
    },
    {
        Header: 'Created',
        accessor: 'User.name'
    },
    {
        Header: 'Received',
        accessor: 'received'
    },
    {
        Header: 'Cash Ins',
        accessor: 'jsonValues.wizardCashIns.grandTotalCurrency'
    },
    {
        Header: 'Cash Outs DI',
        accessor: 'jsonValues.wizardCashOuts.drawerIn.grandTotalCurrency'
    },
    {
        Header: 'Cash Outs DO',
        accessor: 'jsonValues.wizardCashOuts.drawerOut.grandTotalCurrency'
    },
    {
        Header: 'Cash Outs Total',
        accessor: 'jsonValues.wizardCashOuts.cashOutSummary'
    },
    {
        Header: 'Vouchers In',
        accessor: 'jsonValues.wizardVouchers.vouchersIns.grandTotalCurrency'
    },
    {
        Header: 'Vouchers Out',
        accessor: 'jsonValues.wizardVouchers.vouchersOuts.grandTotalCurrency'
    },
    {
        Header: 'Vouchers S2D',
        accessor:
            'jsonValues.wizardVouchers.vouchersSafeToDrawer.grandTotalCurrency'
    },
    {
        Header: 'Vouchers D2S',
        accessor:
            'jsonValues.wizardVouchers.vouchersDrawerToSafe.grandTotalCurrency'
    },
    {
        Header: (
            <label title="(VouchersIn + VouchersD2S) - (VouchersOut + VouchersS2D)">
                Vouchers Total
            </label>
        ),
        accessor: 'jsonValues.wizardVouchers.grandTotalCurrency'
    },
    {
        Header: (
            <label title="Ammount supposed to be into drawers">
                Expected Drawer
            </label>
        ),
        accessor: 'jsonValues.wizardExpected.grandTotalCurrency'
    },
    {
        Header: (
            <label title="Ammount supposed to be into Safecash">
                Expected Safe Cash
            </label>
        ),
        accessor: 'jsonValues.wizardTotalExpected.expected.grandTotalCurrency'
    },
    {
        Header: 'Expected Total',
        accessor:
            'jsonValues.wizardExpectedGrandTotal.expectedGrandTotalCurrency'
    },
    {
        Header: (
            <label title="Real ammount values in drawers">Real Drawers</label>
        ),
        accessor: 'jsonValues.wizardSafeDrawerIn.grandTotalCurrency'
    },
    {
        Header: (
            <label title="Real values captured by the manager in the safecash">
                Real Safe Cash
            </label>
        ),
        accessor: 'jsonValues.wizardSafeDrawerOut.real.grandTotalCurrency'
    },
    {
        Header: 'Real Total',
        accessor: 'jsonValues.wizardRealTotal.realGrandTotalCurrency'
    },
    {
        Header: 'Diference Total',
        accessor:
            'jsonValues.wizardTotalDifference.grandTotalDifferenceCurrency'
    },
    {
        Header: 'Status',
        accessor: 'status'
    }
];
const SafeCash = () => {
    const dispatch = useDispatch();
    const safeCash = useSelector((store) => store.safeCash);
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
                    console.log('wipi');
                    if (resRestaurant.length === 1) {
                        setEmployees(
                            await getManagersByRestaurant(
                                resRestaurant[0].idRestaurant
                            )
                        );
                    }
                }
            } catch (err) {
                console.log(err);
            }
            dispatch(changeReactLoading(false));
        })();
    }, []);

    useEffect(() => {
        console.log(safeCash);
    }, [safeCash]);
    const search = async () => {
        dispatch(getSafeCashAction(formSearch));
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
                                            await getManagersByRestaurant(
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

                    <div className="d-flex justify-content-end align-items-md-center">
                        {localStorage.getItem('role') === 'Cash Manager' ||
                        localStorage.getItem('role') ===
                            'Cash Manager Assistant' ? (
                            <>
                                <input
                                    type="submit"
                                    value="Open Safe Cash"
                                    className="form-control btn btn-danger btn-xs mr-3 text-md ml-5"
                                    style={{
                                        minWidth: '40px',
                                        width: '20%',
                                        float: 'right'
                                    }}
                                    onClick={() => setModalShow(true)}
                                />
                            </>
                        ) : null}
                    </div>
                    {safeCash.data ? (
                        <TableSafeCash columns={columns} data={safeCash.data} />
                    ) : null}
                    {
                        // Este modal es para abrirlo desde el opencash in, desde el boton rojo
                    }
                    <ModalDetailsSafeCash
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

export default React.memo(SafeCash);
