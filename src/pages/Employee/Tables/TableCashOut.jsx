/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, {useState,useEffect} from 'react';
import {useTable, usePagination} from 'react-table';
import {toast} from 'react-toastify';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    approveRejectCashRegisterEndups,
    cancelCashRegisterEndups
} from '@app/services';
import {useDispatch} from 'react-redux';
import {getCashOutAction} from '@app/store/reducers/cashOutDucks';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';
import {Link} from 'react-router-dom';
import ModalDrawerInDetails from '@app/pages/Employee/modals/ModalCashOut/ModalDrawerInDetails';
import ModalDrawerOutDetails from '@app/pages/Employee/modals/ModalCashOut/ModalDrawerOutDetails';
import ModalDrawerTotalDetails from '@app/pages/Employee/modals/ModalCashOut/ModalDrawerTotalDetails';

function TableCashOut({columns, data}) {
    // notificacion tostify
    const [modalDrawerIn,setModalDrawerIn]=useState(false)
    const [modalDrawerOut,setModalDrawerOut]=useState(false)
    const [modalDrawerTotal,setModalDrawerTotal]=useState(false)
useEffect(()=>{
    console.log(modalDrawerOut,modalDrawerTotal)
},[])

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
    const actionButton = async (id, action) => {
        dispatch(changeReactLoading(true));
        try {
            switch (action) {
                case 'approve':
                    await approveRejectCashRegisterEndups({
                        idRequestCashRegisterEndups: id,
                        approved: 'Approved'
                    });
                    break;
                case 'reject':
                    await approveRejectCashRegisterEndups({
                        idRequestCashRegisterEndups: id,
                        rejected: 'Rejected'
                    });
                    break;
                case 'cancel':
                    await cancelCashRegisterEndups({
                        idRequestCashRegisterEndups: id
                    });
                    break;
                default:
                    console.log('never');
                    break;
            }
            dispatch(getCashOutAction('reload'));
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
        if (cell.column.Header === 'Drawer In') {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalDrawerIn(true);
                        setIdRow(cell.row.original);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        if (cell.column.Header === 'Drawer Out') {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalDrawerOut(true);
                        setIdRow(cell.row.original);
                    }}
                >
                    {cell.render('Cell')}
                </Link>
            );
        }
        if (
            cell.column.Header === 'Grand Total'
        ) {
            return (
                <Link
                    to="#"
                    onClick={() => {
                        setModalDrawerTotal(true);
                        const drawerTotal={
                            ...cell.row.original,
                            pennies: Number(cell.row.original.totalJson.drawerIn.pennies)+Number(cell.row.original.totalJson.drawerOut.pennies),
                            nickels:Number(cell.row.original.totalJson.drawerIn.nickels)+Number(cell.row.original.totalJson.drawerOut.nickels),
                            dimes:Number(cell.row.original.totalJson.drawerIn.dimes)+Number(cell.row.original.totalJson.drawerOut.dimes),
                            quarters: Number(cell.row.original.totalJson.drawerIn.quarters)+Number(cell.row.original.totalJson.drawerOut.quarters),
                            penniesRoll: Number(cell.row.original.totalJson.drawerIn.penniesRoll)+Number(cell.row.original.totalJson.drawerOut.penniesRoll),
                            nickelsRoll: Number(cell.row.original.totalJson.drawerIn.nickelsRoll)+Number(cell.row.original.totalJson.drawerOut.nickelsRoll),
                            dimesRoll: Number(cell.row.original.totalJson.drawerIn.dimesRoll)+Number(cell.row.original.totalJson.drawerOut.dimesRoll),
                            quartersRoll: Number(cell.row.original.totalJson.drawerIn.quartersRoll)+Number(cell.row.original.totalJson.drawerOut.quartersRoll),
                            ones: Number(cell.row.original.totalJson.drawerIn.ones)+Number(cell.row.original.totalJson.drawerOut.ones),
                            twos: Number(cell.row.original.totalJson.drawerIn.twos)+Number(cell.row.original.totalJson.drawerOut.twos),
                            fives: Number(cell.row.original.totalJson.drawerIn.fives)+Number(cell.row.original.totalJson.drawerOut.fives),
                            tens: Number(cell.row.original.totalJson.drawerIn.tens)+Number(cell.row.original.totalJson.drawerOut.tens),
                            twenties: Number(cell.row.original.totalJson.drawerIn.twenties)+Number(cell.row.original.totalJson.drawerOut.twenties),
                            fifties:Number(cell.row.original.totalJson.drawerIn.fifties)+Number(cell.row.original.totalJson.drawerOut.fifties),
                            hundreds: Number(cell.row.original.totalJson.drawerIn.hundreds)+Number(cell.row.original.totalJson.drawerOut.hundreds),
                            coinsTotal: Number(cell.row.original.totalJson.drawerIn.coinsTotal)+Number(cell.row.original.totalJson.drawerOut.coinsTotal),
                            billsTotal: Number(cell.row.original.totalJson.drawerIn.billsTotal)+Number(cell.row.original.totalJson.drawerOut.billsTotal),
                            commentsDrawerIn:cell.row.original.totalJson.drawerIn.comments,
                            commentsDrawerOut:cell.row.original.totalJson.drawerOut.comments,
                            comments: cell.row.original.comments,
                            date: cell.row.original.date,
                          
                        }
                        console.log(drawerTotal)
                        setIdRow(drawerTotal);
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
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {renderColumn(cell)}
                                        </td>
                                    );
                                })}
                           
                                <td>
                                    {(localStorage.getItem('role') ===
                                        'Cash Manager' ||
                                        localStorage.getItem('role') ===
                                            'Cash Manager Assistant') &&
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
                                        'Cash Manager' &&
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

       
            <ModalDrawerInDetails 
            show={modalDrawerIn}
            onHide={() => setModalDrawerIn(false)}
            idRow={idRow}
            />
            <ModalDrawerOutDetails
             show={modalDrawerOut}
             onHide={() => setModalDrawerOut(false)}
             idRow={idRow}
             />
              <ModalDrawerTotalDetails
             show={modalDrawerTotal}
             onHide={() => setModalDrawerTotal(false)}
             idRow={idRow}
             />
        </>
    );
}
export default TableCashOut;
