import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        login: (state) => {
            state.authenticated = true;
        },
        logout: (state) => {
            state.authenticated = false;
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;