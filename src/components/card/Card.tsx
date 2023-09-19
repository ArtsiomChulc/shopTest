import React from 'react';
import s from './card.module.scss';
import {Button} from "@mui/material";
import {CardType} from "type/types";

export type CardPropsType = {
    data: CardType[] | null
    addToCart: (x: CardType[], id: string) => void
    disabled: boolean
}

const Card = (props: CardPropsType) => {
    return (
        <>
            {
                props.data?.map(el => {
                    const addToCart = (el: CardType[], id: string) => {
                        props.addToCart(el, id)
                    }
                    return (
                            <div key={el.id} className={`${s.container} ${props.disabled ? s.disabled : ''}`}>
                                <div className={s.wrapper}>
                                    <div className={s.imgBlock}>
                                        <img src={el.img} alt="noteBook"/>
                                    </div>
                                    <div className={s.description}>
                                        <p className={s.descText}>{el.description}</p>
                                    </div>
                                    <div className={s.price}>
                                        <span>Brand: {el.brand}</span>
                                    </div>
                                    <div className={s.price}>
                                        <span>Price: {el.price} $</span>
                                    </div>
                                    <Button
                                        disabled={props.disabled}
                                        onClick={() => addToCart([el], el.id)}
                                        className={s.btn}
                                        variant="outlined"
                                        size="medium"
                                        color={'info'}>
                                        Добавить в корзину
                                    </Button>
                                </div>
                            </div>
                    )
                })
            }
        </>
    );
};

export default Card;

