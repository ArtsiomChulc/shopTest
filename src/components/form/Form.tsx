import React, {useState} from 'react';
import s from './login.module.scss';
import {AppRootStateType} from "App/store";
import {toast} from "react-toastify";
import {RequestStatusType} from "App/appReducer";
import {useSelector} from "react-redux";

import {ReactComponent as Icon} from '../../assets/img/icons/iconForPassword.svg';


type PropsType = {
    title: string
    handleClick: (email: string, password: string) => void
}

const Form = (props: PropsType) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const onClickHandler = (email: string, password: string, name: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;

        if (emailRegex.test(email) && passwordRegex.test(password)) {
            props.handleClick(email, password);
            setName('')
            setEmail('')
            setPassword('')
            toast.info(`Привет ${name}`)
        } else {
            if (!emailRegex.test(email)) {
                toast.error('Invalid email');
            }
            if (!passwordRegex.test(password)) {
                toast.error('Invalid password');
            }
        }
    }

    const onChangeType = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={s.loginContainer}>
            <h2>Вход</h2>
            <form className={s.form} onSubmit={handleSubmit}>
                {props.title === 'Sign Up' ? <div className={s.formGroup}>
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        value={name}
                        onChange={handleNameChange}
                        disabled={status === 'loading'}
                    />
                </div> : ''}
                <div className={s.formGroup}>
                    <label htmlFor="username">E-mail</label>
                    <input
                        type="email"
                        id="username"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={status === 'loading'}
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={status === 'loading'}
                    />
                    <Icon onClick={onChangeType} className={s.icon}/>
                </div>
                <button disabled={status === 'loading'}
                        onClick={() => onClickHandler(email, password, name)}
                        className={`${status === 'loading' ? s.disable : ''}`}
                >{props.title}</button>
            </form>
        </div>
    );
};

export default Form;