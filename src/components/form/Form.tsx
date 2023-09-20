import React, {useEffect, useState} from 'react';
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
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false)

    useEffect(() => {
        setPasswordError(false);
    }, [password, repeatPassword]);

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

    const handlePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setPasswordError(!passwordError)
        }
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
                toast.error('Пароль должен содержать цифры и иметь хотя бы одну заглавную и одну прописную букву');
            }
        }
    }

    const onChangeType = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={s.loginContainer}>
            <h2>{props.title === 'Sign Up' ? 'Регистрация' : 'Вход'}  </h2>
            <form className={s.form} onSubmit={handleSubmit}>
                {props.title === 'Sign Up' ? <div className={s.formGroup}>
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        placeholder={'Введите свое имя'}
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
                        placeholder={'Введите свой E-mail'}
                        id="username"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={status === 'loading'}
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={s.passwordInput}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder={'Пример: 123456789Qh'}
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={status === 'loading'}
                    />
                    <div onClick={onChangeType}
                         className={s.iconShowPassword}
                         onMouseDown={(e) => e.preventDefault()}
                    >
                        <Icon className={s.icon}/>
                        <span>Показать пароль</span>
                    </div>
                </div>
                {props.title === 'Sign Up' ? <div className={s.formGroup}>
                    <label htmlFor="password">Repeat password</label>
                    <input
                        className={s.passwordInput}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder={'Введите пароль еще раз'}
                        value={repeatPassword}
                        onChange={handlePasswordRepeat}
                        disabled={status === 'loading'}
                    />
                </div> : ''}
                {passwordError && <span className={s.errorPassword}>Пароли не совпадают</span>}
                <button disabled={status === 'loading'}
                        onClick={() => onClickHandler(email, password, name)}
                        className={`${status === 'loading' ? s.disable : ''}`}
                >{props.title}</button>
            </form>
        </div>
    );
};

export default Form;