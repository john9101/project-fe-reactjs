import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {NavLink} from "react-router-dom";
import noResults from "../assets/img/no-results.png";
import {Box} from "@mui/material";

function FavouriteEmpty() {
    return (
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card-body cart">
                        <div className="col-sm-12 empty-cart-cls text-center">
                            <Box component='section' sx={
                                {
                                    m: 2,
                                    p: 4,
                                    width: 1,
                                    border: '1px dashed var(--primary)',
                                    textAlign: 'center',
                                    borderRadius: '8px'
                                }
                            }>
                                <img src={noResults} style={{width: '20rem'}}/>
                                <p>Bạn chưa có sản phẩm yêu thích nào cả</p>
                                <NavLink to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp
                                    tục mua sắm</NavLink>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouriteEmpty;