import React from 'react';
import s from './checkOut.module.scss';
import {ContactForm} from "common/orderGoodsForm/OrderGoods";
import Card from "../../components/card/Card";
import {CardType} from "type/types";
import {Link} from "react-router-dom";

type PropsType = {
    product: CardType[]
    data: CardType[] | null
    addToCart: (x: CardType[], id: string) => void
    disabled: boolean
}

const CheckOut = (props: PropsType) => {
    return (
        <div className={s.checkOutWrapper}>
            {props.product.length === 0 ?
                <div className={s.infoTitle}>
                    <span>Вы пока ничего не добавили в корзину.</span>
                    <Link to={'/product'}>Добавьте что-нибудь</Link>
                </div>
                : <div className={s.infoTitle}>В вашей корзине: <span>{props.product.length}</span> товаров</div>}
            <ContactForm product={props.product}/>
            <div className={s.cardCheckOut}>
                <Card data={props.data} disabled={props.disabled} addToCart={props.addToCart}/>
            </div>
        </div>
    );
};

export default CheckOut;