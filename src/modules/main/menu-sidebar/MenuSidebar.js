/* eslint-disable indent */
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export const MENU = [
    {
        name: 'Reports',
        path: '/checks',
        icon: 'fa-chart-bar'
    },
    {
        name: 'Daily load',
        path: '/Csv',
        icon: 'fa-file-excel'
    },
    {
        name: 'Employee',
        path: '/employee',
        icon: 'fa-user-lock'
    },
    {
        name: 'Logout',
        path: '/logout',
        icon: 'fa-sign-out-alt'
    }
];
export const MENUADMIN = [
    {
        name: 'Users',
        path: '/Users',
        icon: 'fa-users'
    },
    {
        name: 'Restaurants',
        path: '/Restaurants',
        icon: 'fa-home'
    },
    {
        name: 'Reports',
        path: '/checks',
        icon: 'fa-chart-bar'
    },
    {
        name: 'Employee',
        path: '/employee',
        icon: 'fa-user-lock'
    },
    {
        name: 'Logout',
        path: '/logout',
        icon: 'fa-sign-out-alt'
    }
];

const MenuSidebar = () => {
    const [userGrandys, setUser] = React.useState('');
    const [role, setRole] = React.useState('');
    useEffect(() => {
        setRole(localStorage.getItem('role'));
        setUser(localStorage.getItem('user'));
    }, []);
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <aside className="main-sidebar position-fixed sidebar-dark-danger elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="Grandys Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">
                    Grandy´s Chicken
                </span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <span className="d-block text-light ">
                            {userGrandys}
                        </span>
                    </div>
                </div>
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                    >
                        {role === 'Admin'
                            ? MENUADMIN.map((menuItem) => (
                                  <MenuItem
                                      key={menuItem.name}
                                      menuItem={menuItem}
                                  />
                              ))
                            : MENU.map((menuItem) => (
                                  <MenuItem
                                      key={menuItem.name}
                                      menuItem={menuItem}
                                  />
                              ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
