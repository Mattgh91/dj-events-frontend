import * as React from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    // React.useEffect;

    // Register user
    const register = async ({ username, email, password }) => {console.log('register');
        console.log({ username, email, password });
    }

    // Login user
    const login = async ({ email: identifier, password }) => {
        console.log({ identifier, password });
    }

    // Logout user
    const logout = async () => {
        console.log('logout');
    }

    // Check if user is logged in
    const checkUserLoggedIn = async ({ username, email, password }) => {
        console.log('check');
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
