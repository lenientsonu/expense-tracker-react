import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn: localStorage.getItem("token") !== null,
    userToken: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userToken = action.payload.token;
            state.email = action.payload.email;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", action.payload.email);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userToken = "";
            state.email = "";
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
