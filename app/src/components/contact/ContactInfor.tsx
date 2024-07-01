import React from 'react';
import {faEnvelope, faGlobe, faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";
import {colors} from "@mui/material";
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 5px;
    color: #C07973;
`;
function ContactInfor() {
    return (
        <div className="col-lg-5 mb-5">
            <h5 className="font-weight-semi-bold mb-3">Liên hệ</h5>
            <p>Nếu bạn có bất kỳ câu hỏi nào, xin đừng ngần ngại liên hệ với chúng tôi qua thông tin dưới đây.
                Chúng tôi sẽ cố gắng phản hồi trong thời gian sớm nhất.</p>
            <div className="d-flex flex-column mb-3">
                <h5 className="font-weight-semi-bold mb-3">Cửa hàng</h5>
                <p><StyledFontAwesomeIcon icon={faLocationDot}/>Khu phố 6, phường
                    Linh Trung, thành phố Thủ Đức</p>
                <p><StyledFontAwesomeIcon icon={faEnvelope}/>uniform@gmail.com</p>
                <p><StyledFontAwesomeIcon icon={faPhone}/>0901323070</p>
                <p><StyledFontAwesomeIcon icon={faGlobe}/><NavLink to={"/"}>Localhost:3000</NavLink></p>
            </div>
        </div>
    );
}

export default ContactInfor;