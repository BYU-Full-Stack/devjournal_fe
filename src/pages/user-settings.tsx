import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStateAction } from '../store/actions/user'
import { RootState } from '../store'
import { POST, GET, defaultReqOptions as options, PUT } from '../API'
import { H2, H3 } from '../Styles'

// Test component to ensure store state is updating correctly
import C from '../components/CustomInput'
import { FlexContainer, FlexCol, Button } from '../Styles'

const { REACT_APP_API_DOMAIN: API_URL, REACT_APP_API_BASE_PATH: API_BASE } = process.env;
const testUser = 'user2';
const UserSettings = () => {
    const dispatch = useDispatch();
    const updateUser = (data: Object) => {
        dispatch(
            userStateAction(data)
        );
    };

    // @ts-ignore
    const userState = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        (async function (path: string) {
            console.log(`${API_URL}${path}`);
            try {
                const { headers: {
                    authorization: auth = 'Bearer '
                } = {} } = await POST(`${API_URL}${path}`, { username: testUser, password: `pass${testUser}` });

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
        })('login');
    }, []);

    useEffect(() => {
        userState.token && (async function (path: string) {
            const customOptions: typeof options = { ...options };
            customOptions.headers.Authorization = `Bearer ${userState.token}`;

            try {
                // @ts-ignore
                const { data: { email, created_date, user_id } = {} } = await GET(`${API_URL}${path}`, customOptions);
                dispatch(
                    userStateAction({
                        email,
                        created_date,
                        user_id
                    })
                );
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })(`${API_BASE}${testUser}`);
    }, [userState.token]);

    const updateUserSettings = async () => {

        const customOptions: typeof options = { ...options };
        customOptions.headers.Authorization = `Bearer ${userState.token}`;

        try {
            const resp = await PUT(`${API_URL}${API_BASE}${userState.username}`, {
                ...userState, password: `pass${testUser}`
            }, customOptions);
            console.log('update resp', resp);
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
        }
    };

    return (
        <FlexContainer wrap="wrap">
            <FlexCol width='300px' maxWidth="10%"></FlexCol>
            <FlexCol style={{ marginLeft: '50px' }}>
                <H3>Account Settings</H3>
                <H2 display="inline">Username</H2>:<C editableText={userState.username} updateText={(username: string) => updateUser({ username })} />
                <H2 display="inline">Email</H2>:<C editableText={userState.email} updateText={(email: string) => updateUser({ email })} />
                <FlexContainer justify="flex-end" margin="1em 0em">
                    <Button bgColor="bg-dark" padding=".4em 1em" border="transparent 2px solid" hoverBorder="turq 2px solid" onClick={updateUserSettings}>Save</Button>
                </FlexContainer>
            </FlexCol>
        </FlexContainer>
    );
};

export default UserSettings;