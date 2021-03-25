import { useEffect, useState } from 'react'
import { getUsers, useUser } from '../../API/AppLogic'

import { USER_STATE_TYPE } from '../../store/reducers/user';
import { FlexCol, FlexContainer, theme } from '../../Styles';
import styled from 'styled-components'
const StyledRow = styled(FlexContainer)`
    border-radius: 3px;
    border: 2px solid;
    margin: 1em 1px;
    padding: .75em 5px;
    section {
        margin: 1px 7px;
    }
`;

export default function Users() {
    const [users, setUsers] = useState([]);
    const [user] = useUser();
    useEffect(() => {
        user.token && (async function () {
            try {
                console.log('token', user.token)
                const allUsers: [] = await getUsers(user.token);
                setUsers(allUsers);
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
        // return () => setUsers([]);
    }, [user.token]);

    return (
        <div>
            { users.length &&
                users.map((user, idx) => <div key={idx}>
                    <UserRow {...user} />
                </div>)
            }
        </div>
    );
};

const UserRow = ({ username, email, password = '', role, created_date }: USER_STATE_TYPE) =>
    <StyledRow>
        <FlexCol>{username}</FlexCol>
        <FlexCol>{email}</FlexCol>
        <FlexCol>{role}</FlexCol>
        <FlexCol>{created_date}</FlexCol>
    </StyledRow>;