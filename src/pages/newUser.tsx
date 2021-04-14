import React, { useState } from 'react'
import styled from 'styled-components'
import { registerUser, useUser } from '../API/AppLogic'
import { Button } from '../Styles'

const Label = styled.label`
    color: white;
`

const Register = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [, setUser] = useUser();

    async function createUser () {
        try {
            const auth = await registerUser({ username, email, password });

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
        <div>
            <Label>Username:</Label>
            <input type='text' value={username} onChange={({target:{value=''}={}}) => {
                setUserName(value);
            }}/><br/>
            <Label>Email:</Label>
            <input type='email' value={email} onChange={({target:{value=''}={}}) => {
                setEmail(value);
            }}/><br/>
            <Label>Password:</Label>
            <input type='password' value={password} onChange={({target:{value=''}={}}) => {
                setPassword(value);
            }}/><br/>
            <Button
                bgColor="bg-dark"
                padding=".4em 1em"
                border="transparent 2px solid"
                hoverBorder="turq 2px solid"
                onClick={() => createUser}
            >Register</Button>
        </div>
    )
}

export default Register