import './assets/css/styleCartDialog.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
function CartDialog() {
    return (
        <div className="container">
            <div className="cart-header">
                <div className="cart-title">Cart</div>
                <div className="cart-close">
                    <FontAwesomeIcon icon={faXmark} />
            </div>
            </div>
            <hr/>
            <div className="cart-item">
                <div className="product">
                    <img
                        src="https://bizweb.dktcdn.net/100/287/440/products/ao-so-mi-local-dep-gia-re-local-brand-davies-4.jpg?v=1642759167513"
                        alt="..."/>
                    <p>Đồng phục học sinh</p>
                </div>
                <span>250.000 VND</span>
            </div>
        </div>
    );
}

export default CartDialog;