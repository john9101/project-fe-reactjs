import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {formatCurrency} from "../../util/formatCurrency";
import VoucherCard from "../common/VoucherCard";
import {NavLink} from "react-router-dom";

export default function InformationCart() {
    const cart = useSelector((state: RootState) => state.cart);
    const [voucherCode, setVoucherCode] = useState<string>("");
    const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
    const totalPrice = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity;
        }, 0);
    }, [cart.cartItems]);
    const discountByProduct = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity * cartItem.product.discountPercent;
        }, 0);
    }, [cart.cartItems]);
    const discountByVoucher = useMemo(() => {
        return totalPrice * voucherDiscount;
    }, [totalPrice, voucherDiscount]);
    const totalDiscountUseMemo = useMemo(() => {
        return discountByProduct + discountByVoucher;
    }, [discountByVoucher]);
    const [totalDiscount, setTotalDiscount] = useState<number>(totalDiscountUseMemo);

    useEffect(() => {
        setTotalDiscount(()=>totalDiscountUseMemo)
    }, [totalDiscountUseMemo]);

    const handleApplyVoucher = (code: string, discount: number) => {
        setVoucherCode(code);
        setVoucherDiscount(discount);
    };
    console.log("render")
    return (
        <div className="col-lg-4">
            <VoucherCard onSelectVoucher={handleApplyVoucher}/>
            <form className="mb-5" action="">
                <div className="input-group">
                    <input type="text" className="form-control p-4" placeholder="Mã giảm" value={voucherCode}
                           aria-placeholder={"Mã giảm"}/>
                </div>
            </form>
            {cart.cartItems?.map((cartItem) => (
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Giỏ hàng</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Giá</h6>
                            <h6 className="font-weight-medium">{formatCurrency(cart.totalPrice)}</h6>
                        </div>
                        <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Giảm</h6>
                            <h6 className="font-weight-medium">{}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Phí giao hàng </h6>
                            <h6 className="font-weight-medium">0</h6>
                        </div>
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Tổng tiền</h5>
                            <h5 className="font-weight-bold">{formatCurrency(cart.totalPrice - cartItem.quantity * cartItem.product.originalPrice * cartItem.product.discountPercent)}</h5>
                        </div>
                        <button className="btn btn-block btn-primary my-3 py-3">Đặt hàng</button>
                    </div>
                </div>
            ))}
        </div>
    )
}