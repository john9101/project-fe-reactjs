import React, { lazy, Suspense } from 'react';
import './App.css';
import './assets/css/style.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout";

import { CircularProgress } from "@mui/material";

const ContactUs = lazy(() => import('./pages/ContactUs'));
const CartDetail = lazy(() => import('./components/cart/CartDetail'));

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Suspense fallback={<CircularProgress color="success" />}>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/cart" element={<CartDetail />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                            {/*Muốn trang có topbar, footer thì thêm một route vô đây*/}
                        </Route>

                        {/*<Route path="/any-router" element={<AnyComponent/>}> Muốn trang không có topbar, footer thì khai báo một route mới */}
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
}

export default App;