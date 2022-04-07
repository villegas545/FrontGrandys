import React from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button} from '@components';
import {toast} from 'react-toastify';
import axios from 'axios';
import {url} from '../../config';
/* import {useParams} from 'react-router'; */

/* import {faEnvelope} from '@fortawesome/free-solid-svg-icons'; */

const ResetPassword = () => {
    const history = useHistory();
    const {token} = useParams();
    console.log(token);
    const [t] = useTranslation();

    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');

    const validate = async () => {
        if (password === '' || repeatPassword === '') {
            return false;
        }
        if (password !== repeatPassword) {
            return false;
        }
        return true;
    };
    const resetPassowrd = (event) => {
        event.preventDefault();
        validate();
        try {
            axios.post(`${url}resetpassword`, {
                password,
                token
            });
            toast.success('Your password was changed successfully!');
            history.push('/');
            // eslint-disable-next-line no-console
        } catch (error) {
            toast.error(
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    'Failed'
            );
        }
    };
    document.getElementById('root').classList = 'hold-transition login-page';

    return (
        <div className="login-box">
            <div className="card card-outline card-dark">
                <div className="card-header text-center">
                    <Link to="/" className="h1">
                        <img
                            src=".././img/logoGrandys.png"
                            alt="not found"
                            width="180"
                        />
                        <br />
                    </Link>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">
                        {t('recover.forgotYourPassword')}
                    </p>
                    <form onSubmit={resetPassowrd}>
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
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    type="submit"
                                    block
                                    className="btn-danger"
                                >
                                    Save new Password
                                </Button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-3 mb-1 ">
                        <Link to="/login" className="text-dark">
                            Go back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
