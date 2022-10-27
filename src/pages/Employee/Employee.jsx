import React, {useEffect, useState} from 'react';

import {Modal} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import {updateAuth} from '@app/store/reducers/localVariables';
import {useDispatch} from 'react-redux';
import {changeReactLoading} from '@app/store/reducers/reactLoadingDucks';
import {url as urlconf} from '../../config';
import EmployeeTab from './EmployeeTab';

const ModalPinCode = ({show, onHide, action}) => {
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
                            type="password"
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
};
function Employee() {
    const [modalShow, setModalShow] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setModalShow(true);
    }, []);

    const login = async (pinCode) => {
        dispatch(changeReactLoading(true));
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
                //  setUser(respuesta.data);
                localStorage.setItem('role', respuesta.data.role);
                localStorage.setItem('token', respuesta.data.token);
                localStorage.setItem('user', respuesta.data.user);
                localStorage.setItem(
                    'restaurantApi',
                    respuesta.data.restaurantApi
                );
                localStorage.setItem('idUser', respuesta.data.idUser);
                dispatch(
                    updateAuth({
                        role: respuesta.data.role,
                        token: respuesta.data.token,
                        user: respuesta.data.user,
                        restaurantApi: respuesta.data.restaurantApi,
                        idUser: respuesta.data.idUser
                    })
                );
                setUser('algo');
                setModalShow(false);
            } else {
                toast.error('Incorrect pincode!');
            }
            console.log(respuesta);
        } catch (err) {
            toast.error('Incorrect pincode!');
            console.log(err);
        }
        dispatch(changeReactLoading(false));
    };
    return (
        <>
            {user ? (
                <>
                    <EmployeeTab />
                </>
            ) : null}

            <ModalPinCode
                show={modalShow}
                onHide={() => setModalShow(false)}
                action={login}
            />
        </>
    );
}

export default Employee;
