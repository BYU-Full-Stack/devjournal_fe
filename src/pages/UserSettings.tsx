import { useEffect, useRef, useState } from 'react'
import { getUser, updateUser, useUser, useAlertBox, watchButtonPress } from '../API/AppLogic'
import { PrettyH2, H3 } from '../styles/GlobalStyles'

// Test component to ensure store state is updating correctly
import ConfirmableInput from '../components/ConfirmableInput/ConfirmableInput'
import LeftNav from '../components/LeftNav/LeftNav'
import { FlexContainer, FlexCol, Button } from '../styles/GlobalStyles'
import { USER_STATE_TYPE } from '../store/reducers/user'

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
        {
            label: 'Email', key: 'email', maxLength: 50, type: 'email', hint: 'Enter a valid email', validate: (input: string) => {
                return /^[a-z_.0-9]+@[a-z0-9_.]+\.(com|edu|org|gov|net)$/i.test(input);
            }
        },
    ];

    useEffect(() => {
        user.token && (async function () {
            try {
                // @ts-ignore
                const apiUser: USER_STATE_TYPE = await getUser(user.username, user.token);
                setUser(apiUser);
            } catch (err) {
                addAlert({
                    id: `get-user-attempt`,
                    text: 'Unable to retrieve user.',
                    timeout: 7,
                    theme: 'error'
                });
            }
        })();
        // eslint-disable-next-line
    }, [user.token]);

    useEffect(() => {
        // When the user is done editing the field, focus on the save button
        !canUserSave && saveButtonRef.current?.focus();
    }, [canUserSave])
    useEffect(() => setEditUser(user), [user])

    const updateUserSettings = async () => {
        try {
            saveButtonRef.current && (saveButtonRef.current.disabled = true);
            const token = await updateUser(user.username, fieldsToUpdate[indexOfUpdateField].key, { ...editUser, username: user.username, updatedUsername: editUser.username });

            // A new token is generated when the user update's his/her username
            if (token) {
                // @ts-ignore
                setUser({ token, [fieldsToUpdate[indexOfUpdateField].key]: editUser[fieldsToUpdate[indexOfUpdateField].key] });
            } else {
                // @ts-ignore
                setUser({ [fieldsToUpdate[indexOfUpdateField].key]: editUser[fieldsToUpdate[indexOfUpdateField].key] });
            }

            saveButtonRef.current && (saveButtonRef.current.disabled = false);
            addAlert({
                id: `update-${fieldsToUpdate[indexOfUpdateField].key}-attempt`,
                text: `Successfully updated your ${fieldsToUpdate[indexOfUpdateField].key}`,
                timeout: 4,
                theme: 'success'
            });

        } catch (err) {
            saveButtonRef.current && (saveButtonRef!.current.disabled = false);
            // reset the user to what it was before failed update
            if (fieldsToUpdate[indexOfUpdateField].key !== 'password')
                setEditUser(prevUser => ({
                    ...prevUser,
                    // @ts-ignore
                    [fieldsToUpdate[indexOfUpdateField].key]: user[fieldsToUpdate[indexOfUpdateField].key]
                }));

            addAlert({
                id: `failed-update-${fieldsToUpdate[indexOfUpdateField].key}-attempt`,
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
                <ul>
                    {
                        fieldsToUpdate.map(({ label }, idx) =>
                            <li tabIndex={idx + 1} onKeyPress={(e) => watchButtonPress(e, { cb: () => changeUpdateField(idx) })} key={idx} onClick={() => changeUpdateField(idx)} data-testid={`${label}-field-to-update`}>{label}</li>)
                    }
                </ul>
            </LeftNav>
            <FlexCol margin="auto" className="main">
                <H3 display="inline">{fieldsToUpdate[indexOfUpdateField].label}:</H3>
                <ConfirmableInput
                    myKey={indexOfUpdateField}
                    setCanUserSave={setCanUserSave}
                    label={fieldsToUpdate[indexOfUpdateField].label}
                    type={fieldsToUpdate[indexOfUpdateField].type ? fieldsToUpdate[indexOfUpdateField].type : 'text'}
                    validate={fieldsToUpdate[indexOfUpdateField].validate}
                    hint={fieldsToUpdate[indexOfUpdateField].hint}
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
                        onClick={() => updateUserSettings()}
                    >Save</Button>
                </FlexContainer>
            </FlexCol>
            <FlexCol width='250px' className='empty-col'></FlexCol>
        </FlexContainer>
    );
};

export default UserSettings;