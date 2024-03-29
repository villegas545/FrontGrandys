/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import TableReports from '@app/components/table/TableReports';
import {toast} from 'react-toastify';
//! paso 1 useDispatch
import {useSelector, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import axios from 'axios';
import {
    getChecksAction,
    getChecksActionClean,
    getChecksCleanDatesSuccess,
    updateChecksAction
} from '@app/store/reducers/checksDucks';
//! paso 2 ChangeReactLoading
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';
import {confirmAlert} from 'react-confirm-alert';
import {url as urlconf} from '../config/index';

const Checks = () => {
    //! declarar el useDispatch
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
            {Header: 'Waste', accessor: 'quarterlyProm1'},
            {Header: 'Cash Received', accessor: 'cashReceived'},
            {Header: 'Tips', accessor: 'Dep1'},
            {Header: 'Total Deposit', accessor: 'totalDep'}, //= cash received + tips + cash+/- -paidouts
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
            {Header: 'Store CC Pursh', accessor: 'storeCreditCardPursh'},
            {Header: 'Door Dash %', accessor: 'dorDashPerc'}
        ],
        []
    );

    const [force, setForce] = React.useState(false);
    const checks = useSelector((store) => store.checks.array);
    const dates = useSelector((store) => store.checks.dates);
    const [startWeek, setStartWeek] = React.useState(1);
    const [endWeek, setEndWeek] = React.useState(1);
    const [startYear, setStartYear] = React.useState(1);
    const [endYear, setEndYear] = React.useState(1);
    const [byWeek, setByWeek] = React.useState('byDay');
    const [role, setRole] = React.useState('');
    const [api, setApi] = React.useState('');
    const datePopulate = async (recibeDates) => {
        //! paso 4 usar true / false antes y despues de awaits
        dispatch(changeReactLoading(true));
        console.log(recibeDates);
        try {
            const respuesta = await axios.post(
                `${urlconf}datepopulate`,
                recibeDates,
                {
                    headers: {
                        authorization: `bearerHeader: ${localStorage.getItem(
                            'token'
                        )}`
                    }
                }
            );
            console.log(respuesta);
            toast.success(
                'Downloaded!!!!, Please press "Search Button" again!'
            );
            dispatch(getChecksCleanDatesSuccess());
        } catch (err) {
            console.log('todo salio mal');
            toast.error(err);
        }
        dispatch(changeReactLoading(false));
    };
    React.useEffect(() => {
        setRole(localStorage.getItem('role'));
        setApi(localStorage.getItem('api'));
    }, []);
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
                            datePopulate(dates);
                            setForce(false);
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }
    }, [dates]);

    const weekSelector = async (e, accion) => {
        e.preventDefault();
        dispatch(changeReactLoading(true));
        try {
            await dispatch(getChecksActionClean());
            if (accion === 'force') {
                setForce(true);
                await dispatch(
                    updateChecksAction(
                        startWeek,
                        endWeek,
                        startYear,
                        endYear,
                        byWeek
                    )
                );
            } else {
                await dispatch(
                    getChecksAction(
                        startWeek,
                        endWeek,
                        startYear,
                        endYear,
                        byWeek
                    )
                );
            }
            dispatch(changeReactLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(changeReactLoading(false));
        }
    };
    return (
        <>
            {/* <!-- Content Header (Page header) --> */}

            <section className="content-header">
                <div className="container-fluid">
                    <h1>DataTables</h1>
                    <div
                        className="input-group mb-3"
                        style={{display: 'flex', flexFlow: 'row wrap'}}
                    >
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Start Week
                            </span>
                            <input
                                title="Start Week"
                                type="number"
                                className="form-control input-sm mr-3"
                                min="1"
                                max="52"
                                style={{minWidth: '50px'}}
                                value={startWeek}
                                onChange={(e) => setStartWeek(e.target.value)}
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                End Week
                            </span>
                            <input
                                title="End Week"
                                type="number"
                                className="form-control mr-3"
                                min="1"
                                max="52"
                                style={{minWidth: '50px'}}
                                value={endWeek}
                                onChange={(e) => setEndWeek(e.target.value)}
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                Start Year
                            </span>
                            <input
                                title="Start Year"
                                type="number"
                                className="form-control mr-3"
                                min="2015"
                                style={{minWidth: '50px'}}
                                max="2999"
                                value={startYear}
                                onChange={(e) => setStartYear(e.target.value)}
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <span
                                className="input-group-text"
                                style={{minWidth: '100px'}}
                            >
                                End Year
                            </span>
                            <input
                                title="End Year"
                                type="number"
                                className="form-control mr-3"
                                min="2015"
                                max="2999"
                                style={{minWidth: '50px'}}
                                value={endYear}
                                onChange={(e) => setEndYear(e.target.value)}
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <select
                                className="form-control mr-3"
                                value={byWeek}
                                onChange={(e) => setByWeek(e.target.value)}
                                style={{minWidth: '100px'}}
                            >
                                <option selected value="byDay">
                                    By Day
                                </option>
                                <option value="byWeek">By Week</option>
                            </select>
                        </div>
                        <div
                            className=""
                            style={{
                                display: 'flex',
                                flexFlow: 'row nowrap',
                                flex: '1 16.6667%'
                            }}
                        >
                            <input
                                type="submit"
                                value="Search"
                                onClick={(e) => weekSelector(e, '')}
                                className="form-control btn btn-danger btn-xs mr-3 text-lg"
                                style={{minWidth: '80px'}}
                            />

                            {role === 'Admin' ? (
                                <input
                                    type="submit"
                                    value="Update"
                                    onClick={(e) => weekSelector(e, 'force')}
                                    className="form-control btn btn-dark btn-xs mr-3 text-lg"
                                    style={{minWidth: '80px'}}
                                />
                            ) : null}
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
                              <TableReports
                                  columns={columns}
                                  data={item.Checks}
                                  id={item.id}
                                  checks={checks}
                              />
                          </div>
                      ))}
            </div>
        </>
    );
};

export default React.memo(Checks);
