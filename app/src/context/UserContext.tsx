import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/user.type';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (user: User) => void;
    logout: () => void;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setAuthState({ isAuthenticated: true, user: JSON.parse(storedUser) });
        }
    }, []);

    const login = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ isAuthenticated: true, user });
    };

    const logout = () => {
        localStorage.removeItem('user');
        setAuthState({ isAuthenticated: false, user: null });
    };

    const authContextValue: AuthContextType = {
        authState,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
