import { useEffect, useState } from 'react';
import { getUsers, useUser, deleteUser } from '../../API/AppLogic';
import Icon from '../../components/Icon';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { USER_STATE_TYPE } from '../../store/reducers/user';
import { FlexCol, FlexContainer, theme, PrettyH2, H3 } from '../../Styles';
import styled from 'styled-components';

const SharedFlexStyles = styled(FlexContainer)`
  cursor: default;
  justify-content: space-evenly;
  section {
    margin: auto 7px;
  }
  padding: 0.75em 5px;
`;

const StyledHeader = styled(SharedFlexStyles)`
  border: 2px solid ${theme['red-hover']};
  color: ${theme['white']};
  font-weight: bold;
  font-size: 20px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  margin-bottom: 10px;
`;

const StyledRow = styled(SharedFlexStyles)`
  border-radius: 3px;
  border-top: 2px solid;
  margin: 0 0 1em 0;
  transition: 0.5s;
  &:hover {
    background-color: ${theme['gray-light']};
    color: ${theme['bg-dark']};
  }
`;

const UsersContainer = styled.div`
  width: 75%;
  margin: 3rem auto;
  min-width: 600px;
  max-width: 700px;
`;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user] = useUser();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          const allUsers: [] = await getUsers(user.token);
          setUsers(allUsers);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user.token]);

  const handleDelete = async (
    username: string,
    user_id: string,
    index: number
  ) => {
    try {
      await deleteUser(username, user_id, user.token);
      setUsers([...users.slice(0, index), ...users.slice(index + 1)]);
    } catch (err) {
      console.log('err', err);
    }
  };

  const UserRow = ({
    user_id = '',
    username = '',
    email,
    role,
    created_date,
    idx = 0,
  }: USER_STATE_TYPE & { idx: number }) => (
    <StyledRow>
      <FlexCol maxWidth='1px'>{idx + 1}</FlexCol>
      <FlexCol>
        <Icon
          color='red-hover'
          hColor='red-deep'
          icon={faTrashAlt}
          onClick={() => handleDelete(username, user_id, idx)}
        ></Icon>
      </FlexCol>
      <FlexCol>{username}</FlexCol>
      <FlexCol>{email}</FlexCol>
      <FlexCol>{role}</FlexCol>
      <FlexCol>{created_date}</FlexCol>
    </StyledRow>
  );

  return (
    <div style={{ marginBottom: '3rem' }}>
      <UsersContainer>
        <PrettyH2 align='center'>Admin Panel</PrettyH2>
        <H3>{users.length} total users</H3>
        <StyledHeader>
          <FlexCol maxWidth='1px'>{'#'}</FlexCol>
          <FlexCol>
            <Icon color='red-hover' hColor='red-hover' icon={faTrashAlt}></Icon>
          </FlexCol>
          <FlexCol>Username</FlexCol>
          <FlexCol>Email</FlexCol>
          <FlexCol>Role</FlexCol>
          <FlexCol>User Creation Date</FlexCol>
        </StyledHeader>
        {users.length > 0 &&
          users.map((user, idx) => <UserRow key={idx} {...user} idx={idx} />)}
      </UsersContainer>
    </div>
  );
}
