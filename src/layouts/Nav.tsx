import {
    Link
} from "react-router-dom";
import { Navbar } from '../Styles'

export default function Nav() {
    return (
        <Navbar>
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
        </Navbar>
    );
}