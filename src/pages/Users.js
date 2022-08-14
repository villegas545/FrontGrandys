/* eslint-disable react/destructuring-assignment */
import React, {Fragment} from 'react';
import {Modal} from 'react-bootstrap';
import Modaladduser from '@app/components/addusermodal/Modaladduser';
import {useDispatch, useSelector} from 'react-redux';
import {
    addUsersAction,
    getUsersAction,
    updateUsersAction,
    deleteUsersAction,
    recordsUpdate,
    modalClose,
    syncUsers
} from '@app/store/reducers/usersDucks';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

import Table from '../components/table/Table';

function MyVerticallyCenteredModal(props) {
    console.log(props);
    const {action} = props;
    return (
        <Modal
            onHide={props.onHide}
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modaladduser action={action} />
            </Modal.Body>
        </Modal>
    );
}

function Users() {
    const [modalShow, setModalShow] = React.useState(false);
    const [idState, setIdState] = React.useState(0);
    const dispatch = useDispatch();

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
            Header: 'Role',
            accessor: 'roles'
        },
        {
            Header: 'Restaurant',
            accessor: 'Restaurant.name'
        },
        {
            Header: 'Pin Code',
            accessor: 'pinCode'
        }
    ];

    const closeModal = useSelector((store) => store.users.modalClose);
    const users = useSelector((store) => store.users.array);
    const [cargando, setCargando] = React.useState(false);

    const [action, setAction] = React.useState(true);
    /*    const emptyRecords = {
        name: '',
        email: '',
        password: '',
        role: ''
    }; */

    const addUser = async (records) => {
        await dispatch(addUsersAction(records));
    };
    const updateUser = async (records) => {
        await dispatch(updateUsersAction(records, idState));
    };
    const updateItem = async (id) => {
        await dispatch(recordsUpdate(id));
        setIdState(id);
        setAction(false);
        setModalShow(true);
        console.log(id);
    };
    const deleteItem = async (id) => {
        await dispatch(deleteUsersAction(id));
    };
    React.useEffect(async () => {
        await dispatch(getUsersAction());
        if (closeModal === true) {
            setModalShow(false);
            dispatch(modalClose(false));
        }
    }, [closeModal]);
    /*  const prueba = () => {
        console.log('chido');
    };  */
    const notify = () =>
        toast('Success', {
            theme: 'colored',
            type: 'success',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });

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
                                        className=" btn btn-danger btn-sm mr-3 text-lg"
                                        onClick={async () => {
                                            await dispatch(
                                                recordsUpdate('empty')
                                            );
                                            setModalShow(true);
                                            setAction(true);
                                        }}
                                    />{' '}
                                    <input
                                        type="submit"
                                        value="Sync Users"
                                        className=" btn btn-danger btn-sm mr-3 text-lg"
                                        onClick={async () => {
                                            setCargando(true);
                                            await dispatch(syncUsers());
                                            setCargando(false);
                                            notify();
                                        }}
                                    />
                                    {action ? (
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            action={addUser}
                                        />
                                    ) : (
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            action={updateUser}
                                        />
                                    )}
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
            <ToastContainer />
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
            {/* <Table headers={headers} prueba={prueba} /> */}
            {/* <input type="submit" value="test" onClick={() => prueba()} /> */}
        </>
    );
}

export default Users;
