import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

test('renders "Add Expense" as text', () => {
    render(<ExpenseForm />);

    const buttonElement = screen.getByText("Add Expense");
    expect(buttonElement).toBeInTheDocument();
});
