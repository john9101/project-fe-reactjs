import React, { lazy, Suspense } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/css/style.module.scss';
import './assets/css/styleLogin.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { CircularProgress } from "@mui/material";
import FormLayout from './layout/FormLayout';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./pages/PageNotFound";

const Home = lazy(() => import('./pages/Home'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CartDetail = lazy(() => import('./pages/cart/CartDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Collection = lazy(() => import('./pages/Collection'));

function App() {
    const collectionPaths = ["/shop", "/feature/:featureName", "/search", '/category/:categoryId'];

    return (
        <BrowserRouter>
            <ToastContainer/>
            <div className="App">
                <Suspense fallback={<CircularProgress color="success" />}>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="cart" element={<CartDetail />} />
                            <Route path="contact-us" element={<ContactUs />} />
                            <Route path='about-us' element={<AboutUs/>}/>
                            <Route path="products/:productId" element={<ProductDetail/>} />
                            {collectionPaths.map((path, index) => (
                                <Route key={index} path={path} element={<Collection />} />
                            ))}
                        </Route>
                        <Route path="account" element={<FormLayout />}>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path='forgot-password' element={<ForgotPassword />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;
