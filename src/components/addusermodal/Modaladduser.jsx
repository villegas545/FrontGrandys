import React, {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux';
import {modalClose} from '@app/store/reducers/usersDucks';
import axios from 'axios';
import {url as urlconf} from '../../config/index';

function Modaladduser({action}) {
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
    const dispatch = useDispatch();

    const getRestaurants = async () => {
        const response = await axios.get(`${urlconf}restaurant`, {
            headers: {
                authorization: `bearerHeader: ${localStorage.getItem('token')}`
            }
        });
        setRestaurants(response.data);
    };
    useEffect(() => {
        getRestaurants();
        console.log(registros);
    }, []);
    useEffect(() => {
        if (roles === 'Admin') {
            setRestaurant('803e93eae8c5f709ba4d91bb7f09A796');
        } else {
            setRestaurant('Empty');
        }
    }, [roles]);
    const validate = async () => {
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

    const notifyError = () =>
        toast('No empty fields allowed or passwords doesn´t match', {
            theme: 'colored',
            type: 'error',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

    const notify = () =>
        toast('Success', {
            theme: 'colored',
            type: 'success',
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

    const submit = async (e) => {
        e.preventDefault();
        if (await validate()) {
            const records = {
                name,
                email,
                password,
                roles,
                restaurantApi: restaurant
            };
            action(records);
            notify();
            await dispatch(modalClose(true));
        } else {
            notifyError();
        }
    };

    return (
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
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                    />
                </div>
                {registros.name === '' ? (
                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                                Password{' '}
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
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
                                    setRepeatPassword(e.target.value)
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
                ) : null}

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Role</label>
                    <select
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        value={roles}
                    >
                        <option value="Empty">Select</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                {roles === 'Employee' ? (
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                            Restaurant
                        </label>
                        <select
                            onChange={(e) => setRestaurant(e.target.value)}
                            className="form-control"
                            value={restaurant}
                        >
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
            <ToastContainer />
        </form>
    );
}

export default Modaladduser;
