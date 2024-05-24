import { Route, Routes } from "react-router-dom";
import ContactUs from "../pages/ContactUs";

function ContactUsRouter() {
    return (
        <Routes>
            <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
    );
}

export default ContactUsRouter;