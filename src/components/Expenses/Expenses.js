import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ReactSwitch from "react-switch";

import { expenseActions } from "../../store/expenseSlice";
import { premiumActions } from "../../store/premiumSlice";

import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";

import "./Expenses.css";

const Expenses = (props) => {
    const dispatch = useDispatch();
    const total = useSelector((state) => state.expenses.expenseTotal);
    const isPremium = useSelector((state) => state.premium.isPremium);
    const isDark = useSelector((state) => state.premium.isDark);
    const expenses = useSelector((state) => state.expenses.expenses);

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

    const togglePremium = (event) => {
        event.preventDefault();
        dispatch(premiumActions.togglePremium());
    };

    const toggleTheme = () => {
        dispatch(premiumActions.toggleTheme());
    };

    const downloadHandler = (event) => {
        event.preventDefault();

        const generateCSV = (expenses) => {
            // Define the CSV header
            const header = ["Title", "Amount", "Category"].join(",");

            // Convert each expense object to a CSV row
            const rows = expenses.map((expense) => {
                const { title, amount, category } = expense;
                return [title, amount, category].join(",");
            });

            // Concatenate the header and rows
            const csvContent = [header, ...rows].join("\n");

            return csvContent;
        };
        const csvContent = generateCSV(expenses); // Generate the CSV content here

        const csvData = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        //creating url
        const csvURL = window.URL.createObjectURL(csvData);

        const downloadLink = document.createElement("a");
        downloadLink.href = csvURL;
        downloadLink.setAttribute("download", "expenses.csv");
        downloadLink.click();

        window.URL.revokeObjectURL(csvURL);
    };

    return (
        <div>
            <Card className='expenses'>
                {total > 10000 && (
                    <button className='premium-btn' onClick={togglePremium}>
                        {isPremium ? "Deactivate Premium" : "Activate Premium"}
                    </button>
                )}
                {isPremium && (
                    <div className='features'>
                        <div className='theme-toggle'>
                            <h2>Dark Mode</h2>
                            <ReactSwitch
                                checked={isDark}
                                onChange={toggleTheme}
                            />
                        </div>
                        <div>
                            <button onClick={downloadHandler}>
                                Download CSV
                            </button>
                        </div>
                    </div>
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
