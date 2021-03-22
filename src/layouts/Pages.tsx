import {
    Switch,
    Route
} from "react-router-dom";
import UserSettings from '../pages/UserSettings'

export default function Pages() {
    return (
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
    );
};