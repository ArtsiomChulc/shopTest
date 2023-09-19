import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from "App/store";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Form from "../../components/form/Form";
import {setUser} from "App/user-reducer";
import {toast} from "react-toastify";
import {appActions} from "App/appReducer";
import Loader from "common/loader/Loader";

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth()
        dispatch(appActions.setAppStatus({status: 'loading'}))
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    isAuth: true,
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                const authData = {isAuth: true, email: user.email, id: user.uid, token: user.refreshToken}
                localStorage.setItem('authData', JSON.stringify(authData))
                navigate('/product')
            })
            .catch((error) => toast.error(error.message))
    }

    useEffect(() => {
        const authData = localStorage.getItem('authData');
        if (authData) {
            dispatch(setUser(JSON.parse(authData)));
            navigate('/product');
        } else {
            setIsLoading(false)
        }
    }, [dispatch, navigate]);

    if (isLoading) return <Loader/>

    return (
        <div>
            <Form title={'Sign In'} handleClick={handleLogin} />
        </div>
    );
};

export default Login;