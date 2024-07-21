import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import PaymentItems from './PaymentItems';
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import {CheckoutFormType} from "../../pages/CheckOut";
import * as Yup from "yup";
import COD from "../../assets/img/cod.png";
import CreditCard from "../../assets/img/vnpay.png";
import MoMo from "../../assets/img/momo.png";
import ZaloPay from "../../assets/img/zalo-pay.png";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formatCurrency} from "../../util/formatCurrency";

interface SecondStepCheckoutProps {
    handleCheckFormDataChange: (newCheckoutFormData: CheckoutFormType) => void;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    checkoutFormData: CheckoutFormType;
    totalPrice: number;
}

const secondStepCheckoutSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('Chọn hình thức thanh toán')
});

const paymentMethods = [
    {id: 1, name: "Thanh toán khi nhận hàng (COD)", img: COD},
    {id: 2, name: "Thanh toán VNPAY/VNPAY QR", img: CreditCard},
    {id: 3, name: "Thanh toán ví điện tử MoMo", img: MoMo},
    {id: 4, name: "Thanh toán ví điện tử ZaloPAY", img: ZaloPay}
];

const SecondStepCheckout = ({
                                setActiveStep,
                                handleCheckFormDataChange,
                                checkoutFormData,
                                totalPrice
                            }: SecondStepCheckoutProps) => {
    console.log(totalPrice)
    const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
    const [selectedMethodName, setSelectedMethodName] = useState<string>("");

    const {
        register: secondStepCheckoutRegister,
        handleSubmit: handleSubmitSecondStepCheckout,
        formState: {errors: secondStepCheckoutErrors},
        reset
    } = useForm<Pick<CheckoutFormType, 'paymentMethod'>>({
        resolver: yupResolver(secondStepCheckoutSchema)
    });

    const onSubmitSecondStepCheckout = (secondStepCheckoutData: Pick<CheckoutFormType, 'paymentMethod'>) => {
        handleCheckFormDataChange({...checkoutFormData, paymentMethod: secondStepCheckoutData.paymentMethod});
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handlePaymentClick = (methodId: number, methodName: string) => {
        if (![2, 3, 4].includes(methodId)) {
            setSelectedMethodId((prevMethodId) => (prevMethodId === methodId ? null : methodId));
            setSelectedMethodName(methodName);
        }
    };

    return (
        <form className="container" onSubmit={handleSubmitSecondStepCheckout(onSubmitSecondStepCheckout)}>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="d-flex flex-row align-items-center">
                    <h4 className="text-uppercase mt-1">Hình thức thanh toán</h4>
                </div>
                <NavLink to={"/cart"}>Quay về giỏ hàng</NavLink>
            </div>
            <div className="row m-0">
                <div className="col-md-7 col-12">
                    <div className="row">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`payment-method mb-3 ${selectedMethodId === method.id ? 'selected' : ''} ${[2, 3, 4].includes(method.id) ? 'disabled' : ''}`}
                                onClick={() => handlePaymentClick(method.id, method.name)}
                            >
                                <div className="payment-option">
                                    <div className="payment-icon custom-radio">
                                        <input
                                            type="radio"
                                            className="btn-check input-radio-payment"
                                            autoComplete="off"
                                            value={method.name}
                                            checked={selectedMethodId === method.id}
                                            disabled={[2, 3, 4].includes(method.id)}
                                            {...secondStepCheckoutRegister('paymentMethod')}
                                        />
                                    </div>
                                    <img src={method.img} alt={method.name}/>
                                    <p className={`mb-0 ml-1 ${selectedMethodId === method.id ? 'selected' : ''} ${[2, 3, 4].includes(method.id) ? 'disabled-text' : ''}`}>
                                        {method.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {selectedMethodId && <p>{`Bạn chọn thanh toán bằng phương thức "${selectedMethodName}"`}</p>}
                        {secondStepCheckoutErrors.paymentMethod &&
                            <span className="text-danger">{secondStepCheckoutErrors.paymentMethod.message}</span>}
                    </div>
                </div>
                <div className="col-md-5 col-12 ps-md-5 p-0 ">
                    <PaymentItems/>
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Giỏ hàng</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Tạm tính</h6>
                                <h6 className="font-weight-medium"></h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Tổng tiền</h5>
                                <h5 className="font-weight-bold">{formatCurrency(totalPrice)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box className={"col-12"} sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button disabled variant={"secondary"} className={"mr-1"}>Quay lại</Button>
                <Box sx={{flex: '1  auto'}}/>

                <Button variant="primary" className={"fa-pull-right"} type="submit">
                    Đặt hàng
                </Button>
            </Box>
        </form>
    );
};

export default SecondStepCheckout;