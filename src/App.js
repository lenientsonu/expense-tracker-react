import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        title: "Laptop Table",
        amount: 1800,
        date: new Date(2020, 7, 14),
    },
    {
        id: "e2",
        title: "New TV",
        amount: 15000,
        date: new Date(2021, 2, 12),
    },
    {
        id: "e3",
        title: "Car Insurance",
        amount: 2945,
        date: new Date(2021, 2, 28),
    },
    {
        id: "e4",
        title: "New Desk (Wooden)",
        amount: 4500,
        date: new Date(2021, 5, 12),
    },
];

const App = () => {
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    const addExpenseHandler = (expense) => {
        setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    };

    return (
        <div>
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/home'>
                    <NewExpense onAddExpense={addExpenseHandler} />
                    <Expenses items={expenses} />
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
