import {
    Switch,
    Route
} from "react-router-dom";
import Users from '../pages/User/Index'
import UserSettings from '../pages/UserSettings'
import Login from '../pages/login'
import ListJournals from '../pages/Journal/ListJournals'

export default function Pages() {
    return (
        <Switch>
            <Route path="/user">
                <Users />
            </Route>
            <Route path="/account">
                <UserSettings />
            </Route>
            <Route path="/journals">
                <ListJournals />
            </Route>
            <Route path="/">
                <Login />
            </Route>
        </Switch>
    );
};