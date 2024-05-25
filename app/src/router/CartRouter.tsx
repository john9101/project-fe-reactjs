import React from 'react';
import { Route, Routes } from "react-router-dom";
import CartDetail from "../components/cart/CartDetail";

function CartRouter() {
    return (
        <Routes>
            <Route path="/cart" element={<CartDetail />} />
        </Routes>
    );
}

export default CartRouter;