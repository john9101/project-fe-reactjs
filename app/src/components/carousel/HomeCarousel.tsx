/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { NavLink } from 'react-router-dom'
import imageCarousel1 from '../../assets/img/carousel-1.jpg'
import imageCarousel2 from '../../assets/img/carousel-2.jpg'
const HomeCarosel = () => {
    return (
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" style={{ height: "410px" }}>
                    <img className="img-fluid" src={imageCarousel1} alt="Image" />
                    <div
                        className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: "700px" }}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your
                                First Order</h4>
                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable
                                Dress</h3>
                            <NavLink to="" className="btn btn-light py-2 px-3">Shop Now</NavLink>
                        </div>
                    </div>
                </div>
                <div className="carousel-item" style={{ height: "410px" }}>
                    <img className="img-fluid" src={imageCarousel2} alt="Image" />
                    <div
                        className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: "700px" }}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your
                                First Order</h4>
                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable
                                Price</h3>
                            <NavLink to="" className="btn btn-light py-2 px-3">Shop Now</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink className="carousel-control-prev" to="#header-carousel" data-slide="prev">
                <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
                    <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
            </NavLink>
            <NavLink className="carousel-control-next" to="#header-carousel" data-slide="next">
                <div className="btn btn-dark" style={{ width: "45px", height: "45px" }}>
                    <span className="carousel-control-next-icon mb-n2"></span>
                </div>
            </NavLink>
        </div>
    )
}
export default HomeCarosel;