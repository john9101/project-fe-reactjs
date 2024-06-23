import React from 'react';
import InformationContact from "./InformationContact";

function FormContact() {
    return (
        <div className="col-lg-7 mb-5">
            <div className="contact-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" noValidate={true}>
                    <div className="control-group">
                        <input type="text" className="form-control" id="name" placeholder="Họ và tên"
                               required data-validation-required-message="Vui lòng nhập họ và tên"/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               required data-validation-required-message="Vui lòng nhập Email của bạn"/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                        <input type="text" className="form-control" id="subject" placeholder="Chủ đề"
                               required data-validation-required-message="Vui lòng nhập chủ đề cần liên hệ"/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                            <textarea className="form-control" rows={6} id="message" placeholder="Nội dung"
                                      required
                                      data-validation-required-message="Vui lòng nhập nội dung liên hệ"></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <button className="btn btn-primary py-2 px-4 rounded" type="submit" id="sendMessageButton">Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormContact;