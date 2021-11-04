import React from 'react';
// import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUsersAction} from '@app/store/reducers/usersDucks';

function Table({headers, prueba}) {
    const users = useSelector((store) => store.users.array);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(deleteUsersAction(id));
    };
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
                                            <tr>
                                                {headers.map((item) => (
                                                    <th>{item.col}</th>
                                                ))}
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((item) => (
                                                <tr key={item.id}>
                                                    {headers.map((titulo) => {
                                                        console.log('hola');
                                                    }, <td>{`${item}.${titulo.col}`}</td>)}
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.password}</td>
                                                    <td>{item.roles}</td>
                                                    <td>
                                                        <input
                                                            type="submit"
                                                            value="Update"
                                                            className="btn btn-warning"
                                                            onClick={() =>
                                                                prueba()
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="submit"
                                                            value="Delete"
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                deleteItem(
                                                                    item.id
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
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

/* Table.PropTypes = {
    helloWorld: PropTypes.func.isRequired
}; */
export default Table;
