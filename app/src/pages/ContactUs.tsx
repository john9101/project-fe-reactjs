import React from 'react';
import {Link} from "react-router-dom";
import ContactInfor from "../components/contact/ContactInfor";
import FormContact from "../components/contact/FormContact";

function ContactUs() {
    return (
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Liên hệ với chúng tôi</span></h2>
            </div>
            <div className="row px-xl-5">
                <FormContact/>
                <ContactInfor/>
            </div>
        </div>
    );
}

export default ContactUs;