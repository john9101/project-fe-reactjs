import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import HomeCarosel from "../carousel/HomeCarousel";

const Navbar = () => {
    const location = useLocation();
    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <NavLink className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                        data-toggle="collapse" to="#navbar-vertical"
                        style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}>
                        <h6 className="m-0">Categories</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </NavLink>


                    <nav
                        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                        id="navbar-vertical">
                        <div className="navbar-nav w-100 overflow-hidden" style={{ height: "410px" }}>
                            <div className="nav-item dropdown">
                                <NavLink to="#" className="nav-link" data-toggle="dropdown">Dresses <i
                                    className="fa fa-angle-down float-right mt-1"></i></NavLink>
                                <div
                                    className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                    <NavLink to="" className="dropdown-item">Men's Dresses</NavLink>
                                    <NavLink to="" className="dropdown-item">Women's Dresses</NavLink>
                                    <NavLink to="" className="dropdown-item">Baby's Dresses</NavLink>
                                </div>
                            </div>
                            <NavLink to="" className="nav-item nav-link">Shirts</NavLink>
                            <NavLink to="" className="nav-item nav-link">Jeans</NavLink>
                            <NavLink to="" className="nav-item nav-link">Swimwear</NavLink>
                            <NavLink to="" className="nav-item nav-link">Sleepwear</NavLink>
                            <NavLink to="" className="nav-item nav-link">Sportswear</NavLink>
                            <NavLink to="" className="nav-item nav-link">Jumpsuits</NavLink>
                            <NavLink to="" className="nav-item nav-link">Blazers</NavLink>
                            <NavLink to="" className="nav-item nav-link">Jackets</NavLink>
                            <NavLink to="" className="nav-item nav-link">Shoes</NavLink>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <NavLink to="" className="text-decoration-none d-block d-lg-none">
                            <Logo />
                        </NavLink>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to="/" className="nav-item nav-link active">Trang chủ</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Cửa hàng</NavLink>
                                <NavLink to="/about-us" className="nav-item nav-link">Giới thiệu</NavLink>
                                <NavLink to="/contact-us" className="nav-item nav-link">Liên hệ</NavLink>

                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                <NavLink to="" className="nav-item nav-link">Đăng nhập</NavLink>
                                <NavLink to="" className="nav-item nav-link">Đăng ký</NavLink>
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