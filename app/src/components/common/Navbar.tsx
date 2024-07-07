import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import HomeCarosel from "../carousel/HomeCarousel";
import React from "react";
import CategoryList from "./CategoriesList";

const Navbar = () => {
    const location = useLocation();
    return (
        <div className="container-fluid mb-5">
            <div className="row px-xl-5" style={{display: "flex", justifyContent: "space-between"}}>
                <CategoryList/>
                <div className="col-lg-8" >
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-5 py-0 mr-6">
                                <NavLink to="/" className="nav-item nav-link active">Trang chủ</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Cửa hàng</NavLink>
                                <NavLink to="/about-us" className="nav-item nav-link">Giới thiệu</NavLink>
                                <NavLink to="/contact-us" className="nav-item nav-link">Liên hệ</NavLink>

                            </div>
                            <div className="navbar-nav ml-auto py-0 fa-pull-right">
                                <NavLink to="/account/login" className="nav-item nav-link">Đăng nhập</NavLink>
                                <NavLink to="/account/register" className="nav-item nav-link">Đăng ký</NavLink>
                            </div>
                        </div>
                    </nav>
                    {location.pathname === '/' && <HomeCarosel />}
                </div>
            </div>
        </div>
    )
}

export default Navbar;