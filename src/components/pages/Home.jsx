import React, { useState } from "react";

import NewExpense from "../NewExpense/NewExpense";
import Expenses from "../Expenses/Expenses";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        title: "Laptop Table",
        amount: 1800,
        date: new Date(2020, 7, 14),
        category: "bills",
    },
    {
        id: "e2",
        title: "New TV",
        amount: 15000,
        date: new Date(2021, 2, 12),
        category: "bills",
    },
    {
        id: "e3",
        title: "Car Insurance",
        amount: 2945,
        date: new Date(2021, 2, 28),
        category: "petrol",
    },
    {
        id: "e4",
        title: "New Desk (Wooden)",
        amount: 4500,
        date: new Date(2021, 5, 12),
        category: "bills",
    },
];

const Homepage = (props) => {
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    };

    return (
        <>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </>
    );
};

export default Homepage;
