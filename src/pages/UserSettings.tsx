import { useEffect, useRef, useState } from 'react'
import { getUser, updateUser, login, useUser } from '../API/AppLogic'
import { PrettyH2, H3 } from '../Styles'

// Test component to ensure store state is updating correctly
import CustomInput from '../components/CustomInput'
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

const testUser = 'go';
const UserSettings = () => {

    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user, setUser] = useUser();
    const [editUser, setEditUser] = useState(user);
    const [indexOfUpdateField, setIndexOfUpdateField] = useState(0);
    const fieldsToUpdate = [
        { label: 'Username', key: 'username' },
        { label: 'Password', key: 'password', type: 'password' },
        { label: 'Email', key: 'email' },
    ];

    useEffect(() => {
        (async function () {
            try {
                const auth = await login({ username: testUser, password: `passgo` });
                setUser({
                    username: testUser,
                    token: auth.split(' ')[1]
                });
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, [setUser]);

    useEffect(() => {
        user.token && (async function () {
            try {
                // @ts-ignore
                const apiUser: USER_STATE_TYPE = await getUser(testUser, user.token);
                setUser(apiUser);
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, [user.token, setUser]);

    useEffect(() => setEditUser(user), [user])

    const updateUserSettings = async (value: Object) => {
        try {
            saveButtonRef!.current!.disabled = true;
            await updateUser(user.username, fieldsToUpdate[indexOfUpdateField].key, { ...editUser, username: user.username, updatedUsername: editUser.username });

            setUser({ [fieldsToUpdate[indexOfUpdateField].key]: editUser[fieldsToUpdate[indexOfUpdateField].key] });
            saveButtonRef!.current!.disabled = false;
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
            saveButtonRef!.current!.disabled = false;
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
                <PrettyH2>Account Settings</PrettyH2>
                {fieldsToUpdate.map(({ label }, idx) => <div key={idx} onClick={() => changeUpdateField(idx)}>{label}</div>)}
            </LeftNav>
            <FlexCol margin="auto">
                <H3 display="inline">{fieldsToUpdate[indexOfUpdateField].label}:</H3>
                <CustomInput
                    myKey={indexOfUpdateField}
                    setCanUserSave={setCanUserSave}
                    type={fieldsToUpdate[indexOfUpdateField].type ? fieldsToUpdate[indexOfUpdateField].type : 'text'}
                    editableText={editUser[fieldsToUpdate[indexOfUpdateField].key]}
                    handleInputUpdate={handleUpdateTextInput} />

                <FlexContainer justify="flex-end" margin="1em 0em">
                    <Button
                        ref={saveButtonRef}
                        bgColor="bg-dark"
                        padding=".4em 1em"
                        border="transparent 2px solid"
                        hoverBorder="turq 2px solid"
                        disabled={canUserSave}
                        onClick={updateUserSettings}
                    >Save</Button>
                </FlexContainer>
            </FlexCol>
            <FlexCol width='250px'></FlexCol>
        </FlexContainer>
    );
};

export default UserSettings;