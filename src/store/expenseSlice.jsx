import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: [],
    expenseTotal: 0,
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            state.expenses.push(action.payload);
            calculateExpenseTotal(state);
        },
        removeExpense(state, action) {
            state.expenses = state.expenses.filter(
                (expense) => expense.id !== action.payload
            );
            calculateExpenseTotal(state);
        },
        editExpense(state, action) {
            const { id, ...expense } = action.payload;
            const index = state.expenses.findIndex(
                (expense) => expense.id === id
            );
            if (index !== -1) {
                state.expenses[index] = {
                    ...state.expenses[index],
                    ...expense,
                };
            }
            calculateExpenseTotal(state);
        },
    },
});

const calculateExpenseTotal = (state) => {
    let total = 0;
    state.expenses.forEach((expense) => {
        total += Number(expense.amount);
    });
    state.expenseTotal = total;
};

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
