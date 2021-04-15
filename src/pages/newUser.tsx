import React, { useState } from 'react'
import styled from 'styled-components'
import { registerUser, useUser } from '../API/AppLogic'
import { Wrapper, StyledButton, StyledInput } from './login'
import { Button, PrettyH2 } from '../Styles'
import { useHistory } from 'react-router-dom'

const Label = styled.label`
    color: white;
`

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [, setUser] = useUser();
    const history = useHistory();

    async function createUser () {
        try {
            const auth = await registerUser({ username, email, password });

            setUser({
                username,
                token: auth.split(' ')[1]
            });

            history.push('/journals')
            console.log(auth)
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
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
                    setUserName(value);
                }}/><br/>
                <StyledInput type='password' placeholder='password' onChange={({target:{value=''}={}}) => {
                    setUserName(value);
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