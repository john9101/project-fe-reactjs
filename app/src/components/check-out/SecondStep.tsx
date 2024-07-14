import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';
import PaymentItems from './PaymentItems';
import { formatCurrency } from '../../util/formatCurrency';


const SecondStep: React.FC = () =>{
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="d-flex flex-row align-items-center">
                    <h4 className="text-uppercase mt-1">Hình thức thanh toán</h4>
                </div>
                <NavLink to={"/cart"}>Hủy bỏ</NavLink>
            </div>
            <div className="row m-0">
                <div className="col-md-7 col-12">
                    <div className="row">
                        <PaymentMethods />
                    </div>
                </div>
                <div className="col-md-5 col-12 ps-md-5 p-0 ">
                    <PaymentItems />
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
                                <h5 className="font-weight-bold"></h5>
                            </div>
                            <NavLink to={"/check-out"}>
                                <button className="btn btn-block btn-primary my-3 py-3">
                                    Đặt hàng
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondStep;
