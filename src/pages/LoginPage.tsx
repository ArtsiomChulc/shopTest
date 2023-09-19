import React from 'react';
import {Link} from "react-router-dom";
import Login from "../components/form/Login";


const LoginPage = () => {
    return (
        <div style={{margin: '0 auto'}}>
            <h1>Login</h1>
            <Login />
            <p>
                Or <Link to={'/register'}>Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;