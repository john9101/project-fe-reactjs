// import React, { useState } from 'react';
// import COD from '../../assets/img/cod.png';
// import CreditCard from '../../assets/img/vnpay.png';
// import MoMo from '../../assets/img/momo.png';
// import ZaloPay from '../../assets/img/zalo-pay.png'
//
// const paymentMethods = [
//     { id: 1, name: "Thanh toán khi nhận hàng (COD)", img: COD },
//     { id: 2, name: "Thanh toán VNPAY/VNPAY QR", img: CreditCard },
//     { id: 3, name: "Thanh toán ví điện tử MoMo", img: MoMo },
//     {id: 4,name: "Thanh toán ví điện tử ZaloPAY", img: ZaloPay}
// ];
//
// const PaymentMethods: React.FC = () => {
//     const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
//     const [selectedMethodName, setSelectedMethodName] = useState<string>("");
//
//     const handlePaymentClick = (methodId: number, methodName: string) => {
//         setSelectedMethodId((prevMethodId) => (prevMethodId === methodId ? null : methodId));
//         setSelectedMethodName(methodName);
//     };
//
//     const handleRadioChange = (methodId: number, methodName: string) => {
//         setSelectedMethodId(methodId);
//         setSelectedMethodName(methodName);
//     };
//
//     return (
//         <>
//             {paymentMethods.map((method) => (
//                 <div
//                     key={method.id}
//                     className={`payment-method mb-3 ${selectedMethodId === method.id ? 'selected' : ''}`}
//                     onClick={() => handlePaymentClick(method.id, method.name)}
//                 >
//                     <div className="payment-option">
//                         <div className="payment-icon custom-radio">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 className="btn-check input-radio-payment"
//                                 autoComplete="off"
//                                 checked={selectedMethodId === method.id}
//                                 onChange={() => handleRadioChange(method.id, method.name)}
//                             />
//                         </div>
//                         <img src={method.img} alt={method.name} className="payment-icon" />
//                         <p className="mb-0 ml-1 ${selectedMethodId === method.id ? 'selected' : ''}">
//                             {method.name}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//             <p>{selectedMethodId ? `Bạn chọn thanh toán bằng phương thức "${selectedMethodName}"` : '(*)Vui lòng chọn phương thức thanh toán'}</p>
//         </>
//     );
// };
//
// export default PaymentMethods;

import React, { useState } from 'react';
import COD from '../../assets/img/cod.png';
import CreditCard from '../../assets/img/vnpay.png';
import MoMo from '../../assets/img/momo.png';
import ZaloPay from '../../assets/img/zalo-pay.png';

const paymentMethods = [
    { id: 1, name: "Thanh toán khi nhận hàng (COD)", img: COD },
    { id: 2, name: "Thanh toán VNPAY/VNPAY QR", img: CreditCard },
    { id: 3, name: "Thanh toán ví điện tử MoMo", img: MoMo },
    { id: 4, name: "Thanh toán ví điện tử ZaloPAY", img: ZaloPay }
];

const PaymentMethods: React.FC = () => {
    const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
    const [selectedMethodName, setSelectedMethodName] = useState<string>("");

    const handlePaymentClick = (methodId: number, methodName: string) => {
        if (![2, 3, 4].includes(methodId)) {
            setSelectedMethodId((prevMethodId) => (prevMethodId === methodId ? null : methodId));
            setSelectedMethodName(methodName);
        }
    };

    const handleRadioChange = (methodId: number, methodName: string) => {
        if (![2, 3, 4].includes(methodId)) {
            setSelectedMethodId(methodId);
            setSelectedMethodName(methodName);
        }
    };

    return (
        <>
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
                                name="paymentMethod"
                                className="btn-check input-radio-payment"
                                autoComplete="off"
                                checked={selectedMethodId === method.id}
                                onChange={() => handleRadioChange(method.id, method.name)}
                                disabled={[2, 3, 4].includes(method.id)}
                            />
                        </div>
                        <img src={method.img} alt={method.name} />
                        <p className={`mb-0 ml-1 ${selectedMethodId === method.id ? 'selected' : ''} ${[2, 3, 4].includes(method.id) ? 'disabled-text' : ''}`}>
                            {method.name}
                        </p>
                    </div>
                </div>
            ))}
            <p>{selectedMethodId ? `Bạn chọn thanh toán bằng phương thức "${selectedMethodName}"` : '(*) Vui lòng chọn phương thức thanh toán'}</p>
        </>
    );
};

export default PaymentMethods;

