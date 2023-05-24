import NewExpense from "../NewExpense/NewExpense";
import Expenses from "../Expenses/Expenses";

const Homepage = (props) => {
    return (
        <>
            <NewExpense />
            <Expenses />
        </>
    );
};

export default Homepage;
