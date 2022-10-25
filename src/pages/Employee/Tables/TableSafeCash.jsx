/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, {useState} from 'react';
import {useTable, usePagination} from 'react-table';
import { toast} from 'react-toastify';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ModalDetailsCashIn from '@app/pages/Employee/modals/ModalDetailsCashIn';
import {
    approveRejectSafeCash,
    cancelSafeCash
} from '@app/services';
import { useDispatch} from 'react-redux';
import {getSafeCashAction} from '@app/store/reducers/safeCashDucks';


function TableSafeCash({columns, data}) {
    // notificacion tostify
    const [modalShow, setModalShow] = React.useState(false);
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
    const [userSelected, setUserSelected] = useState('');
    const actionButton = async (id, action) => {
        switch (action) {
        case 'approve':
       
            await approveRejectSafeCash({
                idRequestSafeCash:id,
                approved:"Approved"
            })
            break;
        case 'reject':
            await approveRejectSafeCash({
                idRequestSafeCash:id,
                rejected:"Rejected"
            })
            break;
        case 'cancel':
            await cancelSafeCash({idRequestSafeCash:id})
            break;
        default:
            console.log('never');
            break;
        }
        dispatch(getSafeCashAction("reload"))
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
                            <th>Details</th>
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
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                                <td>
                                    <input
                                        type="submit"
                                        value="Details..."
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setModalShow(true);
                                            setIdRow(row.original.id);
                                            setUserSelected(row.original);
                                        }}
                                    />
                                </td>
                                <td>
                                    { (localStorage.getItem("role")==="Cash Manager Assistant" || localStorage.getItem("role")==="Cash Manager") && row.original.status==="Pending" ?
                                        <><input
                                            type="submit"
                                            value="Approve"
                                            className="btn btn-success"
                                            onClick={() =>
                                                confirm(row.original.id, 'approve')
                                            }
                                        />
                                        <input
                                            type="submit"
                                            value="Reject"
                                            className="btn btn-warning ml-2"
                                            onClick={() =>
                                                confirm(row.original.id, 'reject')
                                            }
                                        />
                                        </>
                                        :null}
                                    { localStorage.getItem("role")==="Manager" && row.original.status==="Approved" ?
                                        <>
                                            <input
                                                type="submit"
                                                value="Cancel"
                                                className="btn btn-danger ml-2"
                                                onClick={() =>
                                                    confirm(row.original.id, 'cancel')
                                                }
                                            />
                                        </>:null}
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
            {
                // Este modal es para abrirlo desde el details dentro de la tabla
            }
            <ModalDetailsCashIn
                show={modalShow}
                onHide={() => setModalShow(false)}
                idRow={idRow}
                user={userSelected}
            />
        </>
    );
}
export default TableSafeCash;
