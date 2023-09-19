import React from 'react';
import s from './loader.module.scss'; // Подключаем стили для Loader

const Loader = () => {
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader} />
        </div>
    );
};

export default Loader;