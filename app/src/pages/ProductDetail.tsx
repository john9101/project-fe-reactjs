import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useRef, useState} from "react";
import {fetchProductDetail, setSelectedOptionName, setSelectedSize} from "../store/product.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus,faMinus, faCircleChevronLeft, faCircleChevronRight, faCircleUser, faCartShopping, faHeart, faClipboard} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faXTwitter, faLinkedinIn, faPinterest} from "@fortawesome/free-brands-svg-icons"
import {Box, Rating, Tab, Tabs} from "@mui/material";
import StyleIcon from '@mui/icons-material/Style';
import StarIcon from '@mui/icons-material/Star';
import Slider, { Settings } from "react-slick";
import {formatCurrency} from "../util/formatCurrency";
import GridRadioButtons from "../components/common/GridRadioButtons";
import {Badge} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    rating: Yup.number()
        .required()
        .min(1, 'Bạn phải đánh giá ít nhất là 1 sao'),
    comment: Yup.string()
        .required('Nhận xét của bạn không được để trống')
        .min(10, 'Nội dung nhận xét của bạn phải tối thiểu 10 ký tự')
        .max(1000, 'Nội dung nhận xét của bạn chỉ tối đa 1000 ký tự')
});

interface ReviewFormData{
    rating: number
    comment: string
    fullName?: string
    avatar?: string
    sentDate?: string
}

interface TabPanelProps{
    children?: React.ReactNode
    index: number
    value: number
}

interface ZoomStyle {
    transform: string;
    transformOrigin?: string;
    transition: string;
}

const ProductDetailTabPanel = (props: TabPanelProps) =>{
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

const ProductDetail = ()=> {
    const {productId} = useParams()
    const dispatch = useDispatch<AppDispatch>();
    const productDetail = useSelector((state: RootState) => state.products.productDetail!);
    const product = productDetail.product;
    const quantityInStock = productDetail.quantityInStock;
    const options = product?.options;
    const images = options?.map(option => option.image)
    const optionNames = options?.map(option => option.optionName)
    const sizes = options?.flatMap(option => option.stocks).map(stock => stock.size);
    const uniqueSizes = Array.from(new Set(sizes));

    const sliderRef = useRef<Slider>(null);
    const [zoomStyle, setZoomStyle] = useState<ZoomStyle>({
        transform: 'scale(1)',
        transition: 'transform 0.5s ease'
    });

    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [tabDisplayIndex, setTabDisplayIndex] = useState<number>(0);
    const [,setSlideIndex] = useState<number>(0);
    // const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    //     rating: 0,
    //     message: ''
    // })

    useEffect(() => {
        const productDetailPromise = dispatch(fetchProductDetail(productId as string));
        return () => {
            productDetailPromise.abort()
        }
    }, [dispatch, productId]);


    // const handleSetSelectedOptionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const optionIndex = options?.findIndex(option => option.optionName === e.target.value);
    //     if(optionIndex !== undefined && optionIndex >= 0){
    //         setSlideIndex(optionIndex!)
    //         if(sliderRef.current) {
    //             sliderRef.current.slickGoTo(optionIndex!)
    //             setAutoplay(false)
    //         }
    //     }
    //     dispatch(setSelectedOptionName(e.target.value))
    // }

    const handleSetSelectedOptionName = (optionName: string | null) => {
        if (!optionName) {
            if(sliderRef.current){
                sliderRef.current.slickPlay()
            }
        } else {
            const optionIndex = options?.findIndex(option => option.optionName === optionName);
            if(optionIndex !== undefined && optionIndex >= 0){
                setSlideIndex(optionIndex!)
                if(sliderRef.current) {
                    sliderRef.current.slickGoTo(optionIndex!)
                    sliderRef.current.slickPause()
                }
            }
        }
        dispatch(setSelectedOptionName(optionName))
    }

    // const handleSetSelectedSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     dispatch(setSelectedSize(e.target.value))
    // }

    const handleSetSelectedSize = (size: string | null) => {
        dispatch(setSelectedSize(size))
    }

    const handleChangeTabDisplay = (event: React.SyntheticEvent, newTabDisplayIndex: number) => {
        setTabDisplayIndex(newTabDisplayIndex);
    }


    const NextArrowCustom = () =>{
        return (
            <div className="carousel-control-prev" onClick={handlePreviousSlide}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="custom-arrow-icon" />
            </div>
        )
    }

    const PreviousArrowCustom = () =>{
        return (
            <div className="carousel-control-next" onClick={handleNextSlide}>
                <FontAwesomeIcon icon={faCircleChevronRight} className="custom-arrow-icon"/>
            </div>
        )
    }

    const handleNextSlide = () => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
    };

    const handlePreviousSlide = () => {
        if (sliderRef.current) {
          sliderRef.current.slickPrev();
        }
    };

    const sliderSettings: Settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        speed: 500,
        autoplaySpeed: 3000,
        autoplay: true,
        nextArrow: <NextArrowCustom/>,
        prevArrow: <PreviousArrowCustom/>,
        pauseOnHover: true,
        pauseOnFocus: true,
        fade: true,
        beforeChange: (currentSlide: number, nextSlide: number) => setSlideIndex(nextSlide)
    }

    const handleMouseEnterImage = () => {
        setZoomStyle((prevState) => ({
            ... prevState,
            transform: 'scale(2)'
        }));
    };

    const handleMouseMoveAroundImage = (event: React.MouseEvent<HTMLImageElement>, index: number) => {
        const imageElement = imageRefs.current[index];
        if (imageElement) {
            const { offsetX, offsetY } = event.nativeEvent;
            const { offsetWidth, offsetHeight } = imageElement;

            const x = (offsetX / offsetWidth) * 100;
            const y = (offsetY / offsetHeight) * 100;

            setZoomStyle((prevState) => ({
                ... prevState,
                transformOrigin: `${x}% ${y}%`
            }));
        }
    };

    const handleMouseLeaveImage = () => {
        setZoomStyle({
          transform: 'scale(1)',
          transition: 'transform 0.5s ease'
        });
    };

    const {register, handleSubmit, formState: {errors}, control} = useForm<ReviewFormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            rating: 0,
            comment: ''
        },
    })

    const handleSendReview = (data: ReviewFormData)=>{

    }

    return (
        <div className="container-fluid py-5">
        <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
                <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner border">
                        <Slider ref={sliderRef} {... sliderSettings}>
                            {images?.map((image, index) => (
                                <div key={index} className="carousel-item active overflow-hidden" >
                                    <img
                                        className="w-100 h-100"
                                        src={image}
                                        alt="Image"
                                        onMouseEnter={handleMouseEnterImage}
                                        onMouseMove={event => handleMouseMoveAroundImage(event, index)}
                                        onMouseLeave={handleMouseLeaveImage}
                                        style={zoomStyle}
                                        ref={el => imageRefs.current[index] = el}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            <div className="col-lg-7 pb-5">
                <h3 className="font-weight-medium">{product?.name}</h3>
                <div className="d-flex align-items-center mb-1 mt-3">
                    <div className="text-primary mr-2">
                        <StarIcon/>
                    </div>
                    <p className={'mb-0'}><span className={'font-weight-semi-bold'}>Đánh giá:</span> {product?.rating}</p>
                </div>
                <div className="d-flex align-items-center mb-4">
                    <div className="text-primary mr-2">
                        <StyleIcon/>
                    </div>
                    <p className={'mb-0 display-6'}><span className={'font-weight-semi-bold'}>Danh mục:</span> {product?.category.name}</p>
                </div>
                <h3 className="font-weight-bold mb-3 d-inline-flex align-items-baseline">
                    {formatCurrency((1 - product?.discountPercent!) * product?.originalPrice!)}
                    {
                        product?.discountPercent !== 0 &&
                        <>
                            <Badge style={{color: 'white'}} className={'mr-2 order-first align-self-center rounded'}>
                                {-(product?.discountPercent as number * 100)}%
                            </Badge>
                            <s className={"font-weight-medium ml-2"} style={{fontSize: "1rem", color: "var(--gray)"}}>
                                {formatCurrency(product?.originalPrice!)}
                            </s>
                        </>
                    }
                </h3>
                <p className="mb-3">{product?.shortDescription}</p>
                <div className="d-flex flex-column mb-4">
                <p className="text-dark font-weight-medium mb-3">Kích cỡ: {productDetail.selectedSize && <span className={'text-primary'}>{productDetail.selectedSize}</span>}</p>
                    <form>
                        {/*{*/}
                        {/*    uniqueSizes.map(size => (*/}
                        {/*        <div className="custom-control custom-radio custom-control-inline">*/}
                        {/*            <input type="radio" className="custom-control-input" value={size} id={size}*/}
                        {/*                   name="size" onChange={handleSetSelectedSize}/>*/}
                        {/*            <label className="custom-control-label" htmlFor={size}>{size}</label>*/}
                        {/*        </div>*/}
                        {/*    ))*/}
                        {/*}*/}

                        {uniqueSizes && <GridRadioButtons arrayValue={uniqueSizes} onSetSelectedSize={handleSetSelectedSize}/>}
                    </form>
                </div>
                <div className="d-flex flex-column mb-4">
                    <p className="text-dark font-weight-medium mb-3">Mẫu: {productDetail.selectedOptionName && <span className={'text-primary'}>{productDetail.selectedOptionName}</span>}</p>
                    <form>
                        {/*{*/}
                        {/*    options?.map(option => (*/}
                        {/*        <div key={option._id} className="custom-control custom-radio custom-control-inline">*/}
                        {/*            <input type="radio" className="custom-control-input" value={option.optionName}*/}
                        {/*                   id={option._id} name="option" onChange={handleSetSelectedOptionName}/>*/}
                        {/*            <label className="custom-control-label"*/}
                        {/*                   htmlFor={option._id}>{option.optionName}</label>*/}
                        {/*        </div>*/}
                        {/*    ))*/}
                        {/*}*/}

                        {optionNames && <GridRadioButtons arrayValue={optionNames!} onSetSelectedOptionName={handleSetSelectedOptionName}/>}
                    </form>
                </div>
                <p className="text-dark font-weight-medium mb-3">Số lượng mẫu trong kho: <span className={'text-primary'}>{quantityInStock}</span></p>
                <div className="d-flex flex-wrap align-items-center mb-4 pt-2" style={{gap: '0.8rem'}}>
                    <div className="input-group quantity" style={{width: "130px"}}>
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
                    <button className="btn btn-primary px-3"><FontAwesomeIcon className={'mr-1'} icon={faCartShopping}/>Thêm
                        vào giỏ hàng
                    </button>
                    <button className="btn btn-primary px-3"><FontAwesomeIcon className={'mr-1'} icon={faHeart}/> Thêm
                        vào mục yêu thích
                    </button>
                    <button className="btn btn-primary px-3"><FontAwesomeIcon className={'mr-1'} icon={faClipboard}/> Yêu cầu thiết kế & kích cỡ khác
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
                            value={tabDisplayIndex}
                            onChange={handleChangeTabDisplay}
                            aria-label={'product detail tabs'}
                        >
                            <Tab label="Mô tả chi tiết"/>
                            <Tab label="Đánh giá & nhận xét"/>
                        </Tabs>
                    </Box>
                    <ProductDetailTabPanel index={0} value={tabDisplayIndex}>
                        {product?.longDescription}
                    </ProductDetailTabPanel>
                    <ProductDetailTabPanel index={1} value={tabDisplayIndex} >
                        <div className="tab-pane fade active show" id="tab-pane-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="mb-4">1 lượt đánh giá & nhận xét cho "{product?.name}"</h4>
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
                                                ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod
                                                ipsum.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="mb-2">Để lại đánh giá và nhận xét của bạn</h4>
                                    <small>Các trường bắt buộc được đánh dấu *</small>
                                    <form onSubmit={handleSubmit(handleSendReview)}>
                                        <div className="d-flex my-3 align-items-baseline">
                                            <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
                                            <div className="text-primary align-self-center">
                                                <Controller
                                                    name="rating"
                                                    control={control}
                                                    render={({field}) => (
                                                        <Rating
                                                            {...field}
                                                            value={field.value}
                                                            onChange={(event, newRating) => {
                                                                field.onChange(newRating)
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            {errors.rating && <small className={'ml-2'} style={{color: 'var(--red)'}}>({errors.rating.message})</small>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Nhận xét của bạn *:</label>
                                            <textarea id="message" cols={30} rows={5} className="form-control" {...register('comment')}
                                                      placeholder="Viết nội dụng nhận xét của bạn ở đây (tối thiểu 10 ký tự và tối đa 1000 ký tự)"></textarea>
                                            {errors.comment && <small style={{color: 'var(--red)'}}>{errors.comment.message}</small>}
                                        </div>
                                        <div className="form-group mb-0">
                                            <input type="submit" value="Gửi đánh giá & nhận xét"
                                                   className="btn btn-primary px-3"/>
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


