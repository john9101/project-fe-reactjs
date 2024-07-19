import {NavLink, useLocation} from "react-router-dom";
import Logo from "./Logo";
import Banner from "./Banner";
import React from "react";
import CategoriesMenu from "./CategoriesMenu";
import {PathNamesConstant} from "../../constants/pathNames.constant";

const Navbar = () => {
    const location = useLocation();
    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <CategoriesMenu/>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <NavLink to={PathNamesConstant.home} className="d-lg-none">
                            <Logo/>
                        </NavLink>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to={PathNamesConstant.home} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Trang chủ</NavLink>
                                <NavLink to={PathNamesConstant.shop} state={{resetCollection: true}} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Cửa hàng</NavLink>
                                <NavLink to={PathNamesConstant.aboutUs} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Giới thiệu</NavLink>
                                <NavLink to={PathNamesConstant.contactUs} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Liên hệ</NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                <NavLink to={`/${PathNamesConstant.account}/${PathNamesConstant.login}`} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng nhập</NavLink>
                                <NavLink to={`/${PathNamesConstant.account}/${PathNamesConstant.register}`} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng ký</NavLink>
                            </div>
                        </div>
                    </nav>
                    {location.pathname === PathNamesConstant.home && <Banner/>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;