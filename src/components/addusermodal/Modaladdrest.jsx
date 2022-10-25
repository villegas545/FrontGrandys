import React from 'react';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {modalClose} from '@app/store/reducers/restsDucks';

function Modaladdrest({action}) {
    const registros = useSelector((store) => store.rest.records);
    const [name, setName] = React.useState(registros.name);
    const [location, setLocation] = React.useState(registros.location);
    const [api, setApi] = React.useState(registros.api);
    const [password, setPassword] = React.useState(registros.password);
    const [userName, setUserName] = React.useState(registros.userName);
    const dispatch = useDispatch();

    const validate = () => {
        if (
            name === '' ||
            location === '' ||
            api === '' ||
            password === '' ||
            userName === ''
        ) {
            return false;
        }

        return true;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (await validate()) {
            const records = {
                name,
                location,
                api,
                password,
                userName
            };
            action(records);
            toast.success('Success!');
            await dispatch(modalClose(true));
        } else {
            toast.error('No empty fields allowed or passwords doesn´t match');
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
                    <label htmlFor="exampleInputEmail1">Location</label>
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Location"
                        value={location}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Api </label>
                    <input
                        onChange={(e) => setApi(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Api"
                        value={api}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">User Name</label>
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter User Name"
                        value={userName}
                    />
                </div>
                <div className="form-group">
                    {registros.name === '' ? (
                        <input
                            type="submit"
                            className="btn btn-danger"
                            value="Add Restaurant Api"
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
    );
}

export default Modaladdrest;
