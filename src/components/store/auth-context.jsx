import React, { useState } from "react";

const AuthContext = React.createContext({
    isloggedIn: false,
    userToken: "",
    email: "",
    login: (token) => {},
    logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
    const localToken = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");
    const [token, setToken] = useState(localToken);
    const [email, setEmail] = useState(localEmail);
    const isUserLoggedIn = !!token;

    const loginHandler = (token, email) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setToken(token);
        setEmail(email);
    };
    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setEmail(null);
    };

    const ContextValue = {
        isloggedIn: isUserLoggedIn,
        userToken: token,
        email: email,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={ContextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
