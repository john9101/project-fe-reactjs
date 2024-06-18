import PriceFilter from "../components/filter/PriceFilter";
import GenderFilter from "../components/filter/GenderFilter";
import RatingFilter from "../components/filter/RatingFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-12">
                    <PriceFilter/>
                    <GenderFilter/>
                    <RatingFilter/>
                </div>
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Tìm kiếm đồng phục"/>
                                        <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="dropdown ml-4">
                                    <button className="btn border dropdown-toggle" type="button" id="triggerId"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        Sắp xếp theo
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                        <a className="dropdown-item" href="#">Mới nhất</a>
                                        <a className="dropdown-item" href="#">Phổ biến</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-1.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-2.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-3.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-4.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-5.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-6.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-7.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-8.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                            <div className="card product-item border-0 mb-4">
                                <div
                                    className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src="img/product-1.jpg" alt=""/>
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">Colorful Stylish Shirt</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>$123.00</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>$123.00</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                    <a href="" className="btn btn-sm text-dark p-0"><i
                                        className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 pb-1">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center mb-3">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;