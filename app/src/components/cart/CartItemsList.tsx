import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {formatCurrency} from "../../util/formatCurrency";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import Button from "react-bootstrap/Button";
import {removeFromCart, updateCartItemQuantity, removeAllFromCart} from "../../store/cart.slice";
import ButtonQuantity from "../common/ButtonQuantity";
import {Modal} from 'react-bootstrap';

export default function CartItemsList() {
    const cart = useSelector((state: RootState) => state.cart);
    const [idProductDelete, setIdProductDelete] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const [show, setShow] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false); // state for delete all modal

    const handleClose = () => {
        setIdProductDelete('')
        setShow(false)
    };

    const handleCloseDeleteAll = () => {
        setShowDeleteAll(false)
    };

    const handleShow = (id: string) => {
        setIdProductDelete(id)
        setShow(true)
    };

    const handleShowDeleteAll = () => {
        setShowDeleteAll(true)
    };

    function calculateSubtotal(price: number, quantity: number): number {
        return price * quantity;
    }

    const handleRemoveProduct = () => {
        dispatch(removeFromCart(idProductDelete));
        handleClose();
    };

    const handleRemoveAllProducts = () => {
        dispatch(removeAllFromCart());
        handleCloseDeleteAll();
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch(updateCartItemQuantity({id, newQuantity}));
    };

    return (
        <>
            <div className="col-lg-8 table-responsive mb-5 table-cart"
                 style={{maxHeight: "500px", overflowY: "auto", msOverflowStyle: "none"}}>
                <table className="table table-bordered text-center mb-0 fixed-header">
                    <thead className="bg-secondary text-dark">
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th onClick={handleShowDeleteAll} style={{cursor: 'pointer'}}>Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.cartItems?.map((cartItem) => {
                        const selectedOption = cartItem.product.options.find(option => option.optionName === cartItem.selectedOption);
                        const image = selectedOption ? selectedOption.image : '';

                        return (
                            <tr key={cartItem.id}>
                                <td className="align-middle"
                                    style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                                    <img src={image} alt={cartItem.product.name} style={{width: '65px'}}/>
                                    {/*{cartItem.product.name}*/}
                                </td>
                                <td className="align-middle">{cartItem.selectedOption}</td>
                                <td className="align-middle">{formatCurrency(cartItem.product.originalPrice * (1 - cartItem.product.discountPercent))}</td>
                                <td className="align-middle">{cartItem.selectedSize}</td>
                                <td className="align-middle">
                                    <div className="input-group quantity mx-auto" style={{width: '100%'}}>
                                        <ButtonQuantity
                                            quantity={cartItem.quantity}
                                            setQuantity={(quantity) => handleQuantityChange(cartItem.id, quantity)}
                                        />
                                    </div>
                                </td>
                                <td className="align-middle">
                                    {formatCurrency(calculateSubtotal((cartItem.product.originalPrice * (1 - cartItem.product.discountPercent)), cartItem.quantity))}
                                </td>
                                <td className="align-middle">
                                    <button className="btn btn-sm" onClick={() => handleShow(cartItem.id)}>
                                        <FontAwesomeIcon icon={faTrash} style={{color: "#D19C97"}}/>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
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

            <Modal show={showDeleteAll} onHide={handleCloseDeleteAll}>
                <Modal.Header>
                    <Modal.Title>Xóa tất cả sản phẩm</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={handleCloseDeleteAll}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteAll}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleRemoveAllProducts}>
                        Xóa tất cả
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
