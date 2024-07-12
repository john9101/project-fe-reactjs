import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {formatCurrency} from "../../util/formatCurrency";
import VoucherCard from "../common/VoucherCard";

export default function InformationCart() {
    const cart = useSelector((state: RootState) => state.cart);
    const [voucherCode, setVoucherCode] = useState<string>("");
    const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

    const totalPriceWithoutDiscount = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity;
        }, 0);
    }, [cart.cartItems]);

    const totalDiscountWithoutVoucher = useMemo(() => {
        return cart.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.originalPrice * cartItem.quantity * cartItem.product.discountPercent;
        }, 0);
    }, [cart.cartItems]);

    const discountByVoucher = useMemo(() => {
        return totalPriceWithoutDiscount * voucherDiscount;
    }, [totalPriceWithoutDiscount, voucherDiscount]);
    console.log(discountByVoucher)

    const totalDiscount = useMemo(() => {
        return totalDiscountWithoutVoucher + discountByVoucher;
    }, [totalDiscountWithoutVoucher, discountByVoucher]);

    const totalPrice = useMemo(() => {
        return totalPriceWithoutDiscount - totalDiscount;
    }, [totalPriceWithoutDiscount, totalDiscount]);


    const handleApplyVoucher = (code: string, discount: number) => {
        setVoucherCode(code);
        setVoucherDiscount(discount);
    };
    console.log(voucherDiscount)

    return (
        <div className="col-lg-4">
            <VoucherCard onSelectVoucher={handleApplyVoucher}/>
            <form className="mb-5" action="">
                <div className="input-group">
                    <input type="text" className="form-control p-4" placeholder="Mã giảm" value={voucherCode} aria-placeholder={"Mã giảm"}/>
                </div>
            </form>

            <div className="card border-secondary mb-5">
                <div className="card-header bg-secondary border-0">
                    <h4 className="font-weight-semi-bold m-0">Giỏ hàng</h4>
                </div>
                <div className="card-body">

                    <div className="d-flex justify-content-between mb-3 pt-1">
                        <h6 className="font-weight-medium">Tạm tính</h6>
                        <h6 className="font-weight-medium">{formatCurrency(totalPrice)}</h6>
                    </div>
                </div>
                <div className="card-footer border-secondary bg-transparent">
                    <div className="d-flex justify-content-between mt-2">
                        <h5 className="font-weight-bold">Tổng tiền</h5>
                        <h5 className="font-weight-bold">{formatCurrency(totalPrice)}</h5>
                    </div>
                    <button className="btn btn-block btn-primary my-3 py-3">Đặt hàng</button>
                </div>
            </div>
        </div>
    );
}
