import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import AuthContext from "../store/auth-context";

import "./Logout.css";

const Logout = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const clickHandler = (event) => {
        event.preventDefault();
        authCtx.logout();
        history.replace("/login");
    };

    return (
        <Button type='submit' onClick={clickHandler}>
            Logout
        </Button>
    );
};

export default Logout;
