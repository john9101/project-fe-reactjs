import React from 'react';
import {Link} from "react-router-dom";
import ContactInfor from "../components/contact/ContactInfor";
import FormContact from "../components/contact/FormContact";

function ContactUs() {
    return (
        <div className="container pt-5" style={{position: "relative"}}>
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Liên hệ với chúng tôi</span></h2>
            </div>
            <div className="row">
                <FormContact/>
                <ContactInfor/>
            </div>
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Đường đi chi tiết</span></h2>
            </div>
            <div className="contact-map mb-5" style={{display: "flex", justifyContent: "center", width: '100%'}}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823.7041824516342!2d106.79150913955962!3d10.870903061073426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1699813688055!5m2!1svi!2s"
                    width="1100px"
                    height="450"
                    style={{border: 0}}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactUs;


