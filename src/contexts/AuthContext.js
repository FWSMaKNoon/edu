import { createContext, useState, useEffect, use } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem('currentUser') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('currentUser', currentUser ? 'true' : 'false');
    }, [currentUser]);
    const login = () => setCurrentUser(true);
    const logout = () => setCurrentUser(false);
    return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
