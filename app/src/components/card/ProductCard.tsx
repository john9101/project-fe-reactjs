import {Product} from "../../types/product.type";
import {formatCurrency} from "../../util/formatCurrency";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping,faEye as faEyeSolid} from "@fortawesome/free-solid-svg-icons";
import {faEye as faEyeRegular} from '@fortawesome/free-regular-svg-icons'
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PercentIcon from '@mui/icons-material/Percent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import ProductDetail from "../../pages/ProductDetail";
import '../../assets/css/styleShop.scss'
import {subDays} from 'date-fns'
import {PathNamesConstant} from "../../constants/pathNames.constant";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {addToWishlist, removeFromWishlist} from "../../store/wishlist.slice";

interface ProductCardProps {
    product: Product
    colGridClass: 'col-lg-4 col-md-6 col-sm-12 pb-1' | null
}

const ProductCard = ({product, colGridClass}: ProductCardProps) => {
    const dispatch = useDispatch();
    const isFavourite = useSelector((state: RootState) => state.wishlist.products.some(favouriteProduct => favouriteProduct?._id === product?._id));
    const handleAddToFavourite = () => {
        if (isFavourite) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist(product));
        }
    };
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

    const hasSaleOffTag = product.discountPercent >= 0;
    const hasNewArriveTag = new Date(product.createdAt) >= subDays(new Date(), 30);
    const hasPopularTag = product.views >= 300

    return (
        <>
            <div className={colGridClass!}>
                <div className="card product-item border-0 mb-4">
                    <div
                        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
                        style={{height: '100%', aspectRatio: 1}}
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
                                    style={{fontSize: '1.2rem'}}
                                    className='position-absolute rounded-circle p-3 bg-light quick-see-product'
                                    onClick={handleShowQuickSeeModal}
                                />
                            </Tooltip>
                        }
                        <Chip
                            className='position-absolute mt-3 mr-3 font-weight-semi-bold'
                            icon={<StarIcon
                                className='pl-1'
                                style={{
                                    fontSize: '1.5rem',
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
                                fontFamily: 'var(--primary)',
                                "& .MuiChip-label": {
                                    paddingLeft: '0.5rem'
                                }
                            }}
                        />
                        <Tooltip title={isFavourite ? "Bỏ yêu thích" : "Thêm vào yêu thích"} placement="top"
                                 className={"bg-light"}>
                            {isFavourite ? (
                                <FavoriteIcon
                                    style={{cursor: 'pointer', color: '#C07973', fontSize: '2rem'}}
                                    onClick={handleAddToFavourite}
                                    className='position-absolute rounded-circle p-1' sx={{
                                    bottom: 10,
                                    right: 10,
                                }}
                                />
                            ) : (
                                <FavoriteBorderIcon
                                    style={{cursor: 'pointer', fontSize: '2rem'}}
                                    onClick={handleAddToFavourite}
                                    className='position-absolute rounded-circle p-1' sx={{
                                    bottom: 10,
                                    right: 10,
                                }}
                                />
                            )}
                        </Tooltip>
                        <div
                            className="d-flex flex-column align-items-start position-absolute mt-3 ml-3 font-weight-semi-bold"
                            style={{gap: '0.4rem', top: 0, left: 0}}
                        >
                            {
                                hasSaleOffTag &&
                                <Chip
                                    icon={<PercentIcon
                                        className='pl-1'
                                        style={{
                                            fontSize: '1.5rem',
                                            color: 'var(--orange)',
                                        }}
                                    />}
                                    label='Giảm giá'
                                    variant="outlined"
                                    sx={{
                                        background: 'white',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--primary)',
                                        "& .MuiChip-label": {
                                            paddingLeft: '0.5rem'
                                        }
                                    }}
                                />
                            }
                            {
                                hasPopularTag &&
                                <Chip
                                    icon={<WhatshotIcon
                                        className='pl-1'
                                        style={{
                                            fontSize: '1.5rem',
                                            color: 'var(--red)',
                                        }}
                                    />}
                                    label='Phổ biến'
                                    variant="outlined"
                                    sx={{
                                        background: 'white',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--primary)',
                                        "& .MuiChip-label": {
                                            paddingLeft: '0.5rem'
                                        }
                                    }}
                                />
                            }
                            {
                                hasNewArriveTag &&
                                <Chip
                                    icon={<FiberNewIcon
                                        className='pl-1'
                                        style={{
                                            fontSize: '1.5rem',
                                            color: 'var(--green)',
                                        }}
                                    />}
                                    label='Mẫu mới'
                                    variant="outlined"
                                    sx={{
                                        background: 'white',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--primary)',
                                        "& .MuiChip-label": {
                                            paddingLeft: '0.5rem'
                                        }
                                    }}
                                />
                            }
                        </div>
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
                        <NavLink to={`${PathNamesConstant.uniform}/${product._id}`}
                                 className="btn btn-sm text-dark p-0"><FontAwesomeIcon
                            icon={faEyeSolid} className='text-primary mr-1'/>Xem chi tiết</NavLink>
                        <span className="btn btn-sm text-dark p-0" onClick={handleShowQuickSeeModal}>
                            <FontAwesomeIcon icon={faCartShopping} className='text-primary mr-1'/> Thêm vào giỏ hàng
                        </span>
                    </div>
                </div>
            </div>
            <Modal
                centered
                show={showQuickSeeModal}
                onHide={handleCloseQuickSeeModal}
                size='xl'
            >
                <Modal.Header>
                    <button type="button" className="close align-self-center" style={{outline: 'none'}}
                            onClick={handleCloseQuickSeeModal}>
                        <span style={{fontSize: '2.4rem'}}>&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <ProductDetail productId={product._id}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductCard


