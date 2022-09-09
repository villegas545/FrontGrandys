/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React from 'react';
import {useTable, usePagination} from 'react-table';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import styled from 'styled-components';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Table({columns, data, deleteItem, updateItem}) {
    // notificacion tostify
    const notify = () =>
        toast('Successfuly deleted!!!!', {
            theme: 'colored',
            type: 'error',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

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
    // Confirmacion de accion
    const confirm = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteItem(id);
                        notify();
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    // Render the UI for your table
    const [role, setRole] = React.useState('');
    React.useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);

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
                            {role === 'Admin' || role === 'Manager' ? (
                                <>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </>
                            ) : null}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
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
                                {role === 'Admin' || role === 'Manager' ? (
                                    <>
                                        <td>
                                            <input
                                                type="submit"
                                                value="Update"
                                                className="btn btn-warning"
                                                onClick={() => {
                                                    updateItem(row.original.id);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="submit"
                                                value="Delete"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    confirm(row.original.id)
                                                }
                                            />
                                        </td>
                                    </>
                                ) : null}
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
            <ToastContainer />
        </>
    );
}
export default Table;
