import React from 'react';
import TableChecks from '@app/components/table/TableChecks';
import {useSelector, useDispatch} from 'react-redux';
import {getChecksAction} from '@app/store/reducers/checksDucks';

function Checks() {
    const dispatch = useDispatch();

    const columns = [
        {Header: 'Trading Day', accessor: 'traidingDay'},
        {Header: 'Date', accessor: 'date'},
        {Header: 'Id Rest', accessor: 'restaurantId'},
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
    console.log(checks);
    React.useEffect(async () => {
        await dispatch(getChecksAction());
    }, []);

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
                                    Start Date
                                </span>
                                <input
                                    title="Start Date"
                                    type="date"
                                    className="form-control input-sm mr-3"
                                />
                                <span className="input-group-text">
                                    End Date
                                </span>
                                <input
                                    title="End Date"
                                    type="date"
                                    className="form-control mr-3"
                                />
                                <input
                                    type="submit"
                                    value="Search"
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
                    <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Home
                    </button>
                    <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Profile
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {/* <!-- Main content --> */}
                <div
                    className="tab-pane fade  show active"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    <TableChecks columns={columns} data={checks} />{' '}
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    hola Mundo2
                </div>
            </div>
        </>
    );
}

export default Checks;
