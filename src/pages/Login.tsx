import { useState, FormEvent } from 'react'
import { PrettyH2, theme } from '../styles/GlobalStyles'
import { useHistory } from 'react-router-dom'
import { login, useAlertBox, useUser } from '../API/AppLogic'
import styled from 'styled-components'
import { FlexContainer } from '../styles/GlobalStyles'
import StyledInput from '../components/StyledInput/StyledInput'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const StyledButton = styled.button`
    border-radius: 4px;
    align-self: center;
    border: 2px solid white;
    color: white;
    background-color: ${theme['bg-dark']};
    cursor: pointer;
    transition: all .4s ease-out;
    font-size: 0.8rem;
    padding: 0.4em 1em;
    &:hover,:focus {
        border: 2px solid ${theme['turq']};
        color: ${theme['turq']}
    }
`

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [, setUser] = useUser();
    const history = useHistory();
    const [, addAlert] = useAlertBox();

    async function loginUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const { token, role } = await login({ username, password }) || '';
            setUser({
                username,
                token,
                role
            });
            addAlert({
                id: `login-${username}-attempt`,
                text: `Welcome back, ${username}!`,
                timeout: 4,
                theme: 'success'
            });

            history.push('/journals')
        } catch (err) {
            let { message = '' } = err?.response?.data || {};
            if (!message) {
                message = 'Invalid login credentials. Please try again.'
            }
            addAlert({
                id: `login-user-attempt`,
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
                <PrettyH2 align='center' data-testid='login-header'>Login</PrettyH2>
            </div>
            <div>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => loginUser(e)}>
                    <StyledInput type='text' placeholder='username' handleChange={setUserName} data-testid='username' /><br />
                    <StyledInput type='password' placeholder='password' handleChange={setPassword} data-testid='password' /><br /><br />

                    <FlexContainer direction="column" justify="center" align="center">
                        <StyledButton data-testid='user-login-btn'>Login</StyledButton>
                        <p style={{
                            textAlign: 'center',
                            color: 'white'
                        }}>or</p>
                        <StyledButton onClick={() => history.replace('/register')} >
                            Sign Up
                        </StyledButton>
                    </FlexContainer>
                </form>
            </div>
        </Wrapper>
    );
}

export default Login;
