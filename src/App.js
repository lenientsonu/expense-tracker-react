import { Route, Switch } from "react-router-dom";

import Homepage from "./components/pages/Home";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import WelcomePage from "./components/pages/Welcome";
import ProfilePage from "./components/pages/Profile";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/welcome'>
                    <WelcomePage />
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
                <Route path='/home'>
                    <Homepage />
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
