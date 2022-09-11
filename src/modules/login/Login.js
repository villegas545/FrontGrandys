import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {updateAuth} from '@app/store/reducers/localVariables';
import {Button, Input} from '@components';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as Yup from 'yup';
import {url} from '../../config';

import * as AuthService from '../../services/auth';

const Login = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();
    const [t] = useTranslation();

    const login = async (email, password) => {
        try {
            setAuthLoading(true);
            const token = await AuthService.loginByAuth(email, password);
            const response = await axios.post(`${url}login`, {
                email,
                password
            });
            console.log(response.data.token);
            /*
            localStorage.setItem('user', response.data.user); */
            console.log(token);
            toast.success('Login is succeed!');
            setAuthLoading(false);
            // dispatch(loginUser(response.data.token));
            dispatch(loginUser(token));
            history.push('/');
        } catch (error) {
            setAuthLoading(false);
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed'
            );
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            login(values.email, values.password);
        }
    });

    document.getElementById('root').classList = 'hold-transition login-page';

    const functionLogin = async (e) => {
        try {
            e.preventDefault();
            const token2 = await axios.post(`${url}login`, {
                email: formik.values.email,
                password: formik.values.password
            });
            // eslint-disable-next-line no-constant-condition
            // eslint-disable-next-line no-cond-assign
            // console.log(token2.data.token);
            toast.success('Login is succeed!');
            document.getElementById('root').classList.remove('login-page');
            document.getElementById('root').classList.remove('hold-transition');
            setAuthLoading(false);
            //  console.log(token2.data);
            dispatch(
                loginUser({
                    token: token2.data.token,
                    name: token2.data.user,
                    role: token2.data.role,
                    restaurantApi: token2.data.restaurantApi
                })
            );
            dispatch(
                updateAuth({
                    token: token2.data.token,
                    user: token2.data.user,
                    role: token2.data.role,
                    restaurantApi: token2.data.restaurantApi
                })
            );
            history.push('/');
            /* dispatch(loginUser(token2.data.token));
            history.push('/'); */
        } catch (error) {
            console.log('errir', error);
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed'
            );
        }
    };

    return (
        <div className="login-box">
            <div className="card card-outline card-dark">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <img
                            src="./img/logoGrandys.png"
                            alt="not found"
                            width="180"
                        />
                        <br />
                        <span>ADMIN</span>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">{t('login.label.signIn')}</p>
                    <form onSubmit={(e) => functionLogin(e)}>
                        <div className="mb-3">
                            <Input
                                icon={faEnvelope}
                                placeholder="Email"
                                type="email"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps('email')}
                                value=""
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                icon={faLock}
                                placeholder="Password"
                                type="password"
                                formik={formik}
                                formikFieldProps={formik.getFieldProps(
                                    'password'
                                )}
                                value=""
                            />
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <Button
                                    block
                                    type="submit"
                                    isLoading={isAuthLoading}
                                    className="btn-dark"
                                >
                                    {t('login.button.signIn.label')}
                                </Button>
                            </div>
                        </div>
                    </form>

                    <p className="mb-1 color-dark">
                        <Link to="/forgot-password" className="text-dark">
                            Restore password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
