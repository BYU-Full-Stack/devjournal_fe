import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUsers } from '../../API/AppLogic'
import { RootState } from '../../store'
import { FlexCol, FlexContainer } from '../../Styles';

export default function Users() {
    const [users, setUsers] = useState([]);
    const userState = useSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        userState.token && (async function () {
            try {
                const allUsers: [] = await getUsers(userState.token);
                setUsers(allUsers);
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    });

    return (
        <div>
            { users.length &&
                users.map(({ user_id, username, email, password = '', role, created_date }, idx) => <div key={idx}>
                    <FlexContainer>
                        <FlexCol>{user_id}</FlexCol>
                        <FlexCol>{username}</FlexCol>
                        <FlexCol>{email}</FlexCol>
                        <FlexCol>{password.slice(0, 20)}</FlexCol>
                        <FlexCol>{role}</FlexCol>
                        <FlexCol>{created_date}</FlexCol>
                    </FlexContainer>
                </div>)
            }
        </div>
    );
};