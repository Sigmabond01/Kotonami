// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const REGISTER_URL = '/auth/register';

const Register = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post(REGISTER_URL,
                { name, email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;

            // Save the auth state in our context
            setAuth({ user, accessToken });

            // Clear form and navigate to a protected page (e.g., dashboard)
            setName('');
            setEmail('');
            setPassword('');
            navigate('/'); // Navigate to the home/dashboard page

        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 409) {
                setError('Email is already in use.');
            } else if (err.response?.status === 400) {
                // This handles validation errors from express-validator
                const errorMsg = err.response.data.errors?.[0]?.msg || 'Registration Failed';
                setError(errorMsg);
            }
            else {
                setError('Registration Failed');
            }
        }
    }

    return (
        <section>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }} aria-live="assertive">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign Up</button>
            </form>
        </section>
    )
}

export default Register;