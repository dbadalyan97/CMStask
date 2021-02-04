import React from 'react';
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import {BrowserRouter, Route, Link} from "react-router-dom";
import ContainedButtons from "./Components/Button/Button";
import Profile from "./Components/Profile/Profile";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Route path='/' exact>
                    <Link to='/SignIn'><ContainedButtons name="Sign In"/></Link>
                    <Link to='/SignUp'><ContainedButtons name="Sign Up"/></Link>
                </Route>
                <Route path="/SignIn"><SignIn/></Route>
                <Route path='/SignUp'><SignUp/></Route>
                <Route path="/profile"><Profile/></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;