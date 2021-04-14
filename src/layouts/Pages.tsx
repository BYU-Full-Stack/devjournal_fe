import {
    Switch,
    Route
} from "react-router-dom";
import Users from '../pages/User/Index'
import UserSettings from '../pages/UserSettings'
import Login from '../pages/login'
import Logout from '../pages/Logout'
import Register from "../pages/newUser";
import Journal from '../pages/Journal/Journal'
import Error from '../pages/Error'
import CreateJournal from "../pages/Journal/CreateJournal";

export default function Pages() {
    return (
        <Switch>
            <Route path="/user">
                <Users />
            </Route>
            <Route path="/account">
                <UserSettings />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/logout">
                <Logout />
            </Route>
            <Route path="/journals/create">
                <CreateJournal/>
            </Route>
            <Route path="/journals">
                <Journal />
            </Route>
            <Route path="/error">
                <Error/>
            </Route>
            <Route path="/">
                <Login/>
            </Route>
        </Switch>
    );
};