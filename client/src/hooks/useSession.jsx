import { useState } from 'react';

// Custom hook for managing session tokens
const useSession = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const getToken = () => {
        return localStorage.getItem('token') || null;
    }

    const clearToken = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return {
        token,
        getToken,
        saveToken,
        clearToken,
    };
};

export default useSession;
