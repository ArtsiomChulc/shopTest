import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type userAuthType = {
    isAuth?: boolean
    email?: string | null,
    token?: any,
    id?: string | null
}

const slice = createSlice({
    name: 'user',
    initialState: {} as userAuthType,
    reducers: {
        setUser(state, action: PayloadAction<userAuthType>) {
            state.isAuth = true;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.isAuth = false;
            state.email = null;
            state.token = null;
            state.id = null;
        }
    }
})

export const {setUser, removeUser} = slice.actions;
export const userReducer =  slice.reducer