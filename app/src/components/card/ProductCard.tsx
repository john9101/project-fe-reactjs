import {Product} from "../../types/product.type";
import {formatCurrency} from "../../util/formatCurrency";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping,faEye} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

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

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style={{height: `404px`}}>
                    <Slider {...settings}>
                        {
                            images.map((image, index) =>
                                <img key={index} className="img-fluid w-100" src={image} alt=""/>
                            )
                        }
                    </Slider>
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
                    <NavLink to={`/products/${product._id}`} className="btn btn-sm text-dark p-0"><FontAwesomeIcon icon={faEye} className='text-primary mr-1' />Xem chi tiết</NavLink>
                    <a href="" className="btn btn-sm text-dark p-0"><FontAwesomeIcon icon={faCartShopping} className='text-primary mr-1' /> Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard


