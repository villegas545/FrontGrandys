/* eslint-disable indent */
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux';
import {modalClose} from '@app/store/reducers/usersDucks';
import axios from 'axios';
import BlockUi from 'react-block-ui';
import {url as urlconf} from '../../config/index';

function Modaladduser({action}) {
    const [role, setRolx] = React.useState('');
    const registros = useSelector((store) => store.users.records);
    const [name, setName] = React.useState(registros.name);
    const [email, setEmail] = React.useState(registros.email);
    const [password, setPassword] = React.useState(registros.password);
    const [repeatPassword, setRepeatPassword] = React.useState(
        registros.password
    );
    const [roles, setRole] = React.useState(registros.roles);
    const [restaurant, setRestaurant] = React.useState(
        registros.restaurantApi.replace(/\s+/g, '')
    );
    const [restaurants, setRestaurants] = React.useState([]);
    const [block, setBlock] = useState(false);
    const dispatch = useDispatch();

    const getRestaurants = async () => {
        setBlock(true);
        const response = await axios.get(`${urlconf}restaurant`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        setBlock(false);
        setRestaurants(response.data);
    };
    useEffect(() => {
        getRestaurants();
        if (localStorage.getItem('role') !== 'Employee') {
            setRestaurant(localStorage.getItem('restaurantApi'));
        } else {
            setRestaurant('Empty');
        }
    }, []);

    //! Validacion de manejadores
    const validateMgmt = () => {
        if (
            name === '' ||
            email === '' ||
            password === '' ||
            repeatPassword === '' ||
            roles === '' ||
            roles === 'Empty' ||
            restaurant === '' ||
            restaurant === 'Empty'
        ) {
            return false;
        }
        if (password !== repeatPassword) {
            return false;
        }
        return true;
    };

    //! Validacion de empleado
    const validateEmployee = () => {
        if (
            name === '' ||
            email === '' ||
            roles === '' ||
            roles === 'Empty' ||
            restaurant === '' ||
            restaurant === 'Empty'
        ) {
            return false;
        }

        return true;
    };

    const validate = async () => {
        if (roles !== 'Employee') {
            return validateMgmt();
        }
        return validateEmployee();
    };

    React.useEffect(() => {
        setRolx(localStorage.getItem('role'));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const records = {
            name,
            email,
            password,
            roles,
            restaurantApi: restaurant
        };
        if (validate()) {
            action(records);
            toast.success('Success!');
            setBlock(true);
            await dispatch(modalClose(true));
            setBlock(false);
        } else {
            toast.error('No empty fields allowed or passwords doesn´t match!');
        }
    };

    return (
        <>
            <BlockUi tag="div" blocking={block} message="Please Wait">
                <form onSubmit={submit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                            />
                        </div>
                        {registros.name === '' ? (
                            <>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Password{' '}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Repeat Password
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setRepeatPassword(
                                                    e.target.value
                                                )
                                            }
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={repeatPassword}
                                        />
                                        {password !== repeatPassword ? (
                                            <div className="text-form text-danger">
                                                Password fields doesn´t match
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {role === 'Admin' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Role
                                    </label>

                                    <select
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        className="form-control"
                                        value={roles}
                                    >
                                        <option value="Empty">Select</option>
                                        <option value="Employee">
                                            Employee
                                        </option>
                                        <option value="Manager_Assistant">
                                            Manager Assistant
                                        </option>
                                        <option value="Manager">Manager</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </>
                        ) : null}
                        {role === 'Manager' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Role
                                    </label>

                                    <select
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        className="form-control"
                                        value={roles}
                                    >
                                        <option value="Empty">Select</option>
                                        <option value="Employee">
                                            Employee
                                        </option>
                                        <option value="Manager Assistant">
                                            Manager Assistant
                                        </option>
                                    </select>
                                </div>
                            </>
                        ) : null}
                        {roles !== 'Admin' &&
                        localStorage.getItem('role') === 'Admin' ? (
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                    Restaurant
                                </label>
                                <select
                                    onChange={(e) =>
                                        setRestaurant(e.target.value)
                                    }
                                    className="form-control"
                                    value={restaurant}
                                >
                                    {localStorage.getItem('restaurantApi')}
                                    <option value="Empty">Select</option>
                                    {restaurants.map((mapRestaurant) => (
                                        <option
                                            key={mapRestaurant.id}
                                            value={mapRestaurant.api}
                                        >
                                            {mapRestaurant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                        <div className="form-group">
                            {registros.name === '' ? (
                                <input
                                    type="submit"
                                    className="btn btn-danger"
                                    value="Add user"
                                />
                            ) : (
                                <input
                                    type="submit"
                                    className="btn btn-warning"
                                    value="Update"
                                />
                            )}
                        </div>
                    </div>
                    {/* <!-- /.card-body --> */}
                </form>
            </BlockUi>
        </>
    );
}

export default Modaladduser;
