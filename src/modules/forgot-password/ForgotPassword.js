import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {Button} from '@components';
import axios from 'axios';
import {url} from '../../config';
/* import {faEnvelope} from '@fortawesome/free-solid-svg-icons'; */

const ForgotPassword = () => {
    const [t] = useTranslation();

    const [email, setEmail] = React.useState('');

    const requestNewPassword = (event) => {
        event.preventDefault();
        try {
            axios.post(`${url}restorepassword`, {
                email
            });
            toast.success('Go to your email to reset your password');
            // eslint-disable-next-line no-console
            console.log(email);
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
                            src="./img/logoGrandys.png"
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
                    <form onSubmit={requestNewPassword}>
                        <input
                            className="mb-3 input-group"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <div className="row">
                            <div className="col-12">
                                <Button
                                    type="submit"
                                    block
                                    className="btn-danger"
                                >
                                    {t('recover.requestNewPassword')}
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

export default ForgotPassword;
