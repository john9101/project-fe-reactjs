import React, { lazy, Suspense } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/css/style.module.scss';
import './assets/css/styleLogin.scss'
import './assets/css/styleAccount.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { CircularProgress } from "@mui/material";
import FormLayout from './layout/FormLayout';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from "./pages/CheckOut";
import PageNotFound from "./pages/PageNotFound";
import {PathNamesConstant} from "./constants/pathNames.constant";
import {AuthProvider} from './context/UserContext';
import CartDetail from "./pages/CartDetail";
import Wishlist from "./pages/Wishlist";
import CheckOut from "./pages/CheckOut";
import AccountLayout from "./layout/AccountLayout";

const Home = lazy(() => import('./pages/Home'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CartDetail = lazy(() => import('./pages/cart/CartDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Collection = lazy(() => import('./pages/Collection'));
const Personal = lazy(() => import('./pages/Personal'));

function App() {
    const collectionPaths = [
        PathNamesConstant.shop,
        `${PathNamesConstant.feature}/:featureName`,
        PathNamesConstant.search,
        `${PathNamesConstant.category}/:categoryId`
    ];

    return (
        <AuthProvider>
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
                                <Route path={PathNamesConstant.wishlist} element={<Wishlist />} />
                                {collectionPaths.map((path, index) => (
                                    <Route key={index} path={path} element={<Collection />} />
                                ))}
                                <Route path={PathNamesConstant.checkout} element={<CheckOut />} />
                                {/*<Route path='personal/:userId' element={<Personal />} />*/}
                            </Route>
                            <Route path="/" element={<FormLayout />}>
                                <Route path={PathNamesConstant.login} element={<Login />} />
                                <Route path={PathNamesConstant.register} element={<Register />} />
                                <Route path={PathNamesConstant.forgotPassword} element={<ForgotPassword />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                            <Route path={PathNamesConstant.account.parent} element={<AccountLayout/>}>
                                <Route path={PathNamesConstant.account.children.profile}/>
                                <Route path={PathNamesConstant.account.children.order}/>
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
