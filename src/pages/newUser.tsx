import React, { useState } from 'react'
import { registerUser, useUser, login, getUser, useAlertBox } from '../API/AppLogic'
import { Wrapper, StyledButton, StyledInput } from './login'
import { PrettyH2 } from '../Styles'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [, addAlert] = useAlertBox();
    const [, setUser] = useUser();
    const history = useHistory();

    async function createUser () {
        try {
            await registerUser({ username, email, password });

            const auth = await login({ username, password }) || '';
            const { role } = await getUser(username, auth.split(' ')[1])

            setUser({
                username,
                token: auth.split(' ')[1],
                role: role
            });

            addAlert({
                key: `create-${username}-attempt-${new Date()}`,
                text: `Successfully created your new account, ${username}!`,
                timeout: 4,
                theme: 'success'
            });

            history.push('/journals')
            console.log(auth)
        } catch (err) {
            addAlert({
                key: `create-user-attempt-${new Date()}`,
                text: 'Unable to Register. Please try again with different username.',
                timeout: 7,
                theme: 'error'
            });
        }
    }

    return (
        <Wrapper>
            <div style={{
                fontSize: '2rem'
            }}>
                <PrettyH2 align='center'>Register</PrettyH2>
            </div>
            <div>
                <StyledInput type='text' placeholder='username' onChange={({target:{value=''}={}}) => {
                    setUserName(value);
                }}/><br />
                <StyledInput type='email' placeholder='email' onChange={({target:{value=''}={}}) => {
                    setEmail(value);
                }}/><br/>
                <StyledInput type='password' placeholder='password' onChange={({target:{value=''}={}}) => {
                    setPassword(value);
                }}/><br/><br />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <StyledButton onClick={() => createUser()}>Sign up</StyledButton>
                </div>
            </div>
        </Wrapper>
    )
}

export default Register