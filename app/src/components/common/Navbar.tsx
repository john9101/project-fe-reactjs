import {NavLink, useLocation} from "react-router-dom";
import Logo from "./Logo";
import HomeCarosel from "../carousel/HomeCarousel";
import React from "react";
import CategoryList from "./CategoriesList";

const Navbar = () => {
    const location = useLocation();
    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <CategoryList/>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <NavLink to="/" className="d-lg-none">
                            <Logo/>
                        </NavLink>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to="/" className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Trang chủ</NavLink>
                                <NavLink to="/shop" state={{resetCollection: true}} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Cửa hàng</NavLink>
                                <NavLink to="/about-us" className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Giới thiệu</NavLink>
                                <NavLink to="/contact-us" className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Liên hệ</NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                <NavLink to="/account/login" className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng nhập</NavLink>
                                <NavLink to="/account/register" className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng ký</NavLink>
                            </div>
                        </div>
                    </nav>
                    {location.pathname === '/' && <HomeCarosel/>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;