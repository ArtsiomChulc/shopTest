import React, {useState} from 'react';
import styles from './login.module.scss';
import {AppRootStateType} from "App/store";
import {toast} from "react-toastify";
import {RequestStatusType} from "App/appReducer";
import {useSelector} from "react-redux";

type PropsType = {
    title: string
    handleClick: (email: string, password: string) => void
}

const Form = (props: PropsType) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <div className={styles.loginContainer}>
            <h2>Вход</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {props.title === 'Sign Up' ? <div className={styles.formGroup}>
                    <label htmlFor="username">Имя</label>
                    <input
                        type="text"
                        id="username"
                        value={name}
                        onChange={handleNameChange}
                        disabled={status === 'loading'}
                    />
                </div> : ''}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Электронная почта</label>
                    <input
                        type="email"
                        id="username"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={status === 'loading'}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={status === 'loading'}
                    />
                </div>
                <button disabled={status === 'loading'}
                        onClick={() => onClickHandler(email, password, name)}
                        className={`${status === 'loading' ? styles.disable : ''}`}
                >{props.title}</button>
            </form>
        </div>
    );
};

export default Form;