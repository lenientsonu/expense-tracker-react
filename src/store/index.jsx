import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import premiumReducer from "./premiumSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        premium: premiumReducer,
    },
});

export default store;
