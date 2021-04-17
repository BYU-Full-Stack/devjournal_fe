import { useEffect, useRef, useState } from 'react'
import { getUser, updateUser, useUser, useAlertBox } from '../API/AppLogic'
import { PrettyH2, H3 } from '../Styles'

// Test component to ensure store state is updating correctly
import ConfirmableInput from '../components/ConfirmableInput/ConfirmableInput'
import { FlexContainer, FlexCol, Button, theme } from '../Styles'
import styled from 'styled-components'
import { USER_STATE_TYPE } from '../store/reducers/user'


const LeftNav = styled(FlexCol)`
    height: 100%;
    border-radius: 4px;
    background-color: ${theme['gray-light']};
    margin-top: 1em;
    color: ${theme['bg-dark']};
    h2 {
        background-color: ${theme['bg-dark']};
        text-align: center;
        margin: 0;
        padding: 1em 0;
        border-radius: inherit;
        border: 2px ${theme['gray-light']} solid;
        border-bottom: none;
    }
    div {
        padding: 10px 5px;
        transition-duration: .5s;
        :hover {
            &:nth-child(2) {
                background-color: ${theme['orange-hover']};
            }
            &:nth-child(3) {
                background-color: ${theme['green-hover']};
            }
            &:nth-child(4) {
                background-color: ${theme['red-hover']};
            }
        }
        border: 1px ${theme['gray-light']} solid;
        border-top: none;
        cursor: pointer;
    }
`;

const testUser = 'admin';
const UserSettings = () => {
    const [, addAlert] = useAlertBox();
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user, setUser] = useUser();
    const [editUser, setEditUser] = useState(user);
    const [indexOfUpdateField, setIndexOfUpdateField] = useState(0);
    const fieldsToUpdate = [
        { label: 'Username', key: 'username', maxLength: 20 },
        { label: 'Password', key: 'password', type: 'password', maxLength: 50 },
        { label: 'Email', key: 'email', maxLength: 50 },
    ];

    useEffect(() => {
        user.token && (async function () {
            try {
                // @ts-ignore
                const apiUser: USER_STATE_TYPE = await getUser(testUser, user.token);
                setUser(apiUser);
            } catch (err) {
                addAlert({
                    key: `get-user-attempt-${new Date()}`,
                    text: 'Unable to retrieve user.',
                    timeout: 7,
                    theme: 'error'
                });
            }
        })();
    }, [user.token, setUser, addAlert]);

    useEffect(() => setEditUser(user), [user])

    const updateUserSettings = async (value: Object) => {
        try {
            saveButtonRef.current && (saveButtonRef.current.disabled = true);
            await updateUser(user.username, fieldsToUpdate[indexOfUpdateField].key, { ...editUser, username: user.username, updatedUsername: editUser.username });

            // @ts-ignore
            setUser({ [fieldsToUpdate[indexOfUpdateField].key]: editUser[fieldsToUpdate[indexOfUpdateField].key] });

            saveButtonRef.current && (saveButtonRef.current.disabled = false);
            addAlert({
                key: `update-${fieldsToUpdate[indexOfUpdateField].key}-attempt-${new Date()}`,
                text: `Successfully updated your ${fieldsToUpdate[indexOfUpdateField].key}`,
                timeout: 4,
                theme: 'success'
            });

        } catch (err) {
            saveButtonRef.current && (saveButtonRef!.current.disabled = false);
            addAlert({
                key: `failed-update-${fieldsToUpdate[indexOfUpdateField].key}-attempt-${new Date()}`,
                text: `Failed to update your ${fieldsToUpdate[indexOfUpdateField].key}`,
                timeout: 7,
                theme: 'error'
            });
        }
    };

    const changeUpdateField = (idx: number) => {
        setIndexOfUpdateField(idx);
        setEditUser(user);
    }

    const handleUpdateTextInput = (value: string) => {
        setEditUser({ ...editUser, [fieldsToUpdate[indexOfUpdateField].key]: value })
    }

    return (
        <FlexContainer wrap="wrap" height="100%">
            <LeftNav width='250px'>
                <PrettyH2 data-testid="page-title">Account Settings</PrettyH2>
                {fieldsToUpdate.map(({ label }, idx) => <div key={idx} onClick={() => changeUpdateField(idx)} data-testid={`${label}-field-to-update`}>{label}</div>)}
            </LeftNav>
            <FlexCol margin="auto">
                <H3 display="inline">{fieldsToUpdate[indexOfUpdateField].label}:</H3>
                <ConfirmableInput
                    myKey={indexOfUpdateField}
                    setCanUserSave={setCanUserSave}
                    label={fieldsToUpdate[indexOfUpdateField].label}
                    type={fieldsToUpdate[indexOfUpdateField].type ? fieldsToUpdate[indexOfUpdateField].type : 'text'}
                    // @ts-ignore
                    editableText={editUser[fieldsToUpdate[indexOfUpdateField].key]}
                    maxLength={fieldsToUpdate[indexOfUpdateField].maxLength}
                    handleInputUpdate={handleUpdateTextInput} />

                <FlexContainer justify="flex-end" margin="1em 0em">
                    <Button
                        ref={saveButtonRef}
                        bgColor="bg-dark"
                        padding=".4em 1em"
                        border="transparent 2px solid"
                        hoverBorder="turq 2px solid"
                        disabled={canUserSave}
                        data-testid="user-settings-save-btn"
                        onClick={updateUserSettings}
                    >Save</Button>
                </FlexContainer>
            </FlexCol>
            <FlexCol width='250px'></FlexCol>
        </FlexContainer>
    );
};

export default UserSettings;