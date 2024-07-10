import React from 'react';
import {formatCurrency} from "../../util/formatCurrency";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

function CartItemsMini() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    return (
        <div className="cart-items-mini">
            {cartItems.length > 0 ? (
                cartItems.map(item => {
                    const selectedOption = item.product.options.find(option => option.name === item.selectedOption.name);
                    const image = selectedOption ? selectedOption.image : '';
                    return (
                        <StyledNavLink to={`/products/${item.product._id}`} key={item.id}>
                            <div className="cart-item">
                                <img src={image} alt={item.product.name} style={{width: '60px', height: '65px'}}/>
                                <div className="cart-item-details text-left">
                                    <h6>{item.product.name}</h6>
                                    <div className="cart-item-details-sub">
                                        <p>Loại: {item.selectedOption.name}</p>
                                        <p>Size: {item.selectedSize}</p>
                                    </div>
                                    <div className="cart-item-details-sub">
                                        <p>Số lượng: {item.quantity} </p>
                                        <p className={"mr-0"}>Giá: {formatCurrency(item.product.originalPrice * (1 - item.product.discountPercent))}</p>
                                    </div>
                                </div>
                            </div>
                        </StyledNavLink>
                    );
                })
            ) : (
                <p className={"mini-cart-empty"} style={{display: "flex", justifyContent: "center"}}>Giỏ hàng của bạn
                    đang trống</p>
            )}
        </div>
    );
}

export default CartItemsMini;
