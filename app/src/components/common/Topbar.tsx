import {Link} from "react-router-dom";
import {faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faMagnifyingGlass, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const Topbar = () => {
    const totalItems = useSelector((state: RootState) => state.cart.totalItem);

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
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faLinkedinIn}/>
                        </Link>
                        <Link className="text-dark px-2" to="#">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </Link>
                        <Link className="text-dark pl-2" to="#">
                            <FontAwesomeIcon icon={faYoutube}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-3 px-xl-5 border-bottom">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link to={"/"} className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span
                            className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </Link>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form action="">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm"/>
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" color="#000"/>                            </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <Link to="#" className="btn border">
                        <FontAwesomeIcon icon={faHeart} className="text-primary" />                        <span className="badge">0</span>
                    </Link>
                    <Link to={"/cart"} className="btn border">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-primary" />
                        <span className="badge">{totalItems}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Topbar