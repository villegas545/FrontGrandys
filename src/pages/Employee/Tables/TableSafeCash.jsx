/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, {useState} from 'react';
import {useTable, usePagination} from 'react-table';
import {toast} from 'react-toastify';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {approveRejectSafeCash, cancelSafeCash} from '@app/services';
import {useDispatch} from 'react-redux';
import {getSafeCashAction} from '@app/store/reducers/safeCashDucks';
import {Link} from 'react-router-dom';
import ModalReceivedCreatedInfo from '@app/pages/Employee/modals/ModalReceivedCreatedInfo';
import ModalVouchers from '@app/pages/Employee/modals/ModalVouchers';
import ModalTotals from '@app/pages/Employee/modals/wizard/ModalTotals';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';

function TableSafeCash({columns, data}) {
    // notificacion tostify
    const [modalCreatedInfoShow, setModalCreatedInfoShow] =
        React.useState(false);
    const [modalVouchers, setModalVouchers] = useState(false);
    const [modalTotals, setModalTotals] = useState(false);
    const [createdReceived, setCreatedReceived] = useState();
    const dispatch = useDispatch();

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0}
        },
        usePagination
    );
    const [idRow, setIdRow] = useState();
    const [vouchers, setVouchers] = useState();
    const [totals, setTotals] = useState();
    const actionButton = async (id, action) => {
        dispatch(changeReactLoading(true));

        try {
            const hoy = new Date();
            switch (action) {
                case 'approve':
                    await approveRejectSafeCash({
                        receivedHour: `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`,
                        idRequestSafeCash: id,
                        approved: 'Approved'
                    });
                    break;
                case 'reject':
                    await approveRejectSafeCash({
                        receivedHour: `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`,
                        idRequestSafeCash: id,
                        rejected: 'Rejected'
                    });
                    break;
                case 'cancel':
                    await cancelSafeCash({
                        idRequestSafeCash: id,
                        receivedHour: `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`
                    });
                    break;
                default:
                    console.log('never');
                    break;
            }
            dispatch(getSafeCashAction('reload'));
        } catch (err) {
            console.log(err);
        }
        dispatch(changeReactLoading(false));
    };
    // Confirmacion de accion
    const confirm = (id, action) => {
        confirmAlert({
            title: `Confirm to ${action}`,
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        actionButton(id, action);
                        toast.success('Success!');
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };
    const renderColumn = (cell) => {
        if (cell.column.Header === 'Created') {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalCreatedInfoShow(true);
                        setCreatedReceived('Created');
                        setIdRow(cell);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        if (cell.column.Header === 'Received') {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalCreatedInfoShow(true);
                        setCreatedReceived('Received');
                        setIdRow(cell);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        if (
            cell.column.Header === 'Vouchers In' ||
            cell.column.Header === 'Vouchers Out'
        ) {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalVouchers(true);
                        setVouchers(cell.row.original.vouchers);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        if (cell.column.Header === 'Grand Total') {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalTotals(true);
                        setTotals(cell.row.original);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        return cell.render('Cell');
    };
    // Render the UI for your table
    return (
        <>
            <table
                className="table table-hover table-bordered table-responsive-sm  mx-2"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>#</th>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        console.log(row.original);
                        return (
                            <tr {...row.getRowProps()}>
                                <td>{index + 1}</td>
                                {row.cells.map((cell) => (
                                    <>
                                        <td {...cell.getCellProps()}>
                                            {renderColumn(cell)}
                                        </td>
                                    </>
                                ))}

                                <td>
                                    {(localStorage.getItem('role') ===
                                        'Cash Manager Assistant' ||
                                        localStorage.getItem('role') ===
                                            'Cash Manager') &&
                                    row.original.status === 'Pending' ? (
                                        <>
                                            <input
                                                type="submit"
                                                value="Approve"
                                                className="btn btn-success"
                                                onClick={() =>
                                                    confirm(
                                                        row.original.id,
                                                        'approve'
                                                    )
                                                }
                                            />
                                            <input
                                                type="submit"
                                                value="Reject"
                                                className="btn btn-warning ml-2"
                                                onClick={() =>
                                                    confirm(
                                                        row.original.id,
                                                        'reject'
                                                    )
                                                }
                                            />
                                        </>
                                    ) : null}
                                    {localStorage.getItem('role') ===
                                        'Manager' &&
                                    row.original.status === 'Approved' ? (
                                        <>
                                            <input
                                                type="submit"
                                                value="Cancel"
                                                className="btn btn-danger ml-2"
                                                onClick={() =>
                                                    confirm(
                                                        row.original.id,
                                                        'cancel'
                                                    )
                                                }
                                            />
                                        </>
                                    ) : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination ">
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="btn btn-secondary ml-2"
                >
                    {'<<'}
                </button>{' '}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn btn-secondary ml-2"
                >
                    {'<'}
                </button>{' '}
                <span style={{'margin-top': '5px'}} className="ml-2">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                    className="form-select"
                    style={{'margin-left': '15px'}}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn btn-secondary ml-2"
                >
                    {'>'}
                </button>{' '}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="btn btn-secondary ml-2"
                >
                    {'>>'}
                </button>{' '}
            </div>

            <ModalReceivedCreatedInfo
                show={modalCreatedInfoShow}
                onHide={() => setModalCreatedInfoShow(false)}
                idRow={idRow}
                text={createdReceived}
            />
            <ModalVouchers
                show={modalVouchers}
                onHide={() => setModalVouchers(false)}
                vouchers={vouchers}
            />
            <ModalTotals
                show={modalTotals}
                onHide={() => setModalTotals(false)}
                money={totals}
            />
        </>
    );
}
export default TableSafeCash;
