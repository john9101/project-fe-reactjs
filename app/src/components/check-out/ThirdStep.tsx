import React from 'react';
import Button from "react-bootstrap/Button";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CheckoutFormType} from "../../pages/CheckOut";
import {formatCurrency} from "../../util/formatCurrency";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {removeAllFromCart} from "../../store/cart.slice";

function formatDateTime(date: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
    return (
        pad(date.getHours()) + ':' +
        pad(date.getMinutes()) + ':' +
        pad(date.getSeconds()) + ' ' +
        date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate())
    );
}

interface ThirdStepProps {
    checkoutFormData: CheckoutFormType;
    totalPrice: number;
    voucherCode: string;
    totalDiscount: number;
}

function ThirdStep({checkoutFormData, totalPrice, voucherCode, totalDiscount}: ThirdStepProps) {
    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentDateTime = formatDateTime(new Date());
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const handleCompleteClick = () => {
        dispatch(removeAllFromCart());
        navigate("/");
    };
    return (
        <div>
            <div className={"container"}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="d-flex flex-row align-items-center">
                        <h4 className="text-uppercase mt-1">Kiểm tra hóa đơn</h4>
                    </div>
                        <Button variant="primary" className={"fa-pull-right"} type="button" onClick={handleCompleteClick}>
                            Hoàn tất
                        </Button>
                </div>
                <div className="h-100">
                    <div className=" h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "10px"}}>
                                    <div className="card-header px-4 py-5">
                                        <h5 className="text-muted mb-0">
                                            Cảm ơn bạn <span
                                            style={{color: "#a8729a"}}>{checkoutFormData.fullName}</span> đã đặt hàng!
                                        </h5>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0" style={{color: "#a8729a"}}>Chi tiết đơn
                                                hàng</p>
                                            <p className="small text-muted mb-0">Mã giảm giá
                                                : {voucherCode ? voucherCode : 'không'}</p>
                                        </div>
                                        {cartItems.map(item => {
                                            const selectedOption = item.product.options.find(option => option.name === item.selectedOption.name);
                                            const image = selectedOption ? selectedOption.image : '';
                                            return (
                                                <div className="card shadow-0 border mb-4">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <img
                                                                    src={image}
                                                                    className="img-fluid" alt="Phone"
                                                                    style={{width: "100px"}}
                                                                />
                                                            </div>
                                                            <div
                                                                className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0">{item.product.name}</p>
                                                            </div>
                                                            <div
                                                                className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">{item.selectedOption.name}</p>
                                                            </div>
                                                            <div
                                                                className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">Size: {item.selectedSize.name}</p>
                                                            </div>
                                                            <div
                                                                className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">Số
                                                                    lượng: {item.quantity}</p>
                                                            </div>
                                                            <div
                                                                className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">{formatCurrency(item.quantity * item.product.originalPrice)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0" style={{color: "#a8729a"}}>Chi tiết người
                                                nhận</p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Họ tên</p>
                                            <p className="text-muted mb-0">{checkoutFormData.fullName}</p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Số điện thoại</p>
                                            <p className="text-muted mb-0">{checkoutFormData.phone}</p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Email</p>
                                            <p className="text-muted mb-0">{checkoutFormData.email}</p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Ghi chú</p>
                                            <p className="text-muted mb-0">
                                                {checkoutFormData.note ? checkoutFormData.note : 'Không có'}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Thời gian đặt hàng</p>
                                            <p className="text-muted mb-0">
                                                {currentDateTime}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Địa chỉ:</p>
                                            <p className="text-muted mb-0"><span
                                                className="fw-bold me-4">{checkoutFormData.specificAddress}, </span>
                                                <span
                                                    className="fw-bold me-4"> {checkoutFormData.ward}, </span>
                                                <span
                                                    className="fw-bold me-4">{checkoutFormData.district}, </span>
                                                <span
                                                    className="fw-bold me-4">{checkoutFormData.province}</span>
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <p className="text-muted mb-0">Giảm</p>
                                            <p className="text-muted mb-0">
                                                {totalDiscount > 0 ? formatCurrency(totalDiscount) : 'Không'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-footer  bg-primary">
                                        <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                            Tổng tiền: <span
                                            className="h2 mb-0 ms-2">{formatCurrency(totalPrice)}</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ThirdStep;