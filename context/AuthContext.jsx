import * as React from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    // React.useEffect;

    // Register user
    const register = async ({ username, email, password }) => {
        console.log({ username, email, password });
    }

    // Login user
    const login = async ({ email: identifier, password }) => {
        console.log({ identifier, password });
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            })
        });

        const data = await res.json();

        if (res.ok) {
            console.log('ok: ', data);
            setUser(data.user);
        } else {
            console.log('bad: ', data);
            setError(data.message);
            setError(null);
        }
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
