import { useState, FormEvent } from 'react'
import { registerUser, useUser, login, getUser, useAlertBox } from '../API/AppLogic'
import { Wrapper, StyledButton, StyledInput } from './Login'
import { PrettyH2 } from '../Styles'
import { useHistory } from 'react-router-dom'

import { FlexContainer } from '../Styles'

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [, addAlert] = useAlertBox();
    const [, setUser] = useUser();
    const history = useHistory();

    async function createUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
        } catch (err: any) {
            const { message = 'Unable to Register. Please try again with different username.' } = err?.response?.data || {};
            addAlert({
                key: `create-user-attempt-${new Date()}`,
                text: message,
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
                <PrettyH2 align='center' data-testid='register-header'>Register</PrettyH2>
            </div>
            <div>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => createUser(e)}>
                    <StyledInput type='text' placeholder='username' onChange={({ target: { value = '' } = {} }) => {
                        setUserName(value);
                    }} data-testid='username'/><br />
                    <StyledInput type='email' placeholder='email' onChange={({ target: { value = '' } = {} }) => {
                        setEmail(value);
                    }} data-testid='email'/><br />
                    <StyledInput type='password' placeholder='password' onChange={({ target: { value = '' } = {} }) => {
                        setPassword(value);
                    }} data-testid='password'/><br /><br />
                    <FlexContainer direction="column" justify="center" align="center">
                        <StyledButton data-testid='user-register-btn'>Sign Up</StyledButton>
                        <p style={{
                            textAlign: 'center',
                            color: 'white'
                        }}>or</p>
                        <StyledButton onClick={() => history.replace('/login')}>
                            Login
                        </StyledButton>

                    </FlexContainer>
                </form>
            </div>
        </Wrapper>
    )
}

export default Register