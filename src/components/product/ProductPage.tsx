import React, {FC} from 'react';
import Card from "components/card/Card";
import {CardType} from "type/types";
import Loader from "common/loader/Loader";

type PropType = {
    data: CardType[] | null
    addToCart: (x: CardType[], id: string) => void
    showPopUp: boolean
}

const ProductPage: FC<PropType> = ({data, showPopUp, addToCart}) => {
    // const dispatch = useAppDispatch()

    if (!data?.length) {
        return <Loader/>
    }

    return (
        <>
            <h1 style={{margin: '20px auto'}}>Product Page</h1>
            <div style={{margin: '0 auto', display: 'flex', flexWrap: 'wrap'}}>
                <Card
                    disabled={showPopUp}
                    data={data}
                    addToCart={addToCart}
                />
            </div>
        </>
    );
};

export default ProductPage;