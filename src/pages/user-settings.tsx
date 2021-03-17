import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userStateAction } from '../store/actions/user'
import { RootState } from '../store'
import { POST } from '../API'

import C from '../components/c'

const { REACT_APP_API_BASE_PATH: API_BASE_PATH, REACT_APP_API_DOMAIN: API_URL } = process.env;

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
                } = {} } =
                    await POST(`${API_URL}${path}`, { username: 'admin', password: 'passadmin' });

                dispatch(
                    userStateAction({
                        username: 'admin',
                        token: auth.split(' ')[1]
                    })
                );
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })('login');

    }, []);

    return (
        <div>User settings page!
            <C username={userState.username}
                token={userState.token} />
        </div>
    );
};

export default UserSettings;