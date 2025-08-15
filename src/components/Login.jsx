// src/components/Login.js
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios'; // Use the public instance for login

const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                { email, password }, // No need to stringify
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            
            // Save user and token to global state
            setAuth({ user, accessToken });
            
            setEmail('');
            setPassword('');
            // Redirect user to dashboard here
            console.log("Login successful!", { user, accessToken });

        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed');
        }
    }

    return (
        <section>
            <h1>Sign In</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                <br />
                <button>Sign In</button>
            </form>
        </section>
    );
}

export default Login;