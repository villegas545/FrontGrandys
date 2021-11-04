import React from 'react';

function Table({datos, headers}) {
    React.useEffect(async () => {
        console.log(headers);
    }, []);

    return (
        <>
            <section className="content" id="nav-profile">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table
                                        id="example2"
                                        className="table table-bordered table-hover"
                                    >
                                        <thead>
                                            {/*    {headers.map((item) => (
                                                <tr>
                                                    <th>{item.name}</th>
                                                </tr>
                                            ))} */}
                                        </thead>
                                        <tbody>
                                            {datos.map((item) => (
                                                <tr>
                                                    <td>{item.name}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td>Trident</td>
                                                <td>Internet Explorer 4.0</td>
                                                <td>Win 95+</td>
                                                <td> 4</td>
                                                <td>X</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
                                                <th>CSS grade</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* <!-- /.card-body --> */}
                            </div>
                            {/* <!-- /.card --> */}
                        </div>
                        {/* /.col --> */}
                    </div>
                    {/* /.row --> */}
                </div>
                {/* /.container-fluid --> */}
            </section>
            {/* /.content --> */}
        </>
    );
}

export default Table;
