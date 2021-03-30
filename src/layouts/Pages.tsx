import {
    Switch,
    Route
} from "react-router-dom";
import Users from '../pages/User/Index'
import UserSettings from '../pages/UserSettings'

export default function Pages() {
    return (
        <Switch>
            <Route path="/user">
                <Users />
            </Route>
            <Route path="/account">
                <UserSettings />
            </Route>
            <Route path="/">
                <UserSettings />
            </Route>
        </Switch>
    );
};