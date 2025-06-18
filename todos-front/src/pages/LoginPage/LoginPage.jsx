import { useState } from 'react';
import "./style.css";
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../service/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setError('');
        setUsernameError('');
        setPasswordError('');

        // Validate inputs
        let hasError = false;

        if (!username.trim()) {
            setUsernameError('Username is required');
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            hasError = true;
        }

        if (hasError) {
            return;
        }
        setIsLoading(true);
        try {
            // Placeholder for actual login logic   
            const data = await apiRequest({ url: `/users/login`, method: 'put', body:{username , password}, initialData: null });
               if (data.isLogin) {
            localStorage.setItem('user', JSON.stringify(data.user));
            nav('/home')

        } else {
            setError('Invalid username or password');
        }
        }
        catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'An error occurred during login');
            console.error(err);
            return;
        }
        setIsLoading(false);
        // Placeholder login logic (replace with actual API call)
     

    };
    return (
        <>
        <div className="login-container">
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
                <Input
                    name="username"
                    label="Username"
                    typeProp="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isDisabled={isLoading}
                    error={usernameError}
                />
                <Input
                    name="password"
                    label="Password"
                    typeProp="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isDisabled={isLoading}
                    error={passwordError}
                    />
                <button
                    type="submit"
                    className="login-button"
                    disabled={isLoading}
                    >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="login-link">
                Do not have an account? <Link to={"/register"}>Register</Link>
            </div>
        </div>
    </>
    );
}