import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {modalClose} from '@app/store/reducers/restsDucks';
import BlockUi from 'react-block-ui';

function Modaladdrest({action}) {
    const registros = useSelector((store) => store.rest.records);
    const [name, setName] = React.useState(registros.name);
    const [location, setLocation] = React.useState(registros.location);
    const [api, setApi] = React.useState(registros.api);
    const [password, setPassword] = React.useState(registros.password);
    const [userName, setUserName] = React.useState(registros.userName);
    const [block, setBlock] = useState(false);
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
        if (validate()) {
            const records = {
                name,
                location,
                api,
                password,
                userName
            };
            action(records);
            toast.success('Success!');
            setBlock(true);
            await dispatch(modalClose(true));
            setBlock(false);
        } else {
            toast.error('No empty fields allowed or passwords doesn´t match');
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
                            <label htmlFor="exampleInputPassword1">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                                User Name
                            </label>
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
            </BlockUi>
        </>
    );
}

export default Modaladdrest;
