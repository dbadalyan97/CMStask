import React, {useEffect} from 'react';
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Profile from "./Components/Profile/Profile";


function App() {

    const useRoutes = isAuthenticated => {
        if (isAuthenticated) {
            return (
                <Switch>
                    <Route path="/profile" exact>
                        <Profile/>
                    </Route>
                    <Redirect to="/profile" exact/>
                </Switch>
            )
        }
        return (
            <Switch>
                <Route path="/SignIn" exact>
                    <SignIn/>
                </Route>
                <Route path="/SignUp" exact>
                    <SignUp/>
                </Route>
                <Redirect to="/SignIn" exact/>
            </Switch>
        )
    }

    const isAuthenticated = !!localStorage.getItem("logIn");

    const routes = useRoutes(isAuthenticated);

    console.log(isAuthenticated);

    return (
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    )
}

export default App;