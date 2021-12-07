import React from 'react';
import {useTable} from 'react-table';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import JSPDF from 'jspdf';
// import 'jspdf-autotable';

// const doc = new JSPDF('l', 'pt', 'a0');
// eslint-disable-next-line no-unused-vars

/* import makeData from './makeData'; */

function TableChecks({columns, data, id}) {
    // const referencia = [];

    // referencia[id] = useRef(null);
    // nombre de la variable con arreglo

    // notificacion tostify

    const ordenarFechas = () => {};
    data.sort(function (a, b) {
        try {
            return new Date(a.date) - new Date(b.date);
        } catch {
            return a.date - b.date;
        }
    });
    React.useEffect(() => {
        ordenarFechas();
    }, []);
    /*     console.log(rows2);
    console.log(data); */
    // Use the state and functions returned from useTable to build your UI

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        });

    // Render the UI for your table

    return (
        <>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-danger m-2"
                table={`table-to-xls${id}`}
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as XLS"
            />
            <buttton
                value="Transpose"
                className="btn btn-danger m-2 botontransponer"
            >
                Transpose
            </buttton>
            <table
                id={`table-to-xls${id}`}
                className="table table-hover table-sm table-bordered table-responsive transponertabla"
                {...getTableProps()}
                /* ref={referencia[id]} */
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
