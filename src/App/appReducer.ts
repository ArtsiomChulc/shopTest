import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "app",
    initialState: {status: "idle" as RequestStatusType},
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        }
    }
})


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";


export const appReducer = slice.reducer;
export const appActions = slice.actions;