import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {NavLink} from "react-router-dom";

function FavouriteEmpty() {
    return (
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center">
                                <FavoriteBorderIcon style={{fontSize: '80px', color: "#D19C97"}}/>
                                <h3><strong>Chưa có sản phẩm yêu thích nào</strong></h3>
                                <NavLink to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp
                                    tục mua sắm</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouriteEmpty;