import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useState} from "react";
import {fetchProductDetail, setSelectedOptionName, setSelectedSize} from "../store/product.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus, faTag, faStar} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faXTwitter, faLinkedinIn, faPinterest} from "@fortawesome/free-brands-svg-icons"
import {addToCart} from "../store/cart.slice";
import {Product} from "../types/product.type";
import {toast} from "react-toastify";
import {CartItem} from "../types/cartItem.type";
import {nanoid} from "@reduxjs/toolkit";

const ProductDetail = () => {
    const {productId} = useParams()
    const dispatch = useDispatch<AppDispatch>();
    const productDetail = useSelector((state: RootState) => state.products.productDetail!);
    const product = productDetail.product;
    const quantityInStock = productDetail.quantityInStock;
    let priceWithUnit = productDetail.priceWithUnit
    const sizes = product?.options.flatMap(option => option.stocks).map(stock => stock.size);
    const uniqueSizes = Array.from(new Set(sizes));
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const promise = dispatch(fetchProductDetail(productId as string));
        return () => {
            promise.abort()
        }
    }, [dispatch, productId])

    const handleSetSelectedOptionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedOptionName(e.target.value))
    }

    const handleSetSelectedSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedSize(e.target.value))
    }

    const handleAddToCart = ( ) => {
        const selectedOptionName = productDetail.selectedOptionName;
        const selectedSize = productDetail.selectedSize;
        if (quantityInStock === 0) {
            toast.error("Sản phẩm đã hết hàng", {
                position: "bottom-left",
                autoClose: 2000
            });
            return;
        }
        if (selectedOptionName === null || selectedSize === null) {
            toast.error("Vui lòng chọn kích cỡ và mẫu đồng phục", {
                position: "bottom-left",
                autoClose: 1000
            });
            return;
        }
        console.log(product);
        (product && selectedOptionName && selectedSize  && dispatch(addToCart({
            id: nanoid(),
            product: product,
            quantity: quantity,
            price: priceWithUnit,
            selectedOption: selectedOptionName,
            selectedSize: selectedSize,
        })));
        toast.success("Đã thêm vào giỏ hàng", {
            position: "bottom-left",
            autoClose: 1000
        });
    }

    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    }
    return (
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                <div className="col-lg-5 pb-5">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">
                            {product?.images.map(image => (
                                <div className="carousel-item active">
                                    <img className="w-100 h-100" src={image} alt="Image"/>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                            <i className="fa fa-2x fa-angle-left text-dark"></i>
                        </a>
                        <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                            <i className="fa fa-2x fa-angle-right text-dark"></i>
                        </a>
                    </div>
                </div>

                <div className="col-lg-7 pb-5">
                    <h3 className="font-weight-semi-bold">{product?.name}</h3>
                    <div className="d-flex mb-2">
                        <div className="text-primary mr-2">
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <small className="pt-1"><strong>Đánh giá:</strong> {product?.rating}
                        </small>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="text-primary mr-2">
                            <FontAwesomeIcon icon={faTag}/>
                        </div>
                        <small className="pt-1"><strong>Phân loại:</strong> {product?.category.name}</small>
                    </div>
                    <h3 className="font-weight-medium mb-4">{priceWithUnit}</h3>
                    <p className="mb-4">{product?.shortDescription}</p>
                    <div className="d-flex mb-3">
                        <p className="text-dark font-weight-medium mb-0 mr-3">Kích cỡ:</p>
                        <form>
                            {
                                uniqueSizes.map(size => (
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" value={size} id={size}
                                               name="size" onChange={handleSetSelectedSize}/>
                                        <label className="custom-control-label" htmlFor={size}>{size}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                    <div className="d-flex mb-4">
                        <p className="text-dark font-weight-medium mb-0 mr-3">Mẫu đồng phục:</p>
                        <form>
                            {
                                product?.options.map(option => (
                                    <div key={option._id} className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" value={option.option_name}
                                               id={option._id} name="option" onChange={handleSetSelectedOptionName}/>
                                        <label className="custom-control-label"
                                               htmlFor={option._id}>{option.option_name}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                    <p className="mb-4">Số lượng mẫu trong kho: {quantityInStock}</p>
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{width: "130px"}}>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={handleMinusClick}>
                                    <FontAwesomeIcon icon={faMinus}/>
                                </button>
                            </div>
                            <input type="number" className="form-control bg-secondary text-center" value={quantity}
                                   onBlur={event => {
                                       console.log("event value " + Number.parseInt(event.target.value))
                                       if (event.target.value === "" || Number.parseInt(event.target.value) <= 0) {
                                           console.log("Quantity must be greater than 0")
                                           setQuantity(1)
                                       }

                                   }}
                                   onChange={event => {
                                       setQuantity(Number.parseInt(event.target.value))
                                   }}/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={handlePlusClick}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-primary px-3" onClick={handleAddToCart}><i
                            className="fa fa-shopping-cart mr-1"></i> Thêm vào giỏ
                            hàng
                        </button>
                    </div>
                    <div className="d-flex pt-2">
                        <p className="text-dark font-weight-medium mb-0 mr-2">Chia sẻ:</p>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2" href="">
                                <FontAwesomeIcon icon={faFacebookF}/>
                            </a>
                            <a className="text-dark px-2" href="">
                                <FontAwesomeIcon icon={faXTwitter}/>
                            </a>
                            <a className="text-dark px-2" href="">
                                <FontAwesomeIcon icon={faLinkedinIn}/>
                            </a>
                            <a className="text-dark px-2" href="">
                                <FontAwesomeIcon icon={faPinterest}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-xl-5">
                <div className="col">
                    <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                        <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Mô tả chi tiết</a>
                        <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Nhận xét & đánh giá
                            (0)</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Mô tả chi tiết về sản phẩm</h4>
                            <p>{product?.longDescription}</p>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                                    <div className="media mb-4">
                                        <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1"
                                             style={{width: "45px"}}/>
                                        <div className="media-body">
                                            <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                            <div className="text-primary mb-2">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam
                                                ipsum
                                                et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="mb-4">Leave a review</h4>
                                    <small>Your email address will not be published. Required fields are marked
                                        *</small>
                                    <div className="d-flex my-3">
                                        <p className="mb-0 mr-2">Your Rating * :</p>
                                        <div className="text-primary">
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="message">Your Review *</label>
                                            <textarea id="message" cols={30} rows={5}
                                                      className="form-control"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name *</label>
                                            <input type="text" className="form-control" id="name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Email *</label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group mb-0">
                                            <input type="submit" value="Leave Your Review"
                                                   className="btn btn-primary px-3"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;