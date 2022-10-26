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
import {toast} from 'react-toastify';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';
import Table from '../components/table/Table';

const MyVerticallyCenteredModal = (props) => {
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
};

function Users() {
    const [role, setRole] = React.useState('');
    const [idState, setIdState] = React.useState(0);
    const [action, setAction] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users.array);
    const closeModal = useSelector((store) => store.users.modalClose);

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

    React.useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);
    //! ADD USER
    const addUser = async (records) => {
        dispatch(changeReactLoading(true));
        await dispatch(addUsersAction(records));
        dispatch(changeReactLoading(false));
    };
    //! UPDATE USER
    const updateUser = async (records) => {
        console.log(users);
        dispatch(changeReactLoading(true));
        await dispatch(updateUsersAction(records, idState));
        dispatch(changeReactLoading(false));
    };
    const updateItem = async (id) => {
        dispatch(changeReactLoading(true));
        await dispatch(recordsUpdate(id));
        setIdState(id);
        setAction(false);
        setModalShow(true);
        console.log(id);
        dispatch(changeReactLoading(false));
    };
    //! DELETE USER
    const deleteItem = async (id) => {
        dispatch(changeReactLoading(true));
        await dispatch(deleteUsersAction(id));
        dispatch(changeReactLoading(false));
    };
    React.useEffect(async () => {
        dispatch(changeReactLoading(true));
        await dispatch(getUsersAction());
        if (closeModal === true) {
            setModalShow(false);
            dispatch(modalClose(false));
        }
        dispatch(changeReactLoading(false));
    }, [closeModal]);

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1>DataTables</h1>
                            <div className="input-group mb-1 mt-3">
                                <span>
                                    {role === 'Admin' ? (
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
                                        />
                                    ) : null}
                                    <input
                                        type="submit"
                                        value="Sync Users"
                                        className=" btn btn-danger btn-sm mr-3 text-lg"
                                        onClick={async () => {
                                            dispatch(changeReactLoading(true));
                                            await dispatch(syncUsers());
                                            dispatch(changeReactLoading(false));
                                            toast.success('Success!');
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
        </>
    );
}

export default Users;
