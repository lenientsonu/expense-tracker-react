import { useSelector } from "react-redux";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
    const expenses = useSelector((state) => state.expenses.expenses);

    if (expenses.length === 0) {
        return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
    }

    return (
        <ul className='expenses-list'>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    id={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                    category={expense.category}
                />
            ))}
        </ul>
    );
};

export default ExpensesList;
