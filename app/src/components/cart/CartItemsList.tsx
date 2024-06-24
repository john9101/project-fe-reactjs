// components/CartItemsList.tsx
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {formatCurrency} from "../../util/formatCurrency";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import Button from "react-bootstrap/Button";
import {removeFromCart, updateCartItemQuantity} from "../../store/cart.slice";
import ButtonQuantity from "../common/ButtonQuantity";
import {Modal} from 'react-bootstrap';

export default function CartItemsList() {
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

    function calculateSubtotal(price: number, quantity: number): number {
        return price * quantity;
    }

    const handleRemoveProduct = () => {
        dispatch(removeFromCart(idProductDelete));
        handleClose();
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch(updateCartItemQuantity({id, newQuantity}));
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
                                <img src={""} alt=""
                                     style={{width: '50px'}}/> {cartItem.product.name}
                            </td>
                            <td className={"align-middle"}>{cartItem.selectedOption}</td>
                            <td className="align-middle">{formatCurrency(cartItem.product.originalPrice * (1-cartItem.product.discountPercent))}</td>
                            <td className="align-middle">
                                {cartItem.selectedSize}
                            </td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: '100%'}}>
                                    <ButtonQuantity
                                        quantity={cartItem.quantity}
                                        setQuantity={(quantity) => handleQuantityChange(cartItem.id, quantity)}
                                    />
                                </div>
                            </td>
                            <td className="align-middle">
                                {formatCurrency(calculateSubtotal((cartItem.product.originalPrice * (1-cartItem.product.discountPercent)), cartItem.quantity))}
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
                <Modal.Header>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={handleClose}>
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