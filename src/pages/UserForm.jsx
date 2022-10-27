import React from 'react';
import {useForm} from 'react-hook-form';

const UserForm = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = (values) => {
        localStorage.setItem('token', values.token);
        localStorage.setItem('role', values.role);
        localStorage.setItem('restaurantApi', values.restaurantApi);
        localStorage.setItem('user', values.user);
        localStorage.setItem('id', values.idUser);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                Role
                <input
                    type="text"
                    {...register('role')}
                    defaultValue={localStorage.getItem('role')}
                />
                Token
                <input
                    type="text"
                    {...register('token')}
                    defaultValue={localStorage.getItem('token')}
                />
                Restaurant
                <input
                    type="text"
                    {...register('restaurantApi')}
                    defaultValue={localStorage.getItem('restaurantApi')}
                />
                User
                <input
                    type="text"
                    {...register('user')}
                    defaultValue={localStorage.getItem('user')}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default UserForm;
