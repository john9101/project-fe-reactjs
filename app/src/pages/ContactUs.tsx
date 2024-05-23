import React from 'react';
import {Link} from "react-router-dom";
function ContactUs() {
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="container text-left text-dark">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="wrapper">
                                    <div className="row no-gutters">
                                        <div className="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch bg-secondary">
                                            <div className="contact-wrap w-100 p-md-5 p-4">
                                                <h3 className="mb-4">Nội dung</h3>
                                                <form className="contactForm">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="label" htmlFor="name">Họ và tên</label>
                                                                <input type="text" className="form-control" name="name"
                                                                       id="name" placeholder="Họ và tên"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="label" htmlFor="email">Email</label>
                                                                <input type="email" className="form-control"
                                                                       name="email" id="email" placeholder="Email"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="label"
                                                                       htmlFor="subject">Chủ đề</label>
                                                                <input type="text" className="form-control"
                                                                       name="subject" id="subject"
                                                                       placeholder="Chủ đề"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="label" htmlFor="#">Nội dung</label>
                                                                <textarea name="message" className="form-control"
                                                                          id="message" cols={3} rows={4}
                                                                          placeholder="Nhập nội dung cần gửi..."></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group fa-pull-right">
                                                                <input type="submit" value="Gửi"
                                                                       className="btn btn-primary"/>
                                                                <div className="submitting"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-5 d-flex align-items-stretch">
                                            <div className="info-wrap bg-primary w-100 p-md-5 p-4 ">
                                                <div className="col-lg-3 d-none d-lg-block mb-5">
                                                    <Link to={"/"} className="text-decoration-none">
                                                        <h1 className="m-0 display-5 font-weight-semi-bold"><span
                                                            className="text-white font-weight-bold border px-3 mr-1">E</span>Shopper
                                                        </h1>
                                                    </Link>
                                                </div>
                                                <div
                                                    className="dbox w-100 d-flex align-items-start align-items-center mb-4">
                                                    <i className="fa-solid fa-location-dot mr-3"></i>
                                                    Khu phố 6, Phường Linh Trung, Quận Thủ Đức, TP.HCM
                                                </div>
                                                <div className="dbox w-100 d-flex align-items-center mb-4">
                                                    <i className="fa-solid fa-phone mr-3"></i>
                                                    +84 909 323 070
                                                </div>
                                                <div className="dbox w-100 d-flex align-items-center">
                                                    <i className="fa-solid fa-envelope mr-3"></i>
                                                    dongphucviet@gmail.com
                                                </div>
                                                <div className="dbox w-100 d-flex align-items-center">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;