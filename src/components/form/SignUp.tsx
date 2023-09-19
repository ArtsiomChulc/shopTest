import React from 'react';
import Form from "../../components/form/Form";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useAppDispatch} from "App/store";
import {setUser} from "App/user-reducer";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const createUser = (email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    isAuth: true,
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }))
                navigate('/login')
            })
            .catch((err) => toast.error('incorrect email or such user exists in the system'))
    }

    return (
        <div>
            <Form title={'Sign Up'} handleClick={createUser}/>
        </div>
    );
};

export default SignUp;