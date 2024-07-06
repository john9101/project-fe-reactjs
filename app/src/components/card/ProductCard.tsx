import {Product} from "../../types/product.type";
import {formatCurrency} from "../../util/formatCurrency";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping,faEye as faEyeSolid} from "@fortawesome/free-solid-svg-icons";
import {faEye as faEyeRegular} from '@fortawesome/free-regular-svg-icons'
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import ProductDetail from "../../pages/ProductDetail";

interface ProductCardProps {
    product: Product
    minHeight: number
}

const ProductCard = ({product, minHeight}: ProductCardProps) => {

    const images = product?.options!.map(option => option.image)

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        speed: 500,
        autoplaySpeed: 5000,
        autoplay: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        fade: true,
        arrows: false,
    }

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [showQuickSeeModal, setShowQuickSeeModal] = useState<boolean>(false);
    const handleShowQuickSeeModal = () => setShowQuickSeeModal(true)
    const handleCloseQuickSeeModal = () => setShowQuickSeeModal(false)


    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                    <div
                        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
                        style={{height: `404px`}}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Slider {...settings}>
                            {
                                images.map((image, index) =>
                                    <img key={index} className="img-fluid w-100" src={image} alt=""/>
                                )
                            }
                        </Slider>
                        {
                            isHovered &&
                            <Tooltip title="Xem nhanh" placement="top">
                                <FontAwesomeIcon
                                    icon={faEyeRegular}
                                    className='position-absolute rounded-circle p-3 bg-light'
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleShowQuickSeeModal}
                                />
                            </Tooltip>
                        }
                        <Chip
                            className='position-absolute mt-3 mr-3 font-weight-semi-bold'
                            icon={<StarIcon
                                style={{
                                    fontSize: '1.2rem',
                                    color: 'var(--yellow)'
                                }}
                            />}
                            label={product.rating}
                            variant="outlined"
                            sx={{
                                top: 0,
                                right: 0,
                                background: 'white',
                                fontSize: '1rem',
                                fontFamily: 'var(--primary)'
                            }}
                        />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3 pl-2 pr-2">
                        <h6 className="text-truncate mb-3">{product.name}</h6>
                        <div className="d-flex justify-content-center">
                            <h6>{formatCurrency((1 - product.discountPercent) * product.originalPrice)}</h6>
                            {product.discountPercent !== 0 &&
                                <h6 className="text-muted ml-2">
                                    <del>{formatCurrency(product.originalPrice)}</del>
                                </h6>
                            }
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                        <NavLink to={`/products/${product._id}`} className="btn btn-sm text-dark p-0"><FontAwesomeIcon
                            icon={faEyeSolid} className='text-primary mr-1'/>Xem chi tiết</NavLink>
                        <a href="" className="btn btn-sm text-dark p-0"><FontAwesomeIcon icon={faCartShopping}
                                                                                         className='text-primary mr-1'/> Thêm
                            vào giỏ hàng</a>
                    </div>
                </div>
            </div>
            <Modal show={showQuickSeeModal} onHide={handleCloseQuickSeeModal}>
                {/*<Modal.Header>*/}
                {/*    <Modal.Title>Yêu cầu thiết kế & kích cỡ khác</Modal.Title>*/}
                {/*    <button type="button" className="close align-self-center" style={{outline: 'none'}}*/}
                {/*            onClick={handleCloseQuickSeeModal}>*/}
                {/*        <span style={{fontSize: '2rem'}}>&times;</span>*/}
                {/*    </button>*/}
                {/*</Modal.Header>*/}
                <Modal.Body>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductCard


