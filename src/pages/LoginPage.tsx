import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthBlock from '../components/AuthBlock';
import { LogButton } from '../components/Buttons';
import { Loading } from '../components/Loading';
import { Message, Title } from '../components/Titles';

interface ILoginPage {
    cookies: any
}

const LoginPage: FC<ILoginPage> = ({cookies}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);

    function onForm(e: any) {
        e.preventDefault();
        onLogin();
    }

    async function onLogin() {
        setLoad(true);
        const response = await fetch('https://auth-api-v0.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username, password})
        });
        
        const result = await response.json();
        if (response.ok) {
            cookies.set('token', result.token, { path: '/' });
            cookies.set('user', result.username, { path: '/' });
            setMessage('');
            window.location.reload();
        } else {
            setMessage(result.message);
        }
        setPassword('');
        setLoad(false);
    }

    return (
        <AuthBlock>
            {load ? <Loading/> : null}
            <Title>Log in to continue</Title>
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
                {message ? <Message>{message}</Message> : null}
                <LogButton>Login</LogButton>
                <Link to="/register" className="link">New User?</Link>
            </form>
        </AuthBlock>
    );
};

export default LoginPage;