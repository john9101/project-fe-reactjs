import React, {useState} from 'react';
import {ContactType} from "../../types/contact.type";
import axios from "axios";

function FormContact() {
    const [contact, setContact] = useState<ContactType>({
        username: "",
        email: "",
        topic: "",
        message: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setContact({
            ...contact,
            [id]: value
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:4000/api/contact', contact);
            console.log('Đã lưu:', response.data);
            setContact({
                username: "",
                email: "",
                topic: "",
                message: ""
            });

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
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                        <input type="email" className="form-control" id="email" placeholder="Email"
                               required data-validation-required-message="Vui lòng nhập Email của bạn" value={contact.email}
                               onChange={handleChange}/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                        <input type="text" className="form-control" id="topic" placeholder="Chủ đề"
                               required data-validation-required-message="Vui lòng nhập chủ đề cần liên hệ"
                               value={contact.topic}
                               onChange={handleChange}/>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group">
                            <textarea className="form-control" rows={6} id="message" placeholder="Nội dung"
                                      required
                                      data-validation-required-message="Vui lòng nhập nội dung liên hệ"
                                      value={contact.message}
                                      onChange={handleChange}></textarea>
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