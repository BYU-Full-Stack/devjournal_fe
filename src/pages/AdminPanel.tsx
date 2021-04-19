import { useEffect, useState } from 'react';
import { getUsers, useUser, deleteUser, useAlertBox } from '../API/AppLogic';
import Icon from '../components/Icon';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { USER_STATE_TYPE } from '../store/reducers/user';
import { FlexCol, FlexContainer, theme, PrettyH2, H3 } from '../Styles';
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
  const [users, setUsers] = useState<USER_STATE_TYPE[]>([]);
  const [user] = useUser();
  const [, addAlert] = useAlertBox();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          const allUsers: USER_STATE_TYPE[] = await getUsers(user.token);
          setUsers(allUsers);
        } catch (err) {
          addAlert({
            key: `failed-users-retrieval--${new Date()}`,
            text: 'Failed to retrieve all users',
            timeout: 7,
            theme: 'error',
          });
        }
      })();
  }, [addAlert, user.token]);

  const handleDelete = async (
    username: string,
    user_id: string,
    index: number
  ) => {
    try {
      await deleteUser(username, user_id, user.token);

      addAlert({
        key: `delete-user-${users[index].username}-${new Date()}`,
        text: `Successfully deleted user with username '${users[index].username}'`,
        timeout: 7,
        theme: 'success',
      });
      setUsers([...users.slice(0, index), ...users.slice(index + 1)]);
    } catch (err) {
      addAlert({
        key: `failed-delete-user-${users[index].username}-${new Date()}`,
        text: `Failed to delete user with username '${users[index].username}'`,
        timeout: 7,
        theme: 'error',
      });
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
    <StyledRow data-testid='user-row'>
      <FlexCol data-testid='user-idx' maxWidth='1px'>
        {idx + 1}
      </FlexCol>
      <FlexCol>
        <Icon
          data-testid='user-delete-icon'
          color='red-hover'
          hcolor='red-deep'
          icon={faTrashAlt}
          onClick={() => handleDelete(username, user_id, idx)}
        ></Icon>
      </FlexCol>
      <FlexCol data-testid='user-username'>{username}</FlexCol>
      <FlexCol data-testid='user-email'>{email}</FlexCol>
      <FlexCol data-testid='user-role'>{role}</FlexCol>
      <FlexCol data-testid='user-created-date'>{created_date}</FlexCol>
    </StyledRow>
  );

  return (
    <div style={{ marginBottom: '3rem' }}>
      <UsersContainer>
        <PrettyH2 align='center'>Admin Panel</PrettyH2>
        <H3>{users.length} total users</H3>
        <StyledHeader>
          <FlexCol maxWidth='1px' data-testid='title-idx'>
            {'#'}
          </FlexCol>
          <FlexCol>
            <Icon
              data-testid='title-delete-icon'
              color='red-hover'
              hcolor='red-hover'
              icon={faTrashAlt}
            ></Icon>
          </FlexCol>
          <FlexCol data-testid='title-username'>Username</FlexCol>
          <FlexCol data-testid='title-email'>Email</FlexCol>
          <FlexCol data-testid='title-role'>Role</FlexCol>
          <FlexCol data-testid='title-created-date'>User Creation Date</FlexCol>
        </StyledHeader>
        {users.length > 0 &&
          users.map((user, idx) => <UserRow key={idx} {...user} idx={idx} />)}
      </UsersContainer>
    </div>
  );
}
