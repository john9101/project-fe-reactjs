import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/user.type'


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

    const login = (user: User) => {
        setAuthState({ isAuthenticated: true, user });
    };

    const logout = () => {
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
