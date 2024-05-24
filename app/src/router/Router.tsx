// src/App.tsx
import { CircularProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const CartDetail = lazy(() => import('../components/cart/CartDetail'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<CircularProgress color="success" />}>
                <Routes>
                    <Route index path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/cart" element={<CartDetail />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
