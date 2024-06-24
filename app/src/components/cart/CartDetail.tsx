import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function CartDetail() {
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                                <th>Xóa</th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                            <tr>
                                <td className="align-middle"><img src="img/product-1.jpg" alt=""
                                                                  style={{width: '50px'}}/> Tên sản phẩm
                                </td>
                                <td className="align-middle">$Giá </td>
                                <td className="align-middle">
                                    <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-primary btn-minus">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                        </div>
                                        <input type="text"
                                               className="form-control form-control-sm bg-secondary text-center"
                                               value="1"/>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-primary btn-plus">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle">$Tổng tiền </td>
                                <td className="align-middle">
                                    <button className="btn btn-sm btn-primary">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input type="text" className="form-control p-4" placeholder="Mã giảm"/>
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
                                    <h6 className="font-weight-medium">Giá</h6>
                                    <h6 className="font-weight-medium">$150</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Vận chuyển</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Tổng tiền</h5>
                                    <h5 className="font-weight-bold">$160</h5>
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartDetail;