import * as React from 'react';
import { NEXT_URL } from '@/config/index';
import { useRouter } from 'next/router';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => checkUserLoggedIn(), []);

    // Register user
    const register = async ({ username, email, password }) => {
        console.log({ username, email, password });
    }

    // Login user
    const login = async ({ email: identifier, password }) => {
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
            setUser(data.user);
            router.push('/account/dashboard')
        } else {
            setError(data.message);
            setError(null);
        }
    }

    // Logout user
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST',
        })

        if (res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
