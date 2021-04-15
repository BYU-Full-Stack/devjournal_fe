import React, {useState} from 'react'
import { PrettyH2, theme } from '../Styles'
import { useHistory } from 'react-router-dom'
import { getUser, login, useUser } from '../API/AppLogic'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    &:hover {
        border: 2px solid ${theme['turq']};
        color: ${theme['turq']}
    }
`

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUser] = useUser();
    const routerHistory = useHistory();

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
            routerHistory.push('/journals')
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
        }
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
                <StyledInput type='text' placeholder='username' onChange={({target:{value=''}={}}) => {
                    setUserName(value)
                }} /><br />
                <StyledInput type='password' placeholder='password' onChange={({target:{value=''}={}}) => {
                    setPassword(value)
                }} /><br /><br />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <StyledButton onClick={() => loginUser()}>Login</StyledButton>
                    <p style={{
                        textAlign: 'center',
                        color: 'white'
                    }}>or</p>
                    <Link to='/register'>
                        <StyledButton>
                            Sign Up
                        </StyledButton>
                    </Link>

                </div>
            </div>   
        </Wrapper>
    );
}

export default Login;
