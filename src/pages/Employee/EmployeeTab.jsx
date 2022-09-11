import CashIn from '@app/pages/Employee/CashIn';
import CashOut from '@app/pages/Employee/CashOut';
import React from 'react';

const EmployeeTab = () => {
    return (
        <>
            {/*    Employee: {JSON.stringify(user)} */}
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active btn-danger font-weight-bold text-uppercase"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Cash In
                    </button>
                    <button
                        className="nav-link btn-danger font-weight-bold text-uppercase"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Cash Out
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabIndex="0"
                >
                    <CashIn />
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabIndex="0"
                >
                    <CashOut />
                </div>
            </div>
        </>
    );
};

export default EmployeeTab;
