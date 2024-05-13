import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../combine_action_creator';
import { Homenavbar } from '../components/home_navbar';
import '../css/login.css';

export const AdminLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { Login } = bindActionCreators(actionCreators, dispatch);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const adminData = useSelector((state) => state.admin.data);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Please enter email and password");
        } else {
            Login(password); // Are you sure you want to pass password here?
            if (adminData.email === email && adminData.password === password) {
                history.push({ pathname: "/todaybookrequest" });
            } else {
                alert("Invalid email or password");
            }
        }
    };

    return (
        <div>
            <Homenavbar />
            <div className="container">
                <h3>ADMIN LOGIN</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};
