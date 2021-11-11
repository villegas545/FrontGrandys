import React from 'react';
import {useTable} from 'react-table';

/* import makeData from './makeData'; */

function TableChecks({columns, data}) {
    // notificacion tostify

    // Use the state and functions returned from useTable to build your UI
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        });

    // Render the UI for your table
    return (
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
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
export default TableChecks;
