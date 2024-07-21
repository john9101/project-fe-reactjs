import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {NavLink} from "react-router-dom";
import {formatCurrency} from "../../util/formatCurrency";

function PaymentItems() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    return (
        <div className="cart-items-mini">
            {
                cartItems.map(item => {
                    const selectedOption = item.product.options.find(option => option.name === item.selectedOption.name);
                    const image = selectedOption ? selectedOption.image : '';
                    return (
                        <div  key={item.id}>
                            <div className="cart-item">
                                <img src={image} alt={item.product.name} style={{width: '60px', height: '65px'}}/>
                                <div className="cart-item-details text-left">
                                    <h6>{item.product.name}</h6>
                                    <div className="cart-item-details-sub">
                                        <p>Loại: {item.selectedOption.name}</p>
                                        <p>Size: {item.selectedSize.name}</p>
                                    </div>
                                    <div className="cart-item-details-sub">
                                        <p>Số lượng: {item.quantity} </p>
                                        <p className={"mr-0"}>Giá: {formatCurrency(item.product.originalPrice * (1 - item.product.discountPercent))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PaymentItems;