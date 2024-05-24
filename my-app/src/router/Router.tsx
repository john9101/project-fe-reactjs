// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
