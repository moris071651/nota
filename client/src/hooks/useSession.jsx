import { useState } from 'react';

// Custom hook for managing session tokens
const useSession = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return {
        token,
        saveToken,
        clearToken,
    };
};

export default useSession;
