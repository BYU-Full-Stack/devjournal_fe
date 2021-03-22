import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStateAction } from '../store/actions/user'
import { RootState } from '../store'
import { getUser, updateUser, login } from '../API/AppLogic'
import { H2, H3 } from '../Styles'

// Test component to ensure store state is updating correctly
import CustomInput from '../components/CustomInput'
import { FlexContainer, FlexCol, Button } from '../Styles'
import { USER_STATE_TYPE } from '../store/reducers/user'


const testUser = 'user2';
const UserSettings = () => {

    const dispatch = useDispatch();
    const setUser = (data: Object) => {
        dispatch(
            userStateAction(data)
        );
    };
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const userState = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        (async function () {

            try {
                const auth = await login({ username: testUser, password: `pass${testUser}` });

                dispatch(
                    userStateAction({
                        username: testUser,
                        token: auth.split(' ')[1]
                    })
                );
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        userState.token && (async function () {
            try {
                // @ts-ignore
                const user: USER_STATE_TYPE = await getUser(testUser, userState.token);
                dispatch(
                    userStateAction(user)
                );
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, [userState.token]);

    const updateUserSettings = async () => {
        try {
            saveButtonRef!.current!.disabled = true;
            await updateUser({
                ...userState, password: `pass${testUser}`
            }, userState.token);
            saveButtonRef!.current!.disabled = false;
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
            saveButtonRef!.current!.disabled = false;
        }
    };

    return (
        <FlexContainer wrap="wrap">
            <FlexCol width='300px' maxWidth="10%"></FlexCol>
            <FlexCol style={{ marginLeft: '50px' }}>
                <H3>Account Settings</H3>
                <H2 display="inline">Username:</H2><CustomInput editableText={userState.username} updateText={(username: string) => setUser({ username })} />
                <H2 display="inline">Email:</H2><CustomInput editableText={userState.email} updateText={(email: string) => setUser({ email })} />
                <H2 display="inline">Password:</H2><CustomInput type="password" editableText={userState.password} updateText={(password: string) => setUser({ password })} />
                <FlexContainer justify="flex-end" margin="1em 0em">
                    <Button ref={saveButtonRef} bgColor="bg-dark" padding=".4em 1em" border="transparent 2px solid" hoverBorder="turq 2px solid" onClick={updateUserSettings}>Save</Button>
                </FlexContainer>
            </FlexCol>
        </FlexContainer>
    );
};

export default UserSettings;