import React, {useState} from 'react';
import {ContactType} from "../../types/contact.type";
import axios from "axios";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";

function FormContact() {
    const [contact, setContact] = useState<ContactType>({
        username: "",
        email: "",
        topic: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        topic: "",
        message: ""
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateFields = () => {
        const errors = {
            username: contact.username ? "" : "* Vui lòng nhập họ và tên",
            email: contact.email ? "" : "* Vui lòng nhập Email của bạn",
            topic: contact.topic ? "" : "* Vui lòng nhập chủ đề cần liên hệ",
            message: contact.message ? "" : "* Vui lòng nhập nội dung liên hệ"
        };
        setErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setContact({
            ...contact,
            [id]: value
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/contact', contact);
            console.log('Đã lưu:', response.data);
            setContact({
                username: "",
                email: "",
                topic: "",
                message: ""
            });
            handleShow();

        } catch (error) {
            console.error('Lỗi khi lưu contact', error);
        }
    };
    return (
        <div className="col-lg-7 mb-5">
            <div className="contact-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" noValidate={true} onSubmit={handleSubmit}>
                    <div className="control-group">
                        <input type="text" className="form-control" id="username" placeholder="Họ và tên"
                               required data-validation-required-message="Vui lòng nhập họ và tên"
                               value={contact.username}
                               onChange={handleChange}/>
                        <p className="help-block text-danger">{errors.username}</p>
                    </div>
                    <div className="control-group">
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               required data-validation-required-message="Vui lòng nhập Email của bạn"
                               value={contact.email}
                               onChange={handleChange}/>
                        <p className="help-block text-danger">{errors.email}</p>
                    </div>
                    <div className="control-group">
                        <input type="text" className="form-control" id="topic" placeholder="Chủ đề"
                               required data-validation-required-message="Vui lòng nhập chủ đề cần liên hệ"
                               value={contact.topic}
                               onChange={handleChange}/>
                        <p className="help-block text-danger">{errors.topic}</p>
                    </div>
                    <div className="control-group">
                            <textarea className="form-control" rows={6} id="message" placeholder="Nội dung"
                                      required
                                      data-validation-required-message="Vui lòng nhập nội dung liên hệ"
                                      value={contact.message}
                                      onChange={handleChange}></textarea>
                        <p className="help-block text-danger">{errors.message}</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <button className="btn btn-primary py-2 px-4 rounded" type="submit" id="sendMessageButton">Gửi
                        </button>
                    </div>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thành công</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>Chúng tôi cảm ơn bạn đã liên hệ, chúng tôi sẽ phản hồi sớm nhất.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <NavLink to={"/"} style={{color: "black"}}> Trang chủ</NavLink>
                    </Button>
                    <Button variant="secondary" onClick={handleClose} style={{color: "black"}}>
                        Tiếp tục
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FormContact;

