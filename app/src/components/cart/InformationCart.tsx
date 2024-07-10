import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {formatCurrency} from "../../util/formatCurrency";
import VoucherCard from "../common/VoucherCard";
import {NavLink} from "react-router-dom";

export default function InformationCart() {
    const cart = useSelector((state: RootState) => state.cart);
    const [voucherCode, setVoucherCode] = useState<string>("");

    const totalPrice = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity * (1 - cartItem.product.discountPercent);
        }, 0);
    }, [cart.cartItems]);

    const totalDiscount = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity * cartItem.product.discountPercent;
        }, 0);
    }, [cart.cartItems]);

    const totalPriceWithoutDiscount = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity;
        }, 0);
    }, [cart.cartItems]);
    const handleApplyVoucher = (code: string) => {
        setVoucherCode(code);
    };
    return (
        <div className="col-lg-4">
            <div className="voucher-container">
                <VoucherCard onSelectVoucher={handleApplyVoucher}/>
            </div>
            <form className="mb-5" action="">
                <div className="input-group">
                    <input type="text" className="form-control p-4" placeholder="Mã giảm" value={voucherCode}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary">Áp dụng giảm giá</button>
                    </div>
                </div>
            </form>

            <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0">Giỏ hàng</h4>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3 pt-1">
                        <h6 className="font-weight-medium">Giá trước giảm giá</h6>
                        <h6 className="font-weight-medium">{formatCurrency(totalPriceWithoutDiscount)}</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pt-1">
                        <h6 className="font-weight-medium">Giảm giá</h6>
                        <h6 className="font-weight-medium">{formatCurrency(totalDiscount)}</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-3 pt-1">
                        <h6 className="font-weight-medium">Giá sau giảm giá</h6>
                        <h6 className="font-weight-medium">{formatCurrency(totalPrice)}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h6 className="font-weight-medium">Phí giao hàng</h6>
                        <h6 className="font-weight-medium">0</h6>
                    </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                    <div className="d-flex justify-content-between mt-2">
                        <h5 className="font-weight-bold">Tổng tiền</h5>
                        <h5 className="font-weight-bold">{formatCurrency(totalPrice)}</h5>
                    </div>
                    <NavLink to={"/check-out"}>
                        <button className="btn btn-block btn-primary my-3 py-3">
                            Đặt hàng
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
