import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {formatCurrency} from "../../util/formatCurrency";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {removeFromCart} from "../../store/cart.slice";

export default function ListCartItem() {
    const cart = useSelector((state: RootState) => state.cart);
    const [idProductDelete, setIdProductDelete] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setIdProductDelete('')
        setShow(false)
    };
    const handleShow = (id: string) => {
        setIdProductDelete(id)
        setShow(true)
    };

    function convertStringPriceToNumber(stringPrice: string): number {
        let temp: string = stringPrice.replace(/[^0-9]/g, '');
        let numberPrice: number = parseFloat(temp);
        return numberPrice;
    }

    const handleRemoveProduct = () => {
        dispatch(removeFromCart(idProductDelete));
        handleClose()
    }

    function calculateTotalPrice(priceString: string, quantity: number): number {
        let price: number = convertStringPriceToNumber(priceString);
        let totalPrice: number = price * quantity;
        return totalPrice;
    }

    return (
        <>
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Xóa</th>
                    </tr>
                    </thead>
                    {cart.cartItems?.map((cartItem) => (
                        <tbody className="align-middle">
                        <tr>
                            <td className="align-middle">
                                <img src={cartItem.product.images[0]} alt=""
                                     style={{width: '50px'}}/> {cartItem.product.name}
                            </td>
                            <td className={"align-middle"}>{cartItem.selectedOption}</td>
                            <td className="align-middle">{cartItem.price}</td>
                            <td className="align-middle">
                                {cartItem.selectedSize}
                            </td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-sm btn-primary btn-minus">
                                            <FontAwesomeIcon icon={faMinus}/>
                                        </button>
                                    </div>
                                    <input type="text"
                                           className="form-control form-control-sm bg-secondary text-center"
                                           value={cartItem.quantity}
                                           readOnly/>
                                    <div className="input-group-btn">
                                        <button className="btn btn-sm btn-primary btn-plus">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">
                                {formatCurrency(calculateTotalPrice(cartItem.price!, cartItem.quantity))}
                            </td>
                            <td className="align-middle">
                                <button className="btn btn-sm" onClick={() => handleShow(cartItem.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{color: "#D19C97"}}/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa sản phẩm này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleRemoveProduct}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}