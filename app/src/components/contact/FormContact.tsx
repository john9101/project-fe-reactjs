import React, {useState} from 'react';
import {ContactType} from "../../types/contact.type";
import axios from "axios";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

function FormContact() {

    const initialState: ContactType = {
        username: "",
        email: "",
        topic: "",
        message: ""
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ContactType>({defaultValues: initialState});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (data: ContactType) => {
        try {
            const response = await axios.post('http://localhost:4000/api/contact', data);
            console.log('Đã lưu:', response.data);
            handleShow();
            reset(initialState);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <div className="col-lg-7 mb-5">
            <div className="contact-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                    <div className="control-group mb-3">
                        <input type="text" className="form-control" id="username" placeholder="Họ và tên"
                               {...register('username', {required: "*Vui lòng nhập họ và tên"})}/>
                        {errors.username && <p className="help-block text-danger"
                                               style={{fontSize: '12px'}}>{errors.username.message}</p>}

                    </div>
                    <div className="control-group mb-3">
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               {...register('email', {
                                   required: "*Vui lòng nhập Email của bạn",
                                   pattern: {
                                       value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: "*Email không hợp lệ"
                                   }
                               })}/>
                        {errors.email &&
                            <p className="help-block text-danger" style={{fontSize: '12px'}}>{errors.email.message}</p>}
                    </div>
                    <div className="control-group mb-3">
                        <input type="text" className="form-control" id="topic" placeholder="Chủ đề"
                               {...register('topic', {required: "*Vui lòng nhập chủ đề cần liên hệ"})}/>
                        {errors.topic &&
                            <p className="help-block text-danger" style={{fontSize: '12px'}}>{errors.topic.message}</p>}
                    </div>
                    <div className="control-group mb-3">
                            <textarea className="form-control" rows={6} id="message" placeholder="Nội dung"
                                      {...register('message', {required: "*Vui lòng nhập nội dung liên hệ"})}></textarea>
                        {errors.message && <p className="help-block text-danger"
                                              style={{fontSize: '12px'}}>{errors.message.message}</p>}
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
                    <Modal.Title>Gửi thành công</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>Chúng tôi cảm ơn bạn đã liên hệ.</Modal.Body>

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

