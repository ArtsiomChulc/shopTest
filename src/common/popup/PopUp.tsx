import React, { useEffect } from 'react';
import s from './popUp.module.scss';

type PropsType = {
    onClose: () => void
    text: string
}


const PopUp = (props: PropsType) => {
    const {onClose} = props

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div className={s.PopUp}>
            <p>{props.text}</p>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default PopUp;