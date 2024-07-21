import React from 'react'
import { NavLink } from 'react-router-dom'
import {PathNamesConstant} from "../../constants/pathNames.constant";
const Banner = () => {
    return (
        <div className="carousel slide bg-primary" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" style={{ height: "410px" }}>
                    <div
                        className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: "1000px" , letterSpacing: '-0.5px'}}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">Khai trương khuyến mãi từ 11% tại</h4>
                            <h3 className="display-4 text-dark font-weight-bold mb-4">Uniform Young's Style</h3>
                            <NavLink to={PathNamesConstant.shop} state={{resetCollection: true}} className="btn btn-light py-2 px-3">Mua sắm ngay</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner;