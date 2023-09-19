import {createSlice} from "@reduxjs/toolkit";
import {AdminType} from "type/types";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {toast} from "react-toastify";
import {supabase} from "dataBase/createSupaBase";

const slice = createSlice({
    name: 'admin',
    initialState: [] as AdminType[],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAdminData.fulfilled, (_, action) => {
            return action.payload?.data
        })
        builder.addCase(deleteAdminData.fulfilled, (_, action) => {
            return action.payload
        })
    }
})

export const fetchAdminData = createAppAsyncThunk<any, any>('admin/fetchAdminData',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            let data = await supabase
                .from('user_products')
                .select('*')
            if (data.data) {
                return data
            }
        } catch (e) {
            return rejectWithValue(null)
        }
    })

export const deleteAdminData = createAppAsyncThunk<any, string>('admin/deleteAdminData',
    async (surname: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const {error} = await supabase
                .from('user_products')
                .delete()
                .eq('surname', surname)
            error ? toast.error(error?.message) : toast.success('Data was delete')
        } catch (e) {
            return rejectWithValue("error")
        }
    })

export const adminReducer = slice.reducer;
export const adminActions = slice.actions;