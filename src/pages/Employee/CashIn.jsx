import TableCashIn from '@app/components/table/TableCashIn';
import {getCashInAction} from '@app/store/reducers/cashInDucks';
import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import ModalDetailsCashIn from '@app/pages/Employee/modals/ModalDetailsCashIn';

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
const CashIn = ({user}) => {
    const dispatch = useDispatch();
    const cashIn = useSelector((store) => store.cashIn);
    const [modalShow, setModalShow] = React.useState(false);
    console.log(user);
    useEffect(() => {
        dispatch(getCashInAction());
    }, []);
    useEffect(() => {
        console.log(cashIn);
    }, [cashIn]);
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
                            >
                                <option selected>Las Cruces</option>
                                <option>El paso</option>
                                <option>Rejected</option>
                                <option>All</option>
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
                            >
                                <option selected>Elver Galarga</option>
                                <option>Rosa Meleño</option>
                                <option>Alma Marcela Silva de alegria</option>
                                <option>All</option>
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
                            >
                                <option selected>Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>All</option>
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
                            <input type="date" className="form-control mr-3" />
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
                            <input type="date" className="form-control mr-3" />
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
                            />
                        </div>
                    </div>
                    <div>
                        {' '}
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 10%'
                            }}
                        >
                            <span>Cash Total: $00.00</span>{' '}
                            <span>Total Strikes: 00</span>{' '}
                            <input
                                type="submit"
                                value="Open Cash In"
                                className="form-control btn btn-danger btn-xs mr-3 text-md"
                                style={{
                                    minWidth: '40px',
                                    width: '10%',
                                    float: 'right'
                                }}
                                onClick={() => setModalShow(true)}
                            />
                        </div>
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
                    />
                </div>
            </section>
        </>
    );
};

export default CashIn;
