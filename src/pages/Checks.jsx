import React from 'react';
import Table from '../components/table/Table';

function Checks() {
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
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    hola mundo
                </div>
                <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    hola Mundo2
                </div>

                <Table />
            </div>
        </>
    );
}

export default Checks;
