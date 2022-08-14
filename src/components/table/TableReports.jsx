/* eslint-disable indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
/* import round from 'lodash/round'; */
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {isMobile} from 'react-device-detect';
import ChartModal from './ChartModal';

// import JSPDF from 'jspdf';
// import 'jspdf-autotable';

// const doc = new JSPDF('l', 'pt', 'a0');
// eslint-disable-next-line no-unused-vars

/* import makeData from './makeData'; */

const TableReports = ({data, id, checks}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [field, setField] = React.useState('');
    const [nameField, setNameField] = React.useState('');
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

    const [role, setRole] = React.useState('');
    React.useEffect(() => {
        ordenarFechas();
        setRole(localStorage.getItem('role'));
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
                        <td className="font-weight-bold">(%) Door Dash</td>
                        <td className="font-weight-bold">Single Steaks</td>
                        <td className="font-weight-bold">Double Steaks</td>
                        <td className="font-weight-bold">Nugget Meal</td>
                        <td className="font-weight-bold">Waste</td>
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
                    <tr key={row.id}>
                        {role === 'Admin' && row.date === 'Total' ? (
                            <>
                                <td>{row.date}</td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('weatherTemp');
                                        setNameField('Weather');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('weatherTemp');
                                                  setNameField('Weather');
                                              }
                                    }
                                >
                                    {row.weatherTemp}
                                </td>
                                <td>{row.weatherW}</td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('lySales');
                                        setNameField('Last Year Sales');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('lySales');
                                                  setNameField(
                                                      'Last Year Sales'
                                                  );
                                              }
                                    }
                                >
                                    ${row.lySales}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('projectedSales');
                                        setNameField('Projected Sales');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('projectedSales');
                                                  setNameField(
                                                      'Projected Sales'
                                                  );
                                              }
                                    }
                                >
                                    ${row.projectedSales}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('grossSales');
                                        setNameField('Gross Sales');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('grossSales');
                                                  setNameField('Gross Sales');
                                              }
                                    }
                                >
                                    ${row.grossSales}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('netSales');
                                        setNameField('Net Sales');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('netSales');
                                                  setNameField('Net Sales');
                                              }
                                    }
                                >
                                    ${row.netSales}
                                </td>

                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('netSalesComp');
                                        setNameField('Net $ales +/-');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('netSalesComp');
                                                  setNameField('Net $ales +/-');
                                              }
                                    }
                                >
                                    ${row.netSalesComp}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('lyPercent');
                                        setNameField('Last Year % +/-');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('lyPercent');
                                                  setNameField(
                                                      'Last Year % +/-'
                                                  );
                                              }
                                    }
                                >
                                    {row.lyPercent}%
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('projSalesComp');
                                        setNameField('Projeted $ales +-');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('projSalesComp');
                                                  setNameField(
                                                      'Projeted $ales +-'
                                                  );
                                              }
                                    }
                                >
                                    ${row.projSalesComp}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('psPercent');
                                        setNameField('% Projected Sales +/-');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('psPercent');
                                                  setNameField(
                                                      '% Projected Sales +/-'
                                                  );
                                              }
                                    }
                                >
                                    {row.psPercent}%
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('projFoodCost');
                                        setNameField('Food Cost Projected');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('projFoodCost');
                                                  setNameField(
                                                      'Food Cost Projected'
                                                  );
                                              }
                                    }
                                >
                                    ${row.projFoodCost}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('foodCost');
                                        setNameField('Food Cost');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('foodCost');
                                                  setNameField('Food Cost');
                                              }
                                    }
                                >
                                    ${row.foodCost}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('foodCostPerc');
                                        setNameField('% Food Cost +/-');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('foodCostPerc');
                                                  setNameField(
                                                      '% Food Cost +/-'
                                                  );
                                              }
                                    }
                                >
                                    {row.foodCostPerc}%
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('salesTax');
                                        setNameField('Sales Tax');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('salesTax');
                                                  setNameField('Sales Tax');
                                              }
                                    }
                                >
                                    ${row.salesTax}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('taxExempt');
                                        setNameField('Tax Exempt');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('taxExempt');
                                                  setNameField('Tax Exempt');
                                              }
                                    }
                                >
                                    ${row.taxExempt}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('transCount');
                                        setNameField('Ts Count');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('transCount');
                                                  setNameField('Ts Count');
                                              }
                                    }
                                >
                                    {row.transCount}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('averageTrans');
                                        setNameField('Averag Transaction');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('averageTrans');
                                                  setNameField(
                                                      'Averag Transaction'
                                                  );
                                              }
                                    }
                                >
                                    ${row.averageTrans}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('coupons');
                                        setNameField('Coupons ($)');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('coupons');
                                                  setNameField('Coupons ($)');
                                              }
                                    }
                                >
                                    ${row.coupons}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('coupQuant');
                                        setNameField('Coupons');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('coupQuant');
                                                  setNameField('Coupons');
                                              }
                                    }
                                >
                                    ${row.coupQuant}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('discounts');
                                        setNameField('Discounts ($)');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('discounts');
                                                  setNameField('Discounts ($)');
                                              }
                                    }
                                >
                                    ${row.discounts}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('discQuant');
                                        setNameField('Discounts');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('discQuant');
                                                  setNameField('Discounts');
                                              }
                                    }
                                >
                                    {row.discQuant}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('outOrderQuant');
                                        setNameField('Door Dash …');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('outOrderQuant');
                                                  setNameField('Door Dash …');
                                              }
                                    }
                                >
                                    {row.outOrderQuant}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('outOrderAmm');
                                        setNameField('($) Door Dash …');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('outOrderAmm');
                                                  setNameField(
                                                      '($) Door Dash …'
                                                  );
                                              }
                                    }
                                >
                                    ${row.outOrderAmm}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('dorDashPerc');
                                        setNameField('(%) Door Dash');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('dorDashPerc');
                                                  setNameField('(%) Door Dash');
                                              }
                                    }
                                >
                                    {row.dorDashPerc}%
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('singleSteaks');
                                        setNameField('Single Steaks');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('singleSteaks');
                                                  setNameField('Single Steaks');
                                              }
                                    }
                                >
                                    {row.singleSteaks}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('doubleSteaks');
                                        setNameField('Double Steaks');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('doubleSteaks');
                                                  setNameField('Double Steaks');
                                              }
                                    }
                                >
                                    {row.doubleSteaks}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('nuggetMeal');
                                        setNameField('Nugget Meal');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('nuggetMeal');
                                                  setNameField('Nugget Meal');
                                              }
                                    }
                                >
                                    {row.nuggetMeal}
                                </td>

                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('quarterlyProm1');
                                        setNameField('Waste');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('quarterlyProm1');
                                                  setNameField('Waste');
                                              }
                                    }
                                >
                                    {row.quarterlyProm1}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('cashReceived');
                                        setNameField('Cash Received');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('cashReceived');
                                                  setNameField('Cash Received');
                                              }
                                    }
                                >
                                    ${row.cashReceived}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('Dep1');
                                        setNameField('Tips');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('Dep1');
                                                  setNameField('Tips');
                                              }
                                    }
                                >
                                    ${row.Dep1}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('totalDep');
                                        setNameField('Total Deposit');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('totalDep');
                                                  setNameField('Total Deposit');
                                              }
                                    }
                                >
                                    ${row.totalDep}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('cash');
                                        setNameField('Cash');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('cash');
                                                  setNameField('Cash');
                                              }
                                    }
                                >
                                    ${row.cash}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('creditCards');
                                        setNameField('Credit Cards');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('creditCards');
                                                  setNameField('Credit Cards');
                                              }
                                    }
                                >
                                    ${row.creditCards}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('actualLabor');
                                        setNameField('Actual Labor Hrs.');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('actualLabor');
                                                  setNameField(
                                                      'Actual Labor Hrs.'
                                                  );
                                              }
                                    }
                                >
                                    {row.actualLabor}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('truck');
                                        setNameField('Truck');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('truck');
                                                  setNameField('Truck');
                                              }
                                    }
                                >
                                    ${row.truck}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('houseCharges');
                                        setNameField('House Charges');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('houseCharges');
                                                  setNameField('House Charges');
                                              }
                                    }
                                >
                                    ${row.houseCharges}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('paidOuts');
                                        setNameField('Paid Outs');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('paidOuts');
                                                  setNameField('Paid Outs');
                                              }
                                    }
                                >
                                    ${row.paidOuts}
                                </td>
                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('transfer');
                                        setNameField('Transfer');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField('transfer');
                                                  setNameField('Transfer');
                                              }
                                    }
                                >
                                    ${row.transfer}
                                </td>

                                <td
                                    onClick={() => {
                                        setModalShow(true);
                                        setField('storeCreditCardPursh');
                                        setNameField('Store CC Pursh');
                                    }}
                                    onMouseEnter={
                                        isMobile
                                            ? () => false
                                            : () => {
                                                  setModalShow(true);
                                                  setField(
                                                      'storeCreditCardPursh'
                                                  );
                                                  setNameField(
                                                      'Store CC Pursh'
                                                  );
                                              }
                                    }
                                >
                                    ${row.storeCreditCardPursh}
                                </td>
                            </>
                        ) : (
                            <>
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
                                <td>{row.dorDashPerc}%</td>
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
                            </>
                        )}
                    </tr>
                ))}
            </table>
            <ChartModal
                show={modalShow}
                field={field}
                nameField={nameField}
                data={checks}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};
export default React.memo(TableReports);
