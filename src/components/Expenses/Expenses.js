import React, { useState, useEffect, useCallback } from "react";

import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";
import axios from "axios";

const Expenses = (props) => {
    const [expenses, setExpenses] = useState([]);

    const getFromServer = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://expense-tracker-project-4272a-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
            );
            const expensesArray = Object.keys(response.data).map((key) => {
                return {
                    id: key,
                    ...response.data[key],
                };
            });
            setExpenses(expensesArray);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getFromServer();
    }, [getFromServer]);

    return (
        <div>
            <Card className='expenses'>
                <ExpensesList items={expenses} />
            </Card>
        </div>
    );
};

export default Expenses;
