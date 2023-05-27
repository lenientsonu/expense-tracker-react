import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { expenseActions } from "../../store/expenseSlice";

import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

const Expenses = (props) => {
    const dispatch = useDispatch();
    const total = useSelector((state) => state.expenses.expenseTotal);

    const getFromServer = useCallback(async () => {
        try {
            const response = await axios.get(
                "https://expense-tracker-project-4272a-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
            );

            Object.keys(response.data).forEach((key) => {
                dispatch(
                    expenseActions.addExpense({
                        id: key,
                        ...response.data[key],
                    })
                );
            });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getFromServer();
    }, [getFromServer]);

    return (
        <div>
            <Card className='expenses'>
                {total > 10000 && (
                    <Card className='premium-btn'>
                        <h4>Activate Premium</h4>
                    </Card>
                )}
                <ExpensesList />
                <Card className='total'>
                    <h1>Total: {total}</h1>
                </Card>
            </Card>
        </div>
    );
};

export default Expenses;
