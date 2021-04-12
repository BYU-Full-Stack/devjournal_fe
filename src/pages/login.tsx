import React, { useState } from 'react'
import { H2, H3 } from '../Styles'
import { login, useUser } from '../API/AppLogic'

import { FlexContainer, FlexCol, Button } from '../Styles'

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userState, setUser] = useUser();

    async function loginUser() {
        try {
            const auth = await login({ username, password }) || '';
            setUser({
                username,
                token: auth.split(' ')[1]
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
                <H3>Login</H3>
                <input type='text' value={username} onChange={({ target: { value = '' } = {} }) => {
                    setUserName(value);
                }} />
                <input type='password' value={password} onChange={({ target: { value = '' } = {} }) => {
                    setPassword(value);
                }} />
                <Button
                    bgColor="bg-dark"
                    padding=".4em 1em"
                    border="transparent 2px solid"
                    hoverBorder="turq 2px solid"
                    onClick={() => loginUser()}
                >Save</Button>
            </FlexCol>
        </FlexContainer>
    );
}

export default Login;
