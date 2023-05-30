import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import premiumReducer from "./premiumSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        premium: premiumReducer,
        ui: uiReducer,
    },
});

export default store;
