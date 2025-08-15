// src/hooks/useRefreshToken.js
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh', {}, {
            withCredentials: true // Crucial to send the cookie
        });
        // Update the auth state with the new access token
        setAuth(prev => {
            console.log("Old token:", prev.accessToken);
            console.log("New token:", response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;