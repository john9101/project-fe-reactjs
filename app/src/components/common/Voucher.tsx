import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";

function Voucher() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isSelected, setIsSelected] = useState(false);
    const handleRadioChange = () => setIsSelected(!isSelected);


    return (
        <div className="voucher">
            <div className="voucher-header">
                <div className="voucher-title">COOL10</div>
                <div className="voucher-subtitle">(Còn 2090)</div>
            </div>
            <div className="voucher-content">
                <div className="voucher-description">Giảm 100K cho đơn hàng từ 990K</div>
            </div>
            <div className="voucher-footer">
                <div className="voucher-expiry">HSD: 31/07/2024</div>
                <div className="voucher-condition">
                    <a href="#" onClick={handleShow}>Điều kiện</a>
                </div>
            </div>
            <div className="voucher-icon">
                <input
                    type="radio"
                    onChange={handleRadioChange}
                    style={{
                        accentColor: isSelected ? '#C07973' : 'initial',
                    }}
                />
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <Modal.Title style={{flex: 1, textAlign: 'center'}}>Điều kiện sử dụng voucher</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p style={{fontWeight: "bold"}}>Điều kiện chi tiết:</p>
                    <p>Giảm giá 20% cho đơn hàng trên 5.000.000 VND</p>
                    <p>Áp dụng cho tất cả khách hàng</p>
                    <p style={{fontWeight: "bold"}}>Thời gian áp dụng:</p>
                    <p> 01/07/2024 - 31/07/2024</p>
                    <p style={{fontWeight: "bold"}}>Lưu ý:</p>
                    <p>Mã giảm giá không có giá trị quy đổi ra tiền mặt</p>
                </Modal.Body>
                <Modal.Footer style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <Button variant="primary" onClick={handleClose} style={{color: "black"}}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Voucher;