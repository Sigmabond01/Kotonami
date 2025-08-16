// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const REGISTER_URL = '/auth/register';

const Register = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!name.trim()) {
            errors.name = 'Name is required';
        } else if (name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        } else if (name.trim().length > 50) {
            errors.name = 'Name must be less than 50 characters';
        }
        
        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            errors.password = 'Password must contain uppercase, lowercase, and number';
        }
        
        // Confirm password validation
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
        return strength;
    };

    const getPasswordStrengthLabel = (strength) => {
        switch (strength) {
            case 0:
            case 1: return { label: 'Very Weak', color: 'text-red-400' };
            case 2: return { label: 'Weak', color: 'text-orange-400' };
            case 3: return { label: 'Fair', color: 'text-yellow-400' };
            case 4: return { label: 'Good', color: 'text-blue-400' };
            case 5: return { label: 'Strong', color: 'text-green-400' };
            default: return { label: '', color: '' };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(REGISTER_URL,
                { 
                    name: name.trim(), 
                    email: email.toLowerCase().trim(), 
                    password 
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;

            if (!accessToken || !user) {
                throw new Error('Invalid response from server');
            }

            // Save the auth state in our context
            setAuth({ user, accessToken });

            // Clear form
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFieldErrors({});

            // Navigate to the home/dashboard page
            navigate('/');

        } catch (err) {
            let errorMessage = 'Registration failed. Please try again.';
            
            if (!err?.response) {
                errorMessage = 'No server response. Please check your connection.';
            } else if (err.response?.status === 409) {
                errorMessage = 'Email is already in use. Please try a different email.';
            } else if (err.response?.status === 400) {
                errorMessage = err.response.data.errors?.[0]?.msg || 
                             err.response.data.message || 
                             'Please check your information and try again.';
            } else if (err.response?.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthInfo = getPasswordStrengthLabel(passwordStrength);

    return (
        <section className='min-h-screen font-mincho bg-gradient-to-r from-[#0f172a] to-[#334155] flex items-center justify-center px-4 py-8'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-white mb-2 neon-text'>
                        Create Account
                    </h1>
                    <p className='text-slate-400'>
                        Register with KOTONAMI and get started
                    </p>
                </div>

                <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl'>
                    {error && (
                        <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3'>
                            <AlertCircle className='w-5 h-5 text-red-400 mt-0.5 flex-shrink-0' />
                            <p className='text-red-300 text-sm' role="alert" aria-live="assertive">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label 
                                htmlFor="name" 
                                className='block text-sm font-medium text-slate-300 mb-2'
                            >
                                Full Name
                            </label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder='Enter your full name'
                                    className={`w-full pl-11 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        fieldErrors.name 
                                            ? 'border-red-500 focus:ring-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (fieldErrors.name) {
                                            setFieldErrors(prev => ({ ...prev, name: '' }));
                                        }
                                    }}
                                    disabled={isLoading}
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            {fieldErrors.name && (
                                <p className='mt-1 text-sm text-red-400'>{fieldErrors.name}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="email" 
                                className='block text-sm font-medium text-slate-300 mb-2'
                            >
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder='Enter your email'
                                    className={`w-full pl-11 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        fieldErrors.email 
                                            ? 'border-red-500 focus:ring-red-500/50' 
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (fieldErrors.email) {
                                            setFieldErrors(prev => ({ ...prev, email: '' }));
                                        }
                                    }}
                                    disabled={isLoading}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            {fieldErrors.email && (
                                <p className='mt-1 text-sm text-red-400'>{fieldErrors.email}</p>
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
                                    placeholder='Create a strong password'
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
                                    autoComplete="new-password"
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
                            
                            {password && (
                                <div className='mt-2'>
                                    <div className='flex gap-1 mb-1'>
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded ${
                                                    level <= passwordStrength
                                                        ? passwordStrength >= 4
                                                            ? 'bg-green-500'
                                                            : passwordStrength >= 3
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                        : 'bg-slate-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs ${strengthInfo.color}`}>
                                        Password strength: {strengthInfo.label}
                                    </p>
                                </div>
                            )}
                            
                            {fieldErrors.password && (
                                <p className='mt-1 text-sm text-red-400'>{fieldErrors.password}</p>
                            )}
                        </div>

                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className='block text-sm font-medium text-slate-300 mb-2'
                            >
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder='Confirm your password'
                                    className={`w-full pl-11 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        fieldErrors.confirmPassword 
                                            ? 'border-red-500 focus:ring-red-500/50' 
                                            : confirmPassword && password === confirmPassword
                                            ? 'border-green-500 focus:ring-green-500/50'
                                            : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (fieldErrors.confirmPassword) {
                                            setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
                                        }
                                    }}
                                    disabled={isLoading}
                                    autoComplete="new-password"
                                    required
                                />
                                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2'>
                                    {confirmPassword && password === confirmPassword && !fieldErrors.confirmPassword && (
                                        <CheckCircle className='w-5 h-5 text-green-400' />
                                    )}
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className='text-slate-400 hover:text-slate-300 transition-colors'
                                        disabled={isLoading}
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className='w-5 h-5' />
                                        ) : (
                                            <Eye className='w-5 h-5' />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {fieldErrors.confirmPassword && (
                                <p className='mt-1 text-sm text-red-400'>{fieldErrors.confirmPassword}</p>
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
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-slate-400 text-sm'>
                            Already have an account?{' '}
                            <a 
                                href="#signin" 
                                className='text-blue-400 hover:text-blue-300 font-medium transition-colors'
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;