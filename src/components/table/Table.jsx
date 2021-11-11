import React from 'react';
import {useTable} from 'react-table';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

/* import makeData from './makeData'; */

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
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        });
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
    return (
        <>
            <table className="table mx-5" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>#</th>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
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
                                        onClick={() => confirm(row.original.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
}
export default Table;
