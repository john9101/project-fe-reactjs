import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {removeFromCart} from "../store/cart.slice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InformationCart from "../components/cart/InformationCart";
import CartItemsList from "../components/cart/CartItemsList";
import CartEmpty from "../components/cart/CartEmpty";

function CartDetail() {
    const cart = useSelector((state: RootState) => state.cart);

    if (cart.cartItems.length === 0) {
        return (
            <CartEmpty/>
        )
    } else {
        return (
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <CartItemsList/>
                    <InformationCart/>
                </div>
            </div>
        );
    }
}

export default CartDetail;

