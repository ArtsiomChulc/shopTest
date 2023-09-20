import React from 'react';
import {Link} from "react-router-dom";
import SignUp from "../components/form/SignUp";

const RegisterPage = () => {
    return (
        <div style={{margin: '0 auto'}}>
            <h1>Register Page</h1>
            <SignUp/>
            <p>
                Already have a account? <Link to={'/login'}>Sign in</Link>
            </p>
        </div>
    );
};

export default RegisterPage;