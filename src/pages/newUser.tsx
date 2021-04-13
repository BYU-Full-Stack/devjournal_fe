import React, { useState } from 'react'
import { registerUser, useUser, login } from '../API/AppLogic'
import { FlexContainer, FlexCol, Button } from '../Styles'


const Register = () => {
    const [username, setUserName] = useState('username');
    const [password, setPassword] = useState('password');
    const [email, setEmail] = useState('test@gmail.com');
    const [userState, setUser] = useUser();

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
            <input type='text' value={username} onChange={({target:{value=''}={}}) => {
                setUserName(value);
            }}/><br/>
            <input type='email' value={email} onChange={({target:{value=''}={}}) => {
                setEmail(value);
            }}/><br/>
            <input type='password' value={password} onChange={({target:{value=''}={}}) => {
                setPassword(value);
            }}/><br/>
            <Button
                bgColor="bg-dark"
                padding=".4em 1em"
                border="transparent 2px solid"
                hoverBorder="turq 2px solid"
                onClick={() => createUser}
            >Save</Button>
        </div>
    )
}

export default Register