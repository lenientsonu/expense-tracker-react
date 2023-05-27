import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { expenseActions } from "../../store/expenseSlice";

import "./EditForm.css";

const ExpenseForm = (props) => {
    const dispatch = useDispatch();
    const [enteredTitle, setEnteredTitle] = useState(props.title);
    const [enteredAmount, setEnteredAmount] = useState(props.amount);
    const [enteredCategory, setEnteredCategory] = useState(props.category);

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    };

    const updateOnServer = async (expense) => {
        try {
            const response = await axios.put(
                `https://expense-tracker-project-4272a-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${props.id}.json`,
                expense
            );
            console.log(response.data);
            dispatch(
                expenseActions.editExpense({
                    id: props.id,
                    ...expense,
                })
            );
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

        updateOnServer(expenseData);
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredCategory("");
        props.onCancel();
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
                <button type='submit'>Update Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
