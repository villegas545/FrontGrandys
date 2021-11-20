/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {Modal} from 'react-bootstrap';
import Modaladdrest from '@app/components/addusermodal/Modaladdrest';

import {useDispatch, useSelector} from 'react-redux';
import {
    addRestAction,
    getRestAction,
    updateRestAction,
    deleteRestAction,
    recordsUpdate,
    modalClose
} from '@app/store/reducers/restsDucks';
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
                    Rest
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modaladdrest action={action} />
            </Modal.Body>
        </Modal>
    );
}

function Rest() {
    const [modalShow, setModalShow] = React.useState(false);
    const [idState, setIdState] = React.useState(0);
    const dispatch = useDispatch();

    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Location',
            accessor: 'location'
        },
        {
            Header: 'Api',
            accessor: 'api'
        },
        {
            Header: 'Password',
            accessor: 'password'
        },
        {
            Header: 'User Name',
            accessor: 'userName'
        }
    ];

    const closeModal = useSelector((store) => store.rest.modalClose);
    const rest = useSelector((store) => store.rest.array);
    const [action, setAction] = React.useState(true);
    /*    const emptyRecords = {
        name: '',
        email: '',
        password: '',
        role: ''
    }; */

    const addRest = async (records) => {
        await dispatch(addRestAction(records));
    };
    const updateRest = async (records) => {
        await dispatch(updateRestAction(records, idState));
    };
    const updateItem = async (id) => {
        await dispatch(recordsUpdate(id));
        setIdState(id);
        setAction(false);
        setModalShow(true);
        console.log(id);
    };
    const deleteItem = async (id) => {
        await dispatch(deleteRestAction(id));
    };
    React.useEffect(async () => {
        await dispatch(getRestAction());
        if (closeModal === true) {
            setModalShow(false);
            dispatch(modalClose(false));
        }
    }, [closeModal]);
    /*  const prueba = () => {
        console.log('chido');
    };  */
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
                                        value="Add Restaurant Api"
                                        className="form-control btn btn-danger btn-sm mr-3 text-lg"
                                        onClick={async () => {
                                            await dispatch(
                                                recordsUpdate('empty')
                                            );
                                            setModalShow(true);
                                            setAction(true);
                                        }}
                                    />
                                    {action ? (
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            action={addRest}
                                        />
                                    ) : (
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            action={updateRest}
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
                data={rest}
                deleteItem={deleteItem}
                updateItem={updateItem}
            />
            {/* <Table headers={headers} prueba={prueba} /> */}
            {/* <input type="submit" value="test" onClick={() => prueba()} /> */}
        </>
    );
}

export default Rest;
