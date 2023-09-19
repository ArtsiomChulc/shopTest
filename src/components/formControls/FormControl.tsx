import React from "react";

import s from '../../common/orderGoodsForm/orderGoods.module.scss'

interface InputProps {
    input: any;
    meta: any;
    type: string;
}

export const Input: React.FC<InputProps> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};
