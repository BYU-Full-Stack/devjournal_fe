import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserSettings from '../pages/user-settings'

export default function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <UserSettings />
                    </Route>
                    <Route path="/user">
                        <UserSettings />
                    </Route>
                    <Route path="/">
                        <UserSettings />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}