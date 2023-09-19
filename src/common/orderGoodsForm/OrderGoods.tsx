import React from 'react';
import s from './orderGoods.module.scss'
import {Button} from "@mui/material";
import {Field, InjectedFormProps, reduxForm, reset} from 'redux-form';
import {AppRootStateType, useAppDispatch} from "App/store";
import {sendContactForm} from "common/orderGoodsForm/orderGoodsReducer";
import {useSelector} from "react-redux";
import {CardType} from "type/types";
import {RequestStatusType} from "App/appReducer";
import {maxLengthCreator, required} from "utils/validators";
import {Input} from "components/formControls/FormControl";

export type OrderFormType = {
    name: string
    surname: string
    address: string
    phone: string
}

export type ErrorFormType = {
    name?: string
    surname?: string
    address?: string
    phone?: string
}

type ContactFormType = {
    product: CardType[]
}

const maxLength10 = maxLengthCreator(10);
const maxLength30 = maxLengthCreator(30);
const maxLength100 = maxLengthCreator(100);

let OrderGoods: React.FC<InjectedFormProps<OrderFormType, ErrorFormType>> = ({
    handleSubmit,

    }) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <form onSubmit={handleSubmit} className={s.orderContainer}>
            <label className={s.label}>Name</label>
            <Field validate={[required, maxLength10]} name={'name'} component={Input} type={'text'} />
            <label className={s.label}>Surname</label>
            <Field validate={[required, maxLength10]} name={'surname'} component={Input} type={'text'} />
            <label className={s.label}>Address</label>
            <Field validate={[required, maxLength100]} name={'address'} component={Input} type={'text'} />
            <label className={s.label}>Phone</label>
            <Field validate={[required, maxLength30]} name={'phone'} component={Input} type={'text'} />
            <Button
                type={'submit'}
                variant="outlined"
                disabled={status === 'loading'}
            >Submit</Button>
        </form>
    );
};

const OrderGoodsForm = reduxForm<OrderFormType>({
    form: 'contact'
})(OrderGoods)


export const ContactForm = (props: ContactFormType) => {
    const {product} = props


    const dispatch = useAppDispatch()

    const onSubmit = async (formData: OrderFormType) => {
        const data = {
            formData: formData,
            product: product
        }
        dispatch(sendContactForm(data))
        dispatch(reset('contact'))
    }

    return (
        <div className={s.orderWrapper}>
            <OrderGoodsForm onSubmit={onSubmit}/>
        </div>
    );
};

