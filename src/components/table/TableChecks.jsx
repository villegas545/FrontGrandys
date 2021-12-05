import React from 'react';
import {useTable} from 'react-table';
import round from 'round';

// eslint-disable-next-line no-unused-vars

/* import makeData from './makeData'; */

function TableChecks({columns, data}) {
    // notificacion tostify

    data.sort(function (a, b) {
        console.log(a.date);
        try {
            return new Date(a.date) - new Date(b.date);
        } catch {
            return a.date - b.date;
        }
    });
    /*     console.log(rows2);
    console.log(data); */
    // Use the state and functions returned from useTable to build your UI
    const nuevo = [];
    data.map((row) => {
        if (typeof row === 'number') {
            row = round(row, 0.01);
        }
        nuevo.push(row);
        console.log(nuevo);
        return row;
    });
    data = nuevo;
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        });

    // Render the UI for your table

    return (
        <>
            <table
                className="table table-hover table-sm table-bordered table-responsive transponertabla"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {' '}
                            {headerGroup.headers.map((column) => (
                                <td
                                    className="font-weight-bold"
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </td>
                            ))}
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
export default TableChecks;
