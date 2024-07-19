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
import {PathNamesConstant} from "./constants/pathNames.constant";

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
    const collectionPaths = [
        PathNamesConstant.shop,
        `${PathNamesConstant.feature}/:featureName`,
        PathNamesConstant.search,
        `${PathNamesConstant.category}/:categoryId`
    ];

    return (
        <BrowserRouter>
            <ToastContainer/>
            <div className="App">
                <Suspense fallback={<CircularProgress color="success" />}>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path={PathNamesConstant.cart} element={<CartDetail />} />
                            <Route path={PathNamesConstant.contactUs} element={<ContactUs />} />
                            <Route path={PathNamesConstant.aboutUs} element={<AboutUs/>}/>
                            <Route path={`${PathNamesConstant.uniform}/:uniformId`} element={<ProductDetail/>} />
                            {collectionPaths.map((path, index) => (
                                <Route key={index} path={path} element={<Collection />} />
                            ))}
                        </Route>
                        <Route path={PathNamesConstant.account} element={<FormLayout />}>
                            <Route path={PathNamesConstant.login} element={<Login />} />
                            <Route path={PathNamesConstant.register} element={<Register />} />
                            <Route path={PathNamesConstant.forgotPassword} element={<ForgotPassword />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;
