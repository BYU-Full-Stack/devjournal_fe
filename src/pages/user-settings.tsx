import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStateAction } from '../store/actions/user'
import { RootState } from '../store'
import { POST, GET, defaultReqOptions as options } from '../API'

// Test component to ensure store state is updating correctly
import C from '../components/c'

const { REACT_APP_API_DOMAIN: API_URL, REACT_APP_API_BASE_PATH: API_BASE } = process.env;

const UserSettings = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const userState = useSelector((state: RootState) => state.userReducer);

    useEffect(() => {
        (async function (path: string) {
            console.log(`${API_URL}${path}`);
            try {
                const { headers: {
                    authorization: auth = 'Bearer '
                } = {} } = await POST(`${API_URL}${path}`, { username: 'user1', password: 'passuser1' });

                dispatch(
                    userStateAction({
                        username: 'user1',
                        token: auth.split(' ')[1]
                    })
                );
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })('login');

    });

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
        })(`${API_BASE}user1`);
    }, [userState.token]);

    return (
        <div>
            <C />
        </div>
    );
};

export default UserSettings;