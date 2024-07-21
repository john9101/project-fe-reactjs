import {Link,NavLink, useLocation, useNavigate} from "react-router-dom";
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass, faShoppingCart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import React, {FormEvent, useState} from "react";
import CartItemsMini from "../cart/CartItemsMini";

const Topbar = () => {
    const totalItems = useSelector((state: RootState) => state.cart.totalItem);
    const {search} = useLocation()
    const params = new URLSearchParams(search);
    const [keyword, setKeyword] = useState<string | null>(params.get('keyword'));
    const navigate = useNavigate();

    const handleSearchWithKeyword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(keyword){
            params.set("keyword", keyword);
            navigate(`/search?${decodeURIComponent(params.toString())}`)
        }
    }


    const [showCartPreview, setShowCartPreview] = useState(false);

    const handleMouseEnter = () => {
        setShowCartPreview(true);
    };

    const handleMouseLeave = () => {
        setShowCartPreview(false);
    };

    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-2 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-dark" to="#">FAQs</Link>
                        <span className="text-muted px-2">|</span>
                        <Link className="text-dark" to="/contact-us">Hỏi đáp</Link>
                        <span className="text-muted px-2">|</span>
                        <Link className="text-dark" to="#">Hỗ trợ</Link>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link className="text-dark pl-2" to="#">
                            <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-3 px-xl-5 border-bottom">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link to={"/"} className="text-decoration-none">
                        <Logo />
                    </Link>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form onSubmit={handleSearchWithKeyword}>
                        <div className="input-group">
                            <input type="text" className="form-control" value={keyword!} onChange={event => setKeyword(event.target.value)} placeholder="Nhập tên đồng phục cần tìm" />
                            <button type='submit' className="input-group-append p-0 border-secondary bg-transparent" style={{outline: 'none'}}>
                                <span className="input-group-text bg-transparent h-100">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-primary' size="1x" color="#000" />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <Link to="#" className="btn border">
                        <FontAwesomeIcon icon={faHeart} className="text-primary" />
                        <span className="badge">0</span>
                    </Link>
                    <div className="cart-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <NavLink to="/cart" className="btn border">
                            <FontAwesomeIcon icon={faShoppingCart} className="text-primary"/>
                            <span className="badge">{totalItems}</span>
                        </NavLink>
                        <div className="hover-fill-space"></div>
                        {showCartPreview && (
                            <div className="cart-preview">
                                <CartItemsMini/>
                                <NavLink to={"/cart"}>
                                    <div className="cart-buttons">
                                        <FontAwesomeIcon style={{marginRight: ".3em"}} icon={faCartShopping}/>
                                        Xem giỏ hàng
                                    </div>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar