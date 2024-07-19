import React, {useState} from 'react';
import {Contact} from "../../types/contact";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import http from "../../util/http";

function FormContact() {

    const initialState: Contact = {
        username: "",
        email: "",
        topic: "",
        message: ""
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm<Contact>({defaultValues: initialState});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onSubmit = async (data: Contact) => {
        try {
            const response = await http.post("contacts", data);
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
                        {errors.username && <p className="help-block text-danger mt-1"
                                               style={{fontSize: '12px'}}>{errors.username.message}</p>}

                    </div>
                    <div className="control-group mb-3">
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               {...register('email', {
                                   required: "*Vui lòng nhập Email của bạn",
                                   pattern: {
                                       value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                       message: "*Email không hợp lệ"
                                   }
                               })}/>
                        {errors.email &&
                            <p className="help-block text-danger mt-1" style={{fontSize: '12px'}}>{errors.email.message}</p>}
                    </div>
                    <div className="control-group mb-3">
                        <input type="text" className="form-control" id="topic" placeholder="Chủ đề (tối thiểu 10 và tối đa 15 kí tự)"
                               {...register('topic', {
                                   required: "*Vui lòng nhập chủ đề cần liên hệ",
                                   minLength: {
                                       value: 10,
                                       message: "*Nội dung tối thiểu 10 kí tự"
                                   },
                                   maxLength: {
                                       value: 50,
                                       message: "*Nội dung chỉ giới hạn tối đa 50 kí tự"
                                   }
                               })}/>
                        {errors.topic &&
                            <p className="help-block text-danger mt-1" style={{fontSize: '12px'}}>{errors.topic.message}</p>}
                    </div>
                    <div className="control-group mb-3">
                            <textarea className="form-control" rows={6} id="message" placeholder="Nội dung (tối thiểu 15 kí tự và tối đa 1000 kí tự)"
                                      {...register('message', {
                                          required: "*Vui lòng nhập nội dung liên hệ",
                                          minLength: {
                                              value: 15 ,
                                              message: "*Nội dung tối thiểu 15 kí tự"
                                          },
                                          maxLength: {
                                              value: 100,
                                              message: "*Nội dung chỉ giới hạn tối đa 1000 kí tự"
                                          }
                                      })}></textarea>

                        {errors.message && <p className="help-block text-danger mt-1"
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

