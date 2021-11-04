import React from 'react';
import {useTable} from 'react-table';

/* import makeData from './makeData'; */

function Table({columns, data, deleteItem, updateItem}) {
    // Use the state and functions returned from useTable to build your UI
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        });

    // Render the UI for your table
    return (
        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
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
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
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
                                    onClick={() => updateItem(row.original.id)}
                                />
                            </td>
                            <td>
                                <input
                                    type="submit"
                                    value="Delete"
                                    className="btn btn-danger"
                                    onClick={() => deleteItem(row.original.id)}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
export default Table;
