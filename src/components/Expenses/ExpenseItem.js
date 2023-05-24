import React, { useState } from "react";
import axios from "axios";

import EditForm from "./EditForm";

import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    const deleteFromServer = async (id) => {
        try {
            const response = await axios.delete(
                `https://expense-tracker-project-4272a-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`
            );
            console.log(response.data);
            console.log("expense successfully deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteExpenseHandler = (event) => {
        event.preventDefault();
        deleteFromServer(props.id);
    };

    const editExpenseHandler = (event) => {
        event.preventDefault();
        startEditingHandler();
    };

    return (
        <li>
            {!isEditing && (
                <Card className='expense-item'>
                    <div className='expense-item__description'>
                        <h2>{props.title}</h2>
                        <h3>{props.category}</h3>
                        <div className='expense-item__price'>
                            ₹{props.amount}
                        </div>
                        <button onClick={editExpenseHandler}>Edit</button>
                        <button
                            className='delete-btn'
                            onClick={deleteExpenseHandler}
                        >
                            X
                        </button>
                    </div>
                </Card>
            )}
            {isEditing && (
                <EditForm
                    onCancel={stopEditingHandler}
                    id={props.id}
                    title={props.title}
                    amount={props.amount}
                    date={props.date}
                    category={props.category}
                />
            )}
        </li>
    );
};

export default ExpenseItem;
