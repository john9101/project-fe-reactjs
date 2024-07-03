import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {NavLink} from "react-router-dom";
import React from "react";

export default function CartEmpty(){
    return (
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center">
                                <ShoppingCartIcon style={{fontSize: '80px', color: "#D19C97"}}/>
                                <h3><strong>Giỏ hàng trống</strong></h3>
                                <NavLink to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp
                                    tục mua sắm</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}