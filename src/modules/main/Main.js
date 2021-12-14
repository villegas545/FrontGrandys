import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import {loadUser, logoutUser} from '@store/reducers/auth';
import {toggleSidebarMenu} from '@app/store/reducers/ui';

// import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';
import Checks from '@app/pages/Checks';
import Users from '@app/pages/Users';
import Rests from '@app/pages/Rests';
import Csv from '@app/pages/Csv';

import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';

const Main = () => {
    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const fetchProfile = async () => {
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
    const logoutFunction = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
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
                            <Route exact path="/sub-menu-2" component={Blank} />
                            <Route
                                exact
                                path="/sub-menu-1"
                                component={SubMenu}
                            />
                            <Route exact path="/blank" component={Blank} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/users" component={Users} />
                            <Route
                                exact
                                path="/Restaurants"
                                component={Rests}
                            />
                            <Route exact path="/" component={Checks} />
                            <Route exact path="/Checks" component={Checks} />
                            <Route exact path="/Csv" component={Csv} />
                            <Route
                                exact
                                path="/logout"
                                component={logoutFunction}
                                onEnter={() => logoutFunction()}
                            />
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
