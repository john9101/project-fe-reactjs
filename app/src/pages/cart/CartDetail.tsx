    import React from 'react';
    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
    import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
    import DeleteIcon from '@mui/icons-material/Delete';
    import {useState} from "react";
    import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
    import {useDispatch, useSelector} from "react-redux";
    import {AppDispatch, RootState} from "../../store/store";
    import {removeFromCart} from "../../store/cart.slice";
    import {NavLink} from "react-router-dom";
    import {formatCurrency} from "../../util/formatCurrency";

    function CartDetail() {
        const cart = useSelector((state: RootState) => state.cart);

        function convertStringPriceToNumber(stringPrice:string):number {
            let temp:string = stringPrice.replace(/[^0-9]/g, '');
            let numberPrice:number = parseFloat(temp);
            return numberPrice;
        }
        function calculateTotalPrice(priceString:string, quantity:number):number {
            let price: number = convertStringPriceToNumber(priceString);
            let totalPrice:number = price * quantity;
            return totalPrice;
        }

        const dispatch = useDispatch<AppDispatch>();
        const handleRemoveProduct = (id: string) => {
            dispatch(removeFromCart(id));
        }
        if (cart.cartItems.length === 0) {
            return(
                <div className="container-fluid mt-100">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body cart">
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <ShoppingCartIcon style={{fontSize: '80px', color: "#D19C97"}}/>
                                        <h3><strong>Giỏ hàng trống</strong></h3>
                                        <h4>Add something to make me happy :)</h4>
                                        <NavLink to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp tục mua sắm</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (

                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Loại</th>
                                    <th>Giá</th>
                                    <th>Size</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                    <th>Xóa</th>
                                </tr>
                                </thead>
                                {cart.cartItems?.map((cartItem) => (
                                    <tbody className="align-middle">
                                    <tr>
                                        <td className="align-middle">
                                            <img src={cartItem.product.images[0]} alt=""
                                                 style={{width: '50px'}}/> {cartItem.product.name}
                                        </td>
                                        <td className={"align-middle"}>{cartItem.selectedOption}</td>
                                    <td className="align-middle">{cartItem.price}</td>
                                    <td className="align-middle">
                                        {cartItem.selectedSize}
                                    </td>
                                    <td className="align-middle">
                                        <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-primary btn-minus">
                                                    <FontAwesomeIcon icon={faMinus}/>
                                                </button>
                                            </div>
                                            <input type="text"
                                                   className="form-control form-control-sm bg-secondary text-center"
                                                   value={cartItem.quantity}
                                                   readOnly/>
                                            <div className="input-group-btn" >
                                                <button className="btn btn-sm btn-primary btn-plus">
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        {formatCurrency(calculateTotalPrice(cartItem.price!, cartItem.quantity))}
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn btn-sm" onClick={()=>handleRemoveProduct(cartItem.id)}>
                                            <FontAwesomeIcon icon={faTrash} style={{color: "#D19C97"}}/>
                                        </button>
                                    </td>

                                </tr>
                                </tbody>
                            ))}
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
                                    <h6 className="font-weight-medium">{cart.totalPrice}</h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Giảm</h6>
                                    <h6 className="font-weight-medium">0</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Phí giao hàng </h6>
                                    <h6 className="font-weight-medium">0</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Tổng tiền</h5>
                                    <h5 className="font-weight-bold">{formatCurrency(cart.totalPrice)}</h5>
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )};
    }

    export default CartDetail;