import React from 'react';
import {Box} from "@mui/material";
import pageNotFound from "../assets/img/404.png";
import {NavLink} from "react-router-dom";


function PageNotFound() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-70">
            <img src={pageNotFound} style={{width: '30rem'}} alt="Page Not Found"/>
            <p>Xin lỗi, trang hiện tại không tìm thấy</p>
            <NavLink to="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Quay về trang
                chủ</NavLink>
        </div>
    );

}

export default PageNotFound;