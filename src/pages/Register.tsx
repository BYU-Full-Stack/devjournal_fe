import { useState, FormEvent } from 'react'
import { registerUser, useUser, useAlertBox } from '../API/AppLogic'
import StyledInput from '../components/StyledInput/StyledInput'
import { Wrapper, StyledButton } from './Login'
import { PrettyH2 } from '../styles/GlobalStyles'
import { useHistory } from 'react-router-dom'

import { FlexContainer } from '../styles/GlobalStyles'

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
            const { token, role } = await registerUser({ username, email, password });
            setUser({
                username,
                token,
                role
            });

            addAlert({
                id: `create-${username}-attempt`,
                text: `Successfully created your new account, ${username}!`,
                timeout: 4,
                theme: 'success'
            });

            history.push('/journals')
        } catch (err: any) {
            const { message = 'Unable to Register. Please try again with different username.' } = err?.response?.data || {};
            addAlert({
                id: `create-user-attempt`,
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
                    <StyledInput type='text' placeholder='username' handleChange={setUserName} data-testid='username' /><br />
                    <StyledInput type='email' placeholder='email' handleChange={setEmail} data-testid='email' /><br />
                    <StyledInput type='password' placeholder='password' handleChange={setPassword} data-testid='password' /><br /><br />

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