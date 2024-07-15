import {Link, NavLink} from "react-router-dom";
import Logo from "./Logo";
import Certificate from '../../assets/img/bocongthuong.png'
import NetworkTrust from '../../assets/img/tinnhiemmang.png'
import React from "react";
import {
    faAddressCard,
    faCartShopping,
    faEnvelope,
    faHouse,
    faLocationDot,
    faPhone, faUserTie
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
    color: #C07973;
`;
const Footer = () => {
    return (
        <div className="container-fluid bg-secondary text-dark mt-5 pt-4">
            <div className="row px-xl-5">
                <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5 text-left">
                    <a href="" className="text-decoration-none">
                        <Logo/>
                    </a>
                    <p>Chúng tôi tự hào là đơn vị cung cấp đồng phục chất lượng cao với nhiều năm kinh
                        nghiệm trong ngành, cam kết mang đến cho khách hàng những sản phẩm đồng phục đẹp, bền và
                        thoải mái nhất.</p>
                    <p className="mb-2"><StyledFontAwesomeIcon icon={faLocationDot}/>Khu phố 6, phường Linh Trung, tp
                        Thủ Đức, tp Hồ Chí Minh</p>
                    <p className="mb-2"><StyledFontAwesomeIcon icon={faEnvelope}/>dongphucviet@example.com</p>
                    <p className="mb-0"><StyledFontAwesomeIcon icon={faPhone}/>+84 901 323 070</p>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="row">
                        <div className="col-md-4 mb-5 text-left">
                            <h5 className="font-weight-bold text-dark mb-4">Liên kết </h5>
                            <div className="d-flex flex-column justify-content-start ">
                                <NavLink className="text-dark mb-2" to="/">
                                    <StyledFontAwesomeIcon icon={faHouse}/>Trang chủ
                                </NavLink>
                                <NavLink className="text-dark mb-2" to="/cart">
                                    <StyledFontAwesomeIcon icon={faCartShopping}/>Giỏ hàng</NavLink>
                                <NavLink className="text-dark mb-2" to="/user"><StyledFontAwesomeIcon icon={faUserTie}/>Trang
                                    cá nhân</NavLink>
                                <NavLink className="text-dark mb-2" to="/contact-us">
                                    <StyledFontAwesomeIcon icon={faAddressCard}/>Liên hệ</NavLink>
                            </div>
                        </div>

                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Nhận thông báo mới</h5>
                            <form action="">
                                <div className="form-group">
                                    <input type="text" className="form-control border-0 py-4" placeholder="Tên của bạn"
                                           required/>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control border-0 py-4" placeholder="Email"
                                           required/>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block border-0 py-3" type="submit">Đăng ký
                                        ngay
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4 mb-5  text-left">
                            <div className="d-flex flex-column justify-content-start">
                                <img src={Certificate} style={{width: '120px'}}/>
                                <img src={NetworkTrust} style={{width: '120px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border-top border-light mx-xl-5 py-4 align-items-center"
                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <p className="mb-md-0 text-center text-md-left text-dark">
                    &copy; <a className="text-dark font-weight-semi-bold" href="#">Uniform Young's Style</a>. All Rights
                    Reserved. Designed
                    by
                    <a className="text-dark font-weight-semi-bold" href="https://htmlcodex.com"> ReactJS</a><br/>
                </p>
            </div>
        </div>
    )
}

export default Footer