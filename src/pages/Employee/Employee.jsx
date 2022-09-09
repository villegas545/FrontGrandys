import React, {useEffect, useState} from 'react';

import {Modal} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {ToastContainer, toast} from 'react-toastify';
import {url as urlconf} from '../../config';
import EmployeeTab from './EmployeeTab';

function ModalPinCode({show, onHide, action}) {
    const [pinCode, setPinCode] = useState('');
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title
                    id="contained-modal-title-vcenter "
                    className="w-100 text-center"
                >
                    <span>Enter A PinCode</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap justify-content-around">
                    <div className="w-100">
                        <input
                            className="form-control "
                            type="text"
                            placeholder="Enter A Pin Code"
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => action(pinCode)}
                    >
                        Enter
                    </button>
                    <button
                        type="submit"
                        className="btn btn-secondary"
                        onClick={() => onHide()}
                    >
                        Cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
function Employee() {
    const [modalShow, setModalShow] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [user, setUser] = useState('');
    useEffect(() => {
        setModalShow(true);
    }, []);
    const notify = React.useCallback(
        () =>
            toast('Incorrect pincode', {
                theme: 'colored',
                type: 'error',
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }),
        []
    );
    const login = async (pinCode) => {
        setCargando(true);
        try {
            const respuesta = await axios.post(
                `${urlconf}employeeLogin`,
                {pinCode},
                {
                    headers: {
                        authorization: `bearerHeader: ${localStorage.getItem(
                            'token'
                        )}`
                    }
                }
            );
            if (respuesta.data) {
                setUser(respuesta.data);
                setModalShow(false);
            } else {
                notify();
            }

            console.log(respuesta);
        } catch (err) {
            console.log(err);
        }
        setCargando(false);
    };
    return (
        <>
            {user ? (
                <>
                    <EmployeeTab user={user} />
                </>
            ) : null}

            <ModalPinCode
                show={modalShow}
                onHide={() => setModalShow(false)}
                action={login}
            />
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
            <ToastContainer />
        </>
    );
}

export default Employee;