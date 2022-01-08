/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import TableChecks from '@app/components/table/TableChecks';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import ReactLoading from 'react-loading';
import axios from 'axios';
import {
    getChecksAction,
    getChecksActionClean,
    getChecksCleanDatesSuccess
} from '@app/store/reducers/checksDucks';
import {confirmAlert} from 'react-confirm-alert';
import {nodeName} from 'jquery';
import round from 'round';
import {url as urlconf} from '../config/index';

function Checks() {
    console.log('pagina checks recargada');
    const notify = React.useCallback(
        () =>
            toast('Downloaded!!!!, Please press "Search Button" again', {
                theme: 'colored',
                type: 'success',
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }),
        []
    );

    const dispatch = useDispatch();

    const columns = React.useCallback(
        [
            {Header: 'Date', accessor: 'date'},
            /*  {Header: 'Id Rest', accessor: 'restaurantId'}, */
            {Header: 'Temp', accessor: 'weatherTemp'},
            {Header: 'Weather', accessor: 'weatherW'},
            {Header: 'Last Year Sales', accessor: 'lySales'}, // es el netsales de el año anterior
            {Header: 'Projeted Sales', accessor: 'projectedSales'}, // sumar el dia que corresponda de 5 semanas atras y dividirlo entre 5
            {Header: 'Gross Sales', accessor: 'grossSales'},
            {Header: 'Net Sales', accessor: 'netSales'}, // es el netsales de el año actual
            {Header: 'Net $ales  +/-', accessor: 'netSalesComp'}, // net sales actual menos el netsales del año anterior
            {Header: 'Last Year % +/-', accessor: 'lyPercent'}, // net sales +/- *100 / last years sales ...... netsales por 100 entre lasy years  sales
            {Header: 'Projeted Sales +-', accessor: 'projSalesComp'}, // de projected sales restar las ventas netas del dia actual
            {Header: '% Projected Sales +/-', accessor: 'psPercent'},
            {Header: 'Sales Tax', accessor: 'salesTax'},
            {Header: 'Tax Exempt', accessor: 'taxExempt'},
            {Header: 'Ts Count', accessor: 'transCount'},
            {Header: 'Averag Trans', accessor: 'averageTrans'},
            {Header: 'Coupons ($)', accessor: 'coupons'},
            {Header: 'Coupons', accessor: 'coupQuant'},
            {Header: 'Discounts ($)', accessor: 'discounts'},
            {Header: 'Discounts', accessor: 'discQuant'},
            {Header: 'Door Dash …', accessor: 'outOrderQuant'},
            {Header: '($) Door Dash …', accessor: 'outOrderAmm'},
            {Header: 'Single Steaks', accessor: 'singleSteaks'},
            {Header: 'Double Steaks', accessor: 'doubleSteaks'},
            {Header: 'Nugget Meal', accessor: 'nuggetMeal'},
            {Header: 'Quarterly Promo 1', accessor: 'quarterlyProm1'},
            {Header: 'Cash Received', accessor: 'cashReceived'},
            {Header: 'Tips', accessor: 'Dep1'},
            {Header: 'Total Deposit', accessor: 'totalDep '}, //= cash received + tips + cash+/- -paidouts
            {Header: 'Cash', accessor: 'cash'},
            {Header: 'Credit Cards', accessor: 'creditCards'},
            // {Header: 'Hours Allowed', accessor: 'hrsAllow'},
            {Header: 'Actual Labor Hrs.', accessor: 'actualLabor'},
            // {Header: 'Labor Comp', accessor: 'laborComp'},
            {Header: 'Interviewed', accessor: 'candidatesInt'},
            {Header: 'On Board', accessor: 'candidatesOnb'},
            {Header: 'Terminated', accessor: 'candidatesTerm'},
            {Header: 'Truck', accessor: 'truck'},
            {Header: 'House Charges', accessor: 'houseCharges'},
            {Header: 'Paid Outs', accessor: 'paidOuts'},
            {Header: 'Transfer', accessor: 'transfer'},
            {Header: 'Store CC Pursh', accessor: 'storeCreditCardPursh'}
        ],
        []
    );

    const checks = useSelector((store) => store.checks.array);
    const dates = useSelector((store) => store.checks.dates);
    const [startWeek, setStartWeek] = React.useState(1);
    const [endWeek, setEndWeek] = React.useState(1);
    const [startYear, setStartYear] = React.useState(1);
    const [endYear, setEndYear] = React.useState(1);
    const [byWeek, setByWeek] = React.useState('byDay');
    const [cargando, setCargando] = React.useState(false);

    const datePopulate = async (recibeDates) => {
        console.log(recibeDates);
        try {
            const respuesta = await axios.post(
                `${urlconf}datepopulate`,
                recibeDates
            );
            console.log(respuesta);
            notify();
            dispatch(getChecksCleanDatesSuccess());
        } catch (err) {
            console.log('todo salio mal');
        }
        setCargando(false);
    };

    React.useEffect(async () => {
        const yearSelect = new Date().getFullYear();
        setStartYear(yearSelect);
        setEndYear(yearSelect);
        if (isEmpty(dates)) {
            console.log('empty dates');
        } else {
            const numberDates = dates.length;
            confirmAlert({
                title: `${numberDates} dates are missing`,
                message: `Do you want to download them? This may take about ${numberDates} minutes, please be patient`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setCargando(true);
                            datePopulate(dates);
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }
    }, [dates]);

    const weekSelector = async (e) => {
        e.preventDefault();
        await dispatch(getChecksActionClean());
        await dispatch(
            getChecksAction(startWeek, endWeek, startYear, endYear, byWeek)
        );
    };
    return (
        <>
            {/* <!-- Content Header (Page header) --> */}
            <ReactLoading
                style={{
                    display: cargando ? 'block' : 'none',
                    position: 'absolute',
                    zIndex: '9999',
                    top: '30%',
                    left: '50%',
                    height: '150px',
                    width: '150px',
                    color: '#D11F1F'
                }}
                color="#D11F1F"
                width="300px"
                type="spinningBubbles"
                height="100px"
            />
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1>DataTables</h1>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    Start Week
                                </span>
                                <input
                                    title="Start Week"
                                    type="number"
                                    className="form-control input-sm mr-3"
                                    min="1"
                                    max="52"
                                    value={startWeek}
                                    onChange={(e) =>
                                        setStartWeek(e.target.value)
                                    }
                                />
                                <span className="input-group-text">
                                    End Week
                                </span>
                                <input
                                    title="End Week"
                                    type="number"
                                    className="form-control mr-3"
                                    min="1"
                                    max="52"
                                    value={endWeek}
                                    onChange={(e) => setEndWeek(e.target.value)}
                                />
                                <span className="input-group-text">
                                    Start Year
                                </span>
                                <input
                                    title="Start Year"
                                    type="number"
                                    className="form-control mr-3"
                                    min="2015"
                                    max="2999"
                                    value={startYear}
                                    onChange={(e) =>
                                        setStartYear(e.target.value)
                                    }
                                />
                                <span className="input-group-text">
                                    End Year
                                </span>
                                <input
                                    title="End Year"
                                    type="number"
                                    className="form-control mr-3"
                                    min="2015"
                                    max="2999"
                                    value={endYear}
                                    onChange={(e) => setEndYear(e.target.value)}
                                />
                                <select
                                    className="form-control mr-3"
                                    value={byWeek}
                                    onChange={(e) => setByWeek(e.target.value)}
                                >
                                    <option selected value="byDay">
                                        By Day
                                    </option>
                                    <option value="byWeek">By Week</option>
                                </select>
                                <input
                                    type="submit"
                                    value="Search"
                                    onClick={(e) => weekSelector(e)}
                                    className="form-control btn btn-danger btn-sm mr-3 text-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {checks === []
                        ? null
                        : checks.map((item, index) => (
                              <button
                                  key={item.id}
                                  className={`nav-link btn-danger font-weight-bold text-uppercase ${
                                      index === 0 ? 'active' : ''
                                  }`}
                                  id={`nav-${item.id}-tab`}
                                  data-bs-toggle="tab"
                                  data-bs-target={`#nav-${item.id}`}
                                  type="button"
                                  role="tab"
                                  aria-controls={`nav-${item.id}`}
                                  aria-selected={index === 0 ? 'true' : 'false'}
                              >
                                  {item.name}
                              </button>
                          ))}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {/* <!-- Main content --> */}

                {checks === []
                    ? null
                    : checks.map((item, index) => (
                          <div
                              key={item.id}
                              id={`nav-${item.id}`}
                              role="tabpanel"
                              aria-labelledby={`nav-${item.id}-tab`}
                              className={`tab-pane fade ${
                                  index === 0 ? 'show active' : ''
                              }`}
                          >
                              {' '}
                              <TableChecks
                                  columns={columns}
                                  data={item.Checks}
                                  id={item.id}
                              />
                              {/*  <buttton
                            value="Transpose"
                            className="btn btn-dark botontransponer"
                        >
                            Transpose
                        </buttton> */}
                              {/*  <input
                            value="Transpose"
                            className="btn btn-danger botontransponer"
                            onChange={() => console.log(item.id)}
                        /> */}
                          </div>
                      ))}
                {/*    <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                />
                <div
                    className="tab-pane fade  show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    <TableChecks columns={columns} data={checks} />{' '}
                </div> */}
            </div>
            <ToastContainer />
        </>
    );
}

export default React.memo(Checks);
