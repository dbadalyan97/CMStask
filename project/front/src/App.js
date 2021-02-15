import React, {useContext, useEffect, useState} from 'react';
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import {DataProvider} from '../src/Components/Context/GetData'

function App() {
    // const [routes, setRouts] = useState()


    // const useRoutes = isAuthenticated => {
    //     if (isAuthenticated) {
    //         return (
    //             <Switch>
    //                 <Route path="/profile" exact>
    //                     <Profile/>
    //                 </Route>
    //                 <Redirect to="/profile" exact/>
    //             </Switch>
    //         )
    //     }
    //     return (
    //         <Switch>
    //             <Route path="/SignIn" exact>
    //                 <SignIn/>
    //             </Route>
    //             <Route path="/SignUp" exact>
    //                 <SignUp/>
    //             </Route>
    //             <Redirect to="/SignIn" exact/>
    //         </Switch>
    //     )
    // }
    // const ch = useRoutes(!!localStorage.getItem("logIn"));
    //
    // useEffect(() => {
    //     setRouts(ch);
    // }, [])

    return (
        <DataProvider>
            <div className="App">
                <BrowserRouter>
                    {/*{routes}*/}
                    <Route path="/profile" exact>
                        <Profile/>
                    </Route>
                    <Route path="/SignIn" exact>
                        <SignIn/>
                    </Route>
                    <Route path="/SignUp" exact>
                        <SignUp/>
                    </Route>
                </BrowserRouter>
            </div>
        </DataProvider>
    )
}

export default App;