import {configureStore} from "@reduxjs/toolkit";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction, combineReducers} from "redux";
import {useDispatch} from "react-redux";
import {cardsReducer} from "components/card/cardsReduser";
import { reducer as formReducer } from 'redux-form'
import {orderGoodsReducer} from "common/orderGoodsForm/orderGoodsReducer";
import {appReducer} from "App/appReducer";
import {adminReducer} from "common/admin/adminReducer";
import {userReducer} from "App/user-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    cards: cardsReducer,
    form: formReducer,
    sendContact: orderGoodsReducer,
    admin: adminReducer,
    user: userReducer
});

// непосредственно создаём store / redux-toolkit
export const store = configureStore({
    reducer: rootReducer,
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
