import React from 'react';
import {useSelector} from 'react-redux';

function Modaladduser({action}) {
    const registros = useSelector((store) => store.users.records);
    const [name, setName] = React.useState(registros.name);
    const [email, setEmail] = React.useState(registros.email);
    const [password, setPassword] = React.useState(registros.password);
    const [roles, setRole] = React.useState(registros.roles);
    const [message, setMessage] = React.useState(false);

    const submit = async (e) => {
        e.preventDefault();
        const records = {
            name,
            email,
            password,
            roles
        };
        action(records);
        /* await axios.post('http://localhost:5000/api/user', records); */
        setMessage(true);
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Role</label>
                    <select
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        value={roles}
                    >
                        <option>Employee</option>
                        <option>Admin</option>
                    </select>
                </div>
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
            {message ? <div className="text-success">Success</div> : null}
        </form>
    );
}

export default Modaladduser;
