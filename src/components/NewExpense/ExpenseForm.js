import React, { useState } from "react";
import axios from "axios";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredCategory, setEnteredCategory] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    };

    const saveToServer = async (expense) => {
        try {
            const response = await axios.post(
                "https://expense-tracker-project-4272a-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
                expense
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            category: enteredCategory,
        };

        // props.onSaveExpenseData(expenseData);
        saveToServer(expenseData);
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredCategory("");
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input
                        type='text'
                        value={enteredTitle}
                        onChange={titleChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input
                        type='number'
                        min='0.01'
                        step='0.01'
                        value={enteredAmount}
                        onChange={amountChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Category</label>
                    <select
                        name='category'
                        value={enteredCategory}
                        onChange={categoryChangeHandler}
                    >
                        <option value='food'>Food</option>
                        <option value='bills'>Bills</option>
                        <option value='petrol'>Petrol</option>
                        <option value='travel'>Travel</option>
                    </select>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
