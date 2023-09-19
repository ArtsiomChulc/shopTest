import {createSlice} from "@reduxjs/toolkit";
import {CardType} from "type/types";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {supabase} from "dataBase/createSupaBase";
import {appActions} from "App/appReducer";
import {PostgrestSingleResponse} from "@supabase/supabase-js";

const slice = createSlice({
    name: "cards",
    initialState: [] as CardType[],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.fulfilled, (_, action) => {
                return action.payload
            })
    }
})

export const fetchCards = createAppAsyncThunk("cards/fetchCards",
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appActions.setAppStatus({status: "loading"}))

        try {
            let {data}: PostgrestSingleResponse<CardType[]> = await supabase
                .from('shopCard')
                .select('*')

            if (data) {
                return data
            }
            dispatch(appActions.setAppStatus({status: "succeeded"}))
        } catch (e) {
            return rejectWithValue(null)
        }
    })


export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;