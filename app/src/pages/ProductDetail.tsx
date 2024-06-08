import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useState} from "react";
import {fetchProductDetail, setSelectedOptionName, setSelectedSize} from "../store/product.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,faMinus,faTag, faStar} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faXTwitter, faLinkedinIn, faPinterest} from "@fortawesome/free-brands-svg-icons"
import {Box, Tab, Tabs} from "@mui/material";

interface TabPanelProps{
    children?: React.ReactNode
    index: number
    value: number
}

const ProductDetailTabPanel = (props: TabPanelProps)=>{
    const {children, value, index, ...other} = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

const allyProps = (index: number)=>{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const ProductDetail = ()=> {
    const {productId} = useParams()
    const dispatch = useDispatch<AppDispatch>();
    const productDetail = useSelector((state: RootState) => state.products.productDetail!);
    const product = productDetail.product;
    const quantityInStock = productDetail.quantityInStock;
    const priceWithUnit = productDetail.priceWithUnit

    const [tabDisplay, setTabDisplay] = useState<number>(0);

    useEffect(() => {
        const promise = dispatch(fetchProductDetail(productId as string));
        return () => {
            promise.abort()
        }
    }, [dispatch,productId])

    const sizes = product?.options.flatMap(option => option.stocks).map(stock => stock.size);
    const uniqueSizes = Array.from(new Set(sizes));

    const handleSetSelectedOptionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedOptionName(e.target.value))
    }

    const handleSetSelectedSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectedSize(e.target.value))
    }

    const handleChangeTabDisplay = (event: React.SyntheticEvent, newTabDisplay: number) => {
        setTabDisplay(newTabDisplay);
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
                    <small className="pt-1"><strong>Đánh giá:</strong> {product?.rating}</small>
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
                            <button className="btn btn-primary btn-minus">
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                        </div>
                        <input type="text" className="form-control bg-secondary text-center" value="1"/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus">
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Thêm vào giỏ
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
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={tabDisplay}
                            onChange={handleChangeTabDisplay}
                            aria-label={'product detail tabs'}
                        >
                            <Tab label="Mô tả chi tiết" {...allyProps(0)}/>
                            <Tab label="Đánh giá & nhận xét" {...allyProps(1)}/>
                        </Tabs>
                    </Box>
                    <ProductDetailTabPanel index={0} value={tabDisplay}>
                        {product?.longDescription}
                    </ProductDetailTabPanel>
                    <ProductDetailTabPanel index={1} value={tabDisplay}>
                        <div className="tab-pane fade active show" id="tab-pane-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mb-4">1 review for "{product?.name}"</h4>
                                    <div className="media mb-4">
                                        <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: "45px"}}/>
                                        <div className="media-body">
                                            <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                            <div className="text-primary mb-2">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="mb-4">Để lại đánh giá và nhận xét của bạn</h4>
                                    <small>Địa chỉ email của bạn sẽ không được công khai. Các trường bắt buộc được đánh dấu *</small>
                                    <div className="d-flex my-3">
                                        <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
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
                                            <label htmlFor="message">Nhận xét của bạn *</label>
                                            <textarea id="message" cols={30} rows={5} className="form-control"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Họ và tên của bạn *</label>
                                            <input type="text" className="form-control" id="name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Địa chỉ email của bạn *</label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group mb-0">
                                            <input type="submit" value="Để lại đánh giá & nhận xét" className="btn btn-primary px-3"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </ProductDetailTabPanel>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;