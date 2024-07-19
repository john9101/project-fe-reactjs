import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Voucher} from "../../types/voucher.type";
import http from "../../util/http";
import "./assets/css/voucherInput.css"

interface VoucherCardProps {
    onSelectVoucher: (code: string, discountPercent: number) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ onSelectVoucher }) => {
    const [show, setShow] = useState(false);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

    const handleClose = () => setShow(false);
    const handleShow = (voucher: Voucher) => {
        setSelectedVoucher(voucher);
        setShow(true);
    };

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await http.get('/vouchers');
                setVouchers(response.data);
            } catch (error) {
                console.error('Error fetching vouchers:', error);
            }
        };
        fetchVouchers();
    }, []);

    const handleSelectVoucher = (voucher: Voucher) => {
        onSelectVoucher(voucher.code, voucher.discountPercent);
    };

    return (
        <div className="voucher-container">
            {vouchers.map(voucher => (
                <div key={voucher._id} className="voucher">
                    <div className="voucher-header">
                        <div className="voucher-title">{voucher.code}</div>
                        <div className="voucher-subtitle">(Còn {voucher.usageLimit - voucher.usageCount})</div>
                    </div>
                    <div className="voucher-content">
                        <div className="voucher-description">{voucher.description}</div>
                    </div>
                    <div className="voucher-footer">
                        <div className="voucher-expiry">HSD: {new Date(voucher.endDate).toLocaleDateString()}</div>
                        <div className="voucher-condition">
                            <a href="#" onClick={() => handleShow(voucher)} style={{color: "white"}}>Điều kiện</a>
                        </div>
                    </div>
                    <div className="voucher-icon custom-radio">
                        <input
                            type="radio"
                            name="voucher"
                            className="btn-check input-radio-voucher"
                            autoComplete="off"
                            onChange={() => handleSelectVoucher(voucher)}
                        />
                    </div>
                </div>
            ))}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={{display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Modal.Title style={{ flex: 1, textAlign: 'center' }}>Điều kiện sử dụng voucher</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {selectedVoucher && (
                        <>
                            <p style={{fontWeight: "bold"}}>Điều kiện chi tiết:</p>
                            <p>{selectedVoucher.description}</p>
                            <p>Áp dụng cho tất cả khách hàng</p>
                            <p style={{fontWeight: "bold"}}>Thời gian áp dụng:</p>
                            <p>{new Date(selectedVoucher.startDate).toLocaleDateString()} - {new Date(selectedVoucher.endDate).toLocaleDateString()}</p>
                            <p style={{fontWeight: "bold"}}>Lưu ý:</p>
                            <p>Mã giảm giá không có giá trị quy đổi ra tiền mặt</p>
                            <p>Không áp dụng cho đơn hàng đã giảm giá</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Button variant="primary" onClick={handleClose} style={{ color: "black" }}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VoucherCard;
