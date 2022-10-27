/* eslint-disable indent */
import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import {loadUser, logoutUser} from '@store/reducers/auth';
import {toggleSidebarMenu} from '@app/store/reducers/ui';
import {updateAuth} from '@app/store/reducers/localVariables';
import axios from 'axios';

// import Dashboard from '@pages/Dashboard';

import Checks from '@app/pages/Checks';
import Users from '@app/pages/Users';
import Rests from '@app/pages/Rests';
import Csv from '@app/pages/Csv';
import Employee from '@app/pages/Employee/Employee';
import UserForm from '@app/pages/UserForm';
import {url as urlconf} from '../../config/index';

import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';

const Main = () => {
    //  const [role, setRole] = React.useState('');
    /*   useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []); */
    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const authVariable = useSelector((state) => state.localVariables);
    const logoutFunction = () => {
        console.log('click');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('restaurantApi');
        localStorage.removeItem('idUser');
        dispatch(updateAuth({}));
        setIsAppLoaded(true);
        window.location.href = '/';
    };
    const fetchProfile = async () => {
        try {
            await axios.get(`${urlconf}validate`, {
                headers: {
                    authorization: `bearerHeader: ${localStorage.getItem(
                        'token'
                    )}`
                }
            });
            dispatch(
                updateAuth({
                    token: localStorage.token,
                    user: localStorage.user,
                    role: localStorage.role,
                    restaurantApi: localStorage.restaurantApi,
                    idUser: localStorage.idUser
                })
            );
            console.log('validate');
            setIsAppLoaded(true);
        } catch (error) {
            logoutFunction();
        }
        try {
            const response = await Gatekeeper.getProfile();
            dispatch(loadUser(response));
            setIsAppLoaded(true);
        } catch (error) {
            dispatch(logoutUser());
            setIsAppLoaded(true);
        }
    };

    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');

        fetchProfile();
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarMenuCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarMenuCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }
        return (
            <>
                <Header toggleMenuSidebar={handleToggleMenuSidebar} />
                <MenuSidebar />
                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route
                                exact
                                path="/employee"
                                component={Employee}
                            />
                            <Route
                                exact
                                path="/userForm"
                                component={UserForm}
                            />
                            <Route
                                exact
                                path="/logout"
                                component={logoutFunction}
                                onEnter={() => logoutFunction()}
                            />
                            <Route exact path="/" component={() => <></>} />

                            {authVariable.role === 'Manager' ||
                            authVariable.role === 'Manager Assistant' ||
                            authVariable.role === 'Admin' ? (
                                <>
                                    <Route
                                        exact
                                        path="/users"
                                        component={Users}
                                    />
                                    {authVariable.role === 'Admin' ? (
                                        <Route
                                            exact
                                            path="/Restaurants"
                                            component={Rests}
                                        />
                                    ) : null}
                                    <Route
                                        exact
                                        path="/Checks"
                                        component={Checks}
                                    />
                                    {authVariable.role === 'Manager' ||
                                    authVariable.role ===
                                        'Manager Assistant' ? (
                                        <Route
                                            exact
                                            path="/Csv"
                                            component={Csv}
                                        />
                                    ) : null}
                                </>
                            ) : null}

                            {/* <Redirect
                                        to={{
                                            pathname: '/Csv'
                                        }}
                                    /> */}
                            <Route path="/" component={Employee} />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
