/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import TableChecks from '@app/components/table/TableChecks';
import {useSelector, useDispatch} from 'react-redux';
import {
    getChecksAction,
    getChecksActionClean
} from '@app/store/reducers/checksDucks';

function Checks() {
    const dispatch = useDispatch();

    const columns = [
        {Header: 'Date', accessor: 'date'},
        /*  {Header: 'Id Rest', accessor: 'restaurantId'}, */
        {Header: 'Temp', accessor: 'weatherTemp'},
        {Header: 'Weather', accessor: 'weatherW'},
        {Header: 'Last Year Sales', accessor: 'lySales'},
        {Header: 'Projeted Sales', accessor: 'projectedSales'},
        {Header: 'Gross Sales', accessor: 'grossSales'},
        {Header: 'Net Sales', accessor: 'netSales'},
        {Header: 'NS comp', accessor: 'netSalesComp'},
        {Header: 'Last Year % +/-', accessor: 'lyPercent'},
        {Header: 'Projeted Sales +-', accessor: 'projSalesComp'},
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
        {Header: 'Quarterly Promo 2', accessor: 'quarterlyProm2'},
        {Header: 'Cash Received', accessor: 'cashReceived'},
        {Header: 'Deposit 1', accessor: 'Dep1'},
        {Header: 'Deposit 2', accessor: 'Dep2'},
        {Header: 'Total Deposit', accessor: 'totalDep '},
        {Header: 'Cash', accessor: 'cash'},
        {Header: 'Credit Cards', accessor: 'creditCards'},
        {Header: 'Hours Allowed', accessor: 'hrsAllow'},
        {Header: 'Actual Labor Hrs.', accessor: 'actualLabor'},
        {Header: 'Labor Comp', accessor: 'laborComp'},
        {Header: 'Interviewed', accessor: 'candidatesInt'},
        {Header: 'On Board', accessor: 'candidatesOnb'},
        {Header: 'Terminated', accessor: 'candidatesTerm'},
        {Header: 'Truck', accessor: 'truck'},
        {Header: 'House Charges', accessor: 'houseCharges'},
        {Header: 'Paid Outs', accessor: 'paidOuts'},
        {Header: 'Transfer', accessor: 'transfer'},
        {Header: 'Store CC Pursh', accessor: 'storeCreditCardPursh'}
    ];

    const checks = useSelector((store) => store.checks.array);
    const [startWeek, setStartWeek] = React.useState(1);
    const [endWeek, setEndWeek] = React.useState(1);

    React.useEffect(async () => {}, []);

    const weekSelector = async (e) => {
        e.preventDefault();
        await dispatch(getChecksActionClean());
        await dispatch(getChecksAction(startWeek, endWeek));
    };
    return (
        <>
            {/* <!-- Content Header (Page header) --> */}
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
                                <select className="form-control mr-3">
                                    <option selected>By Day</option>
                                    <option>By Week</option>
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
        </>
    );
}

export default Checks;
