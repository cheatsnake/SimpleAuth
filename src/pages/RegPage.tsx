import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthBlock from '../components/AuthBlock';
import { CreateButton } from '../components/Buttons';
import { Loading } from '../components/Loading';
import { Title, Message } from '../components/Titles';

const RegPage: FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPass, setRepeatPass] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);

    function onForm(e: any):void {
        e.preventDefault();
        if (password !== repeatPass) {
            setRepeatPass('');
            setMessage('The entered passwords do not match.')
            return;
        }
        onCreate();
    }
    async function onCreate() {
        setLoad(true)
        const response = await fetch('https://auth-api-v0.herokuapp.com/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username, password})
        });
    
        const result = await response.json();
        if (response.ok) {
            setStatus(true)
            setMessage('User created successfully');
        } else {
            setStatus(false)
            setMessage(result.message);
        }
        setPassword('');
        setRepeatPass('');
        setLoad(false)
    }

    return (
        <AuthBlock>
            {load ? <Loading/> : null}
            <Title>New User</Title>
            <form onSubmit={e => onForm(e)} className="form">
                <label htmlFor="username">Username</label>
                <input 
                    onChange={e => setUsername(e.target.value)} 
                    type="text" 
                    name="username" 
                    value={username}
                    required
                    minLength={4}
                    maxLength={16}/>
                <label htmlFor="password">Password</label>
                <input 
                    onChange={e => setPassword(e.target.value)}
                    type="password" 
                    name="password" 
                    value={password}
                    required
                    minLength={6}
                    maxLength={20}/>
                <label htmlFor="repeatPassword">Repeat password</label>
                <input 
                    onChange={e => setRepeatPass(e.target.value)}
                    type="password" 
                    name="repeatPassword" 
                    value={repeatPass}
                    required
                    minLength={6}
                    maxLength={20}/>
                {message ? <Message {...status ? {status: "good"} : null}>{message}</Message> : null}
                <CreateButton>Create</CreateButton>
                <Link to="/SimpleAuth/login" className="link">Have an account?</Link>
            </form>
        </AuthBlock>
    );
};

export default RegPage;