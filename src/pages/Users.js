/* eslint-disable react/destructuring-assignment */
import React, {Fragment} from 'react';
import {Modal} from 'react-bootstrap';
import Modaladduser from '@app/components/addusermodal/Modaladduser';

import {useDispatch, useSelector} from 'react-redux';
import {getUsersAction} from '@app/store/reducers/usersDucks';
import Table from '../components/table/Table';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modaladduser />
            </Modal.Body>
        </Modal>
    );
}

function Users() {
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();
    /* 
    const headers = [
        {
            col: 'Name'
        },
        {
            col: 'Email'
        },
        {
            col: 'Password'
        },
        {col: 'Role'}
    ]; */
    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Password',
            accessor: 'password'
        },
        {
            Header: 'Role',
            accessor: 'roles'
        }
    ];
    dispatch(getUsersAction());
    const users = useSelector((store) => store.users.array);
    const updateItem = (id) => {
        console.log(id);
    };
    const deleteItem = (id) => {
        console.log(id);
    };
    /* React.useEffect(async () => {}, []); */
    /*  const prueba = () => {
        console.log('chido');
    }; */
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1>DataTables</h1>
                            <div className="input-group mb-1 mt-3">
                                <span>
                                    <input
                                        type="submit"
                                        value="Add User"
                                        className="form-control btn btn-danger btn-sm mr-3 text-lg"
                                        onClick={() => setModalShow(true)}
                                    />
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>
            <Table
                columns={columns}
                data={users}
                deleteItem={deleteItem}
                updateItem={updateItem}
            />
            {/* <Table headers={headers} prueba={prueba} /> */}
            {/* <input type="submit" value="test" onClick={() => prueba()} /> */}
        </>
    );
}

export default Users;
