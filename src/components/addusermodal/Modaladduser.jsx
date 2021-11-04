import React from 'react';
import axios from 'axios';

function Modaladduser() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [roles, setRole] = React.useState('Employee');
    const [message, setMessage] = React.useState(false);

    const submit = async (e) => {
        e.preventDefault();
        const records = {
            name,
            email,
            password,
            roles
        };
        await axios.post('http://localhost:5000/api/user', records);
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Role</label>
                    <select
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                    >
                        <option>Employee</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-danger"
                        value="Submit"
                    />
                </div>
            </div>
            {/* <!-- /.card-body --> */}
            {message ? <div>Registered</div> : null}
        </form>
    );
}

export default Modaladduser;
