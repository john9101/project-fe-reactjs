// App.tsx
import React, { lazy, Suspense } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/css/style.module.scss';
import './assets/css/styleLogin.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { CircularProgress } from '@mui/material';
import FormLayout from './layout/FormLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/UserContext'; // Import AuthProvider


const Home = lazy(() => import('./pages/Home'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CartDetail = lazy(() => import('./pages/cart/CartDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Personal = lazy(() => import('./pages/Personal'));

function App() {
    return (
        <AuthProvider> {/* Bao bọc toàn bộ ứng dụng trong AuthProvider */}
            <BrowserRouter>
                <ToastContainer />
                <div className="App">
                    <Suspense fallback={<CircularProgress color="success" />}>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Home />} />
                                <Route path="cart" element={<CartDetail />} />
                                <Route path="contact-us" element={<ContactUs />} />
                                <Route path="products/:productId" element={<ProductDetail />} />
                                <Route path="about-us" element={<AboutUs />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                                <Route path='personal/:userId' element={<Personal />} />
                            </Route>
                            <Route path="account" element={<FormLayout />}>
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="forgot-password" element={<ForgotPassword />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
