import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const LOGIN_URL = '/auth/login'

const Login = () => {
    const {setAuth} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if(!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if(!password) {
            errors.password = 'Passowrd is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be atleast 6 characters';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(LOGIN_URL,
                {email: email.toLowerCase().trim(), password },
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;

            if(!accessToken || !user) {
                throw new Error('Invalid response from server');
            }
            setAuth({ user, accessToken });

            setEmail('');
            setPassword('');
            setFieldErrors({});

            console.log("Login successful!", {user, accessToken});
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'login failed! Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className='min-h-screen font-mincho bg-gradient-to-r from-[#0f172a] to-[#334155] flex items-center justify-center px-4 py-8'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl neon-text mb-2'>Welcome Back</h1>
                    <p className='text-slate-400'>Sign in to your account</p>
                </div>
                
                <div className='bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl'>
                    {error && (
                        <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3'>
                            <AlertCircle className='w-5 h-5 text-red-400 mt-0.5 flex-shrink-0' />
                            <p className='text-red-300 text-sm'>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-slate-300 mb-2'>Email Address</label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                <input type="email" id='email' placeholder='Enter your email'
                                 className={`w-full pl-11 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        fieldErrors.email 
                                            ? 'border-red-500 focus:ring-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`} value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                        if(fieldErrors.email) {
                                            setFieldErrors(prev => ({ ...prev, email: ''}));
                                        }
                                    }}
                                    disabled={isLoading} autoComplete='email' required/>
                            </div>
                            {fieldErrors.email && (
                                <p className='mt-1 text-sm text-red-500'>{fieldErrors.email}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="password" 
                                className='block text-sm font-medium text-slate-300 mb-2'
                            >
                                Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder='Enter your password'
                                    className={`w-full pl-11 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        fieldErrors.password 
                                            ? 'border-red-500 focus:ring-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (fieldErrors.password) {
                                            setFieldErrors(prev => ({ ...prev, password: '' }));
                                        }
                                    }}
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors'
                                    disabled={isLoading}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className='w-5 h-5' />
                                    ) : (
                                        <Eye className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className='mt-1 text-sm text-red-400'>{fieldErrors.password}</p>
                            )}
                        </div>
                            <button
                            type="submit"
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            >
                            {isLoading ? (
                                <>
                                    <Loader2 className='w-5 h-5 animate-spin' />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                    <div className='mt-6 text-center'>
                        <p className='text-slate-400 text-sm'>
                            Don't have an account?{' '}
                            <Link 
                                to="/register" 
                                className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;