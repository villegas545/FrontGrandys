/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {Modal} from 'react-bootstrap';
import Modaladduser from '@app/components/addusermodal/Modaladduser';
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
                                        className="form-control btn btn-primary btn-sm mr-3 text-lg"
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
            <Table />
        </>
    );
}

export default Users;
