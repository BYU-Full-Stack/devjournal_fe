import { useState, FormEvent } from 'react'
import { PrettyH2, theme } from '../Styles'
import { useHistory } from 'react-router-dom'
import { login, useAlertBox, useUser } from '../API/AppLogic'
import styled from 'styled-components'
import { FlexContainer } from '../Styles'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const StyledInput = styled.input`
    margin: 0.5rem;
    padding: 0.5rem;
    font-family: 'Roboto', sans-serif;
    border-radius: 10px;
    font-size: 1.5rem;
    color: ${theme['purple']};
    outline: none;
    background-color: ${theme['bg-dark']};
    border: 2px solid white;
    transition: all .4s ease-out;
    &:focus {
        border: 2px solid ${theme['turq']}
    }
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
                key: `login-${username}-attempt-${new Date()}`,
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
                key: `login-user-attempt-${new Date()}`,
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
                <PrettyH2 align='center'>Login</PrettyH2>
            </div>
            <div>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => loginUser(e)}>
                    <StyledInput type='text' placeholder='username' onChange={({ target: { value = '' } = {} }) => {
                        setUserName(value)
                    }} /><br />
                    <StyledInput type='password' placeholder='password' onChange={({ target: { value = '' } = {} }) => {
                        setPassword(value)
                    }} /><br /><br />

                    <FlexContainer direction="column" justify="center" align="center">
                        <StyledButton>Login</StyledButton>
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
