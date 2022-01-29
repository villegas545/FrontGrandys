import React from 'react';
/* import round from 'lodash/round'; */
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import JSPDF from 'jspdf';
// import 'jspdf-autotable';

// const doc = new JSPDF('l', 'pt', 'a0');
// eslint-disable-next-line no-unused-vars

/* import makeData from './makeData'; */

function TableReports({data, id}) {
    console.log('estas en tabla checks');
    // const referencia = [];

    // referencia[id] = useRef(null);
    // nombre de la variable con arreglo

    // notificacion tostify

    // ordena fechas en la tabla, pero no toma encuenta la columna total en la ordenacion
    const ordenarFechas = () => {};
    data.sort(function (a, b) {
        try {
            return new Date(a.date) - new Date(b.date);
        } catch {
            return a.date - b.date;
        }
    });
    data.map((item) => {
        item.quarterlyProm1 = Math.trunc(Number(item.quarterlyProm1));
        item.transCount = Math.trunc(Number(item.transCount));
        item.coupons = Math.trunc(Number(item.coupons));
        item.coupQuant = Math.trunc(Number(item.coupQuant));
        item.outOrderQuant = Math.trunc(Number(item.outOrderQuant));
        item.singleSteaks = Math.trunc(Number(item.singleSteaks));
        item.doubleSteaks = Math.trunc(Number(item.doubleSteaks));
        item.nuggetMeal = Math.trunc(Number(item.nuggetMeal));
        item.quarterlyProm1 = Math.trunc(Number(item.quarterlyProm1));
        item.actualLabor = Math.trunc(Number(item.actualLabor));

        return item;
    });

    React.useEffect(() => {
        ordenarFechas();
    }, []);
    /*     console.log(rows2);
    console.log(data); */
    // Use the state and functions returned from useTable to build your UI

    /* const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({
            columns,
            data
        }); */

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
                /*  {...getTableProps()} */
                /* ref={referencia[id]} */
            >
                <thead>
                    {/* {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {' '}
                            {headerGroup.headers.map((column) => (
                                <td
                                   <td className="font-weight-bold" >
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </td>
                            ))}
                        </tr>
                      ))} */}
                    <tr>
                        <td className="font-weight-bold">Date</td>
                        <td className="font-weight-bold">Temp</td>
                        <td className="font-weight-bold">Weather</td>
                        <td className="font-weight-bold">Last Year Sales</td>
                        <td className="font-weight-bold">Projeted Sales</td>
                        <td className="font-weight-bold">Gross Sales</td>
                        <td className="font-weight-bold">Net Sales</td>
                        <td className="font-weight-bold">Net $ales +/-</td>
                        <td className="font-weight-bold">Last Year % +/-</td>
                        <td className="font-weight-bold">Projeted $ales +-</td>
                        <td className="font-weight-bold">
                            % Projected Sales +/-
                        </td>
                        <td className="font-weight-bold">
                            Food Cost Projected
                        </td>
                        <td className="font-weight-bold">Food Cost</td>
                        <td className="font-weight-bold">% Food Cost +/-</td>
                        <td className="font-weight-bold">Sales Tax</td>
                        <td className="font-weight-bold">Tax Exempt</td>
                        <td className="font-weight-bold">Ts Count</td>
                        <td className="font-weight-bold">Averag Trans</td>
                        <td className="font-weight-bold">Coupons ($)</td>
                        <td className="font-weight-bold">Coupons</td>
                        <td className="font-weight-bold">Discounts ($)</td>
                        <td className="font-weight-bold">Discounts</td>
                        <td className="font-weight-bold">Door Dash …</td>
                        <td className="font-weight-bold">($) Door Dash …</td>
                        <td className="font-weight-bold">Single Steaks</td>
                        <td className="font-weight-bold">Double Steaks</td>
                        <td className="font-weight-bold">Nugget Meal</td>
                        <td className="font-weight-bold">Quarterly Promo 1</td>
                        <td className="font-weight-bold">Cash Received</td>
                        <td className="font-weight-bold">Tips</td>
                        <td className="font-weight-bold">Total Deposit</td>
                        <td className="font-weight-bold">Cash</td>
                        <td className="font-weight-bold">Credit Cards</td>
                        <td className="font-weight-bold">Actual Labor Hrs.</td>
                        <td className="font-weight-bold">Truck</td>
                        <td className="font-weight-bold">House Charges</td>
                        <td className="font-weight-bold">Paid Outs</td>
                        <td className="font-weight-bold">Transfer</td>
                        <td className="font-weight-bold">Store CC Pursh</td>
                    </tr>
                </thead>
                {/* <tbody {...getTableBodyProps()}>
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
                </tbody> */}
                {data.map((row) => (
                    <tr>
                        <td>{row.date}</td>
                        <td>{row.weatherTemp}</td>
                        <td>{row.weatherW}</td>
                        <td>${row.lySales}</td>
                        <td>${row.projectedSales}</td>
                        <td>${row.grossSales}</td>
                        <td>${row.netSales}</td>
                        <td>${row.netSalesComp}</td>
                        <td>{row.lyPercent}%</td>
                        <td>${row.projSalesComp}</td>
                        <td>{row.psPercent}%</td>
                        <td>${row.projFoodCost}</td>
                        <td>${row.foodCost}</td>
                        <td>{row.foodCostPerc}%</td>
                        <td>${row.salesTax}</td>
                        <td>${row.taxExempt}</td>
                        <td>{row.transCount}</td>
                        <td>${row.averageTrans}</td>
                        <td>{row.coupons}</td>
                        <td>{row.coupQuant}</td>
                        <td>${row.discounts}</td>
                        <td>{row.discQuant}</td>
                        <td>{row.outOrderQuant}</td>
                        <td>${row.outOrderAmm}</td>
                        <td>{row.singleSteaks}</td>
                        <td>{row.doubleSteaks}</td>
                        <td>{row.nuggetMeal}</td>
                        <td>{row.quarterlyProm1}</td>
                        <td>${row.cashReceived}</td>
                        <td>${row.Dep1}</td>
                        <td>${row.totalDep}</td>
                        <td>${row.cash}</td>
                        <td>${row.creditCards}</td>
                        <td>{row.actualLabor}</td>
                        <td>${row.truck}</td>
                        <td>${row.houseCharges}</td>
                        <td>${row.paidOuts}</td>
                        <td>${row.transfer}</td>
                        <td>${row.storeCreditCardPursh}</td>
                    </tr>
                ))}
            </table>
        </>
    );
}
export default React.memo(TableReports);
