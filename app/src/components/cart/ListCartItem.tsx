// components/ListCartItem.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../../util/formatCurrency";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import convertStringPriceToNumber, {removeFromCart, updateCartItemQuantity } from "../../store/cart.slice";
import ButtonQuantity from "../common/ButtonQuantity";

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

    function calculateTotalPrice(priceString: string, quantity: number): number {
        let price: number = convertStringPriceToNumber(priceString);
        let totalPrice: number = price * quantity;
        return totalPrice;
    }

    const handleRemoveProduct = () => {
        dispatch(removeFromCart(idProductDelete));
        handleClose();
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch(updateCartItemQuantity({ id, newQuantity }));
    };

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
                        <tbody className="align-middle" key={cartItem.id}>
                        <tr>
                            <td className="align-middle">
                                <img src={cartItem.product.images[0]} alt=""
                                     style={{ width: '50px' }} /> {cartItem.product.name}
                            </td>
                            <td className={"align-middle"}>{cartItem.selectedOption}</td>
                            <td className="align-middle">{cartItem.price}</td>
                            <td className="align-middle">
                                {cartItem.selectedSize}
                            </td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{ width: '100%' }}>
                                    <ButtonQuantity
                                        quantity={cartItem.quantity}
                                        setQuantity={(quantity) => handleQuantityChange(cartItem.id, quantity)}
                                    />
                                </div>
                            </td>
                            <td className="align-middle">
                                {formatCurrency(calculateTotalPrice(cartItem.price!, cartItem.quantity))}
                            </td>
                            <td className="align-middle">
                                <button className="btn btn-sm" onClick={() => handleShow(cartItem.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#D19C97" }} />
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
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
