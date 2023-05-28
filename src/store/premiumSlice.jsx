import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPremium: false,
    isDark: false,
};

const premiumSlice = createSlice({
    name: "premium",
    initialState,
    reducers: {
        togglePremium(state) {
            state.isPremium = !state.isPremium;
        },
        toggleTheme(state) {
            state.isDark = !state.isDark;
        },
    },
});

export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;
