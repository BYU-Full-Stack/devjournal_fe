import React, {useState} from 'react'
import { H2, H3, PrettyH2 } from '../Styles'
import { getUser, login, useUser } from '../API/AppLogic'
import { FlexContainer, FlexCol, Button } from '../Styles'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUser] = useUser();

    async function loginUser() {
        try {
            const auth = await login({ username, password }) || '';
            const { role } = await getUser(username, auth.split(' ')[1])
            setUser({
                username,
                token: auth.split(' ')[1],
                role: role
            });
            console.log(auth)
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
        }
    }

    return (
        <FlexContainer>
            <FlexCol></FlexCol>
            <FlexCol>
                <div style={{
                    alignContent: 'center'
                }}>
                    <PrettyH2 align='center'>Login</PrettyH2>
                    <input type='text' value={username} onChange={({target:{value=''}={}}) => {
                        setUserName(value);
                    }}/><br/>
                    <input type='password' value={password} onChange={({target:{value=''}={}}) => {
                        setPassword(value);
                    }}/><br />
                    <Button
                        bgColor="bg-dark"
                        padding=".4em 1em"
                        border="transparent 2px solid"
                        hoverBorder="turq 2px solid"
                        onClick={() => loginUser()}
                    >Save</Button>
            </div>
                <Link to='/register'>
                    <Button
                        bgColor="bg-dark"
                        padding=".4em 1em"
                        border="transparent 2px solid"
                        hoverBorder="turq 2px solid">
                        Sign up
                    </Button>
                </Link>
            </FlexCol>
        </FlexContainer>
    );
}

export default Login;