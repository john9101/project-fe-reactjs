import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useRef, useState} from "react";
import {fetchProductDetail, setSelectedOption, setSelectedSize} from "../store/product.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faMinus,
    faCircleChevronLeft,
    faCircleChevronRight,
    faCircleUser,
    faTape,
    faRulerHorizontal,
    faCartShopping,
    faHeart,
    faClipboard
} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faXTwitter, faLinkedinIn, faPinterest} from "@fortawesome/free-brands-svg-icons"
import {Box, Rating, Tab, Tabs} from "@mui/material";
import StyleIcon from '@mui/icons-material/Style';
import StarIcon from '@mui/icons-material/Star';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Slider, {Settings} from "react-slick";
import {formatCurrency} from "../util/formatCurrency";
import GridRadioButtons from "../components/common/GridRadioButtons";
import {Badge, Form, Modal, Button, Table} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {isValidPhone} from "../util/validatePhone";
import {isValidEmail} from "../util/validateEmail";
import {Require} from "../types/require.type";
import http from "../util/http";
import {formatKilogram, formatMeter} from "../util/formatUnitMeasure";
import {computeUniformSpecMeasure, computeBodyMetricsRange} from "../util/formularSizeChart";
import {toast} from "react-toastify";
import {addToCart} from "../store/cart.slice";
import {nanoid} from "@reduxjs/toolkit";
import ButtonQuantity from "../components/common/ButtonQuantity";

const reviewFormSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Bạn phải đánh giá ít nhất là 1 sao'),
    comment: Yup.string()
        .required('Nhận xét của bạn không được để trống')
        .min(10, 'Nội dung nhận xét của bạn phải tối thiểu 10 ký tự')
        .max(1000, 'Nội dung nhận xét của bạn chỉ tối đa 1000 ký tự')
});

const requireFormSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Họ và tên người đại diện không được bỏ trống"),
    email: Yup.string()
        .required("Địa chỉ email không được bỏ trống")
        .test('emailValidation', 'Địa chỉ email không hợp lệ', async (email: string) => {
            if (email) {
                return await isValidEmail(email);
            } else {
                return true
            }
        }),
    phone: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .test("phoneValidation", 'Số điện thoại không hợp lệ', async (phone: string) => {
            if (phone) {
                return await isValidPhone(phone);
            } else {
                return true
            }
        }),
    content: Yup.string()
        .required("Nội dung yêu cầu không được bỏ trống")
        .min(10, 'Nội dung yêu cầu phải tối thiểu 10 ký tự')
        .max(1000, 'Nội dung yêu cầu chỉ tối đa 1000 ký tự'),
    companyName: Yup.string(),
})

interface ReviewFormData {
    rating: number
    comment: string
    fullName?: string
    avatar?: string
    sentDate?: string
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

interface ZoomStyle {
    transform: string;
    transformOrigin?: string;
    transition: string;
}

const ProductDetailTabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    )
}

interface ProductDetailProps {
    productId?: string
}

const ProductDetail = ({productId: productIdFromProp}: ProductDetailProps) => {
    const {productId: productIdFromParam} = useParams()
    const productId = productIdFromProp || productIdFromParam
    const dispatch = useDispatch<AppDispatch>();
    const productDetail = useSelector((state: RootState) => state.products.productDetail!);
    const product = productDetail.product;

    const options = product?.options;
    const initialWeightRange = product?.initialWeightRange
    const initialHeightRange = product?.initialHeightRange
    const sizeCharts = product?.sizeCharts;

    const quantityInStock = productDetail.quantityInStock;
    const images = options?.map(option => option.image)
    const optionNames = options?.map(option => option.name)
    const sizeNames = options?.flatMap(option => option.stocks).map(stock => stock.size);
    const uniqueSizeNames = Array.from(new Set(sizeNames));

    const sliderRef = useRef<Slider>(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [zoomStyle, setZoomStyle] = useState<ZoomStyle>({
        transform: 'scale(1)',
        transition: 'transform 0.5s ease'
    });
    const [tabDisplayIndex, setTabDisplayIndex] = useState<number>(0);
    const [, setSlideIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const [showRequireFormModal, setShowRequireFormModal] = useState<boolean>(false);
    const [showSendRequireSuccessModal, setShowSendRequireSuccessModal] = useState<boolean>(false);
    const [showSizeGuideModal, setShowSizeGuideModal] = useState<boolean>(false)

    const handleShowRequireFormModal = () => setShowRequireFormModal(true);
    const handleCloseRequireFormModal = () => {
        resetRequireForm()
        setShowRequireFormModal(false)
    };

    const handleShowSendRequireSuccessModal = () => setShowSendRequireSuccessModal(true);
    const handleCloseSendRequireSuccessModal = (isContinue: boolean) => {
        if (isContinue) {
            handleShowRequireFormModal()
        }
        setShowSendRequireSuccessModal(false);
    }

    const handleShowSizeGuideModal = () => setShowSizeGuideModal(true);
    const handleCloseSizeGuideModal = () => setShowSizeGuideModal(false);

    useEffect(() => {
        const productDetailPromise = dispatch(fetchProductDetail(productId as string));
        return () => {
            productDetailPromise.abort()
        }
    }, [dispatch, productId]);

    const handleSetSelectedOptionName = (optionName: string | null) => {
        if (!optionName) {
            if (sliderRef.current) {
                sliderRef.current.slickPlay()
            }
        } else {
            const optionIndex = options?.findIndex(option => option.name === optionName);
            if (optionIndex !== undefined && optionIndex >= 0) {
                setSlideIndex(optionIndex!)
                if (sliderRef.current) {
                    sliderRef.current.slickGoTo(optionIndex!)
                    sliderRef.current.slickPause()
                }
            }
        }
        dispatch(setSelectedOption(optionName))
    }

    const handleSetSelectedSizeName = (sizeName: string | null) => {
        const sizeIndex = uniqueSizeNames.indexOf(sizeName!)
        let selectedSize = null
        if (sizeName && sizeIndex >= 0) {
            selectedSize = {name: sizeName!, index: sizeIndex};
        }
        dispatch(setSelectedSize(selectedSize))
    }

    const handleChangeTabDisplay = (event: React.SyntheticEvent, newTabDisplayIndex: number) => {
        setTabDisplayIndex(newTabDisplayIndex);
    }


    const NextArrowCustom = () => {
        return (
            <div className="carousel-control-prev" onClick={handlePreviousSlide}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="custom-arrow-icon"/>
            </div>
        )
    }

    const PreviousArrowCustom = () => {
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
            ...prevState,
            transform: 'scale(2)'
        }));
    };

    const handleMouseMoveAroundImage = (event: React.MouseEvent<HTMLImageElement>, index: number) => {
        const imageElement = imageRefs.current[index];
        if (imageElement) {
            const {offsetX, offsetY} = event.nativeEvent;
            const {offsetWidth, offsetHeight} = imageElement;

            const x = (offsetX / offsetWidth) * 100;
            const y = (offsetY / offsetHeight) * 100;

            setZoomStyle((prevState) => ({
                ...prevState,
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

    const {
        register: reviewFormRegister,
        handleSubmit: handleSubmitReviewForm,
        formState: {errors: reviewFormErrors},
        control: reviewFormControl
    } = useForm<ReviewFormData>({
        resolver: yupResolver(reviewFormSchema)
    })

    const {
        register: requireFormRegister,
        handleSubmit: handleSubmitRequireForm,
        formState: {errors: requireFormErrors},
        reset: resetRequireForm
    } = useForm<Require>({
        resolver: yupResolver(requireFormSchema)
    })

    const onSubmitSendReview = (data: ReviewFormData) => {

    }

    const onSubmitSendRequire = async (data: Require) => {
        try {
            const response = await http.post<Omit<Require, '_id'>>('requires', data)
            handleCloseRequireFormModal()
            handleShowSendRequireSuccessModal()
            return response.data
        } catch (error) {
            console.log('Error: ', error);
        }
    }
    const handleAddToCart = () => {
        const selectedOption = productDetail.selectedOption;
        const selectedSize = productDetail.selectedSize;
        if (quantityInStock === 0) {
            toast.error("Sản phẩm đã hết hàng", {
                position: "bottom-left",
                autoClose: 2000
            });
            return;
        }
        if (selectedOption === null || selectedSize === null) {
            toast.error("Vui lòng chọn kích cỡ và mẫu", {
                position: "bottom-left",
                autoClose: 1000
            });
            return;
        }
        (product && selectedOption && selectedSize && dispatch(addToCart({
            id: nanoid(),
            product,
            quantity,
            selectedSize,
            selectedOption
        })));
        toast.success("Đã thêm vào giỏ hàng", {
            position: "bottom-left",
            autoClose: 1000
        });
    }
    return (
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                <div className="col-lg-5 pb-5">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">
                            <Slider ref={sliderRef} {...sliderSettings}>
                                {images?.map((image, index) => (
                                    <div key={index} className="carousel-item active overflow-hidden">
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
                        <p className={'mb-0'}><span
                            className={'font-weight-semi-bold'}>Đánh giá:</span> {product?.rating}</p>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                        <div className="text-primary mr-2">
                            <StyleIcon/>
                        </div>
                        <p className={'mb-0 display-6'}><span
                            className={'font-weight-semi-bold'}>Danh mục:</span> {product?.category.name}</p>
                    </div>
                    <h3 className="font-weight-bold mb-3 d-inline-flex align-items-baseline">
                        {formatCurrency((1 - product?.discountPercent!) * product?.originalPrice!)}
                        {
                            product?.discountPercent !== 0 &&
                            <>
                                <Badge style={{color: 'white'}}
                                       className={'mr-2 order-first align-self-center rounded'}>
                                    {-(product?.discountPercent as number * 100)}%
                                </Badge>
                                <s className={"font-weight-medium ml-2"}
                                   style={{fontSize: "1rem", color: "var(--gray)"}}>
                                    {formatCurrency(product?.originalPrice!)}
                                </s>
                            </>
                        }
                    </h3>
                    <p className="mb-3">{product?.shortDescription}</p>
                    <p className='d-flex mb-3 align-items-center font-weight-semi-bold' style={{cursor: "pointer"}}
                       onClick={handleShowSizeGuideModal}>
                        <FontAwesomeIcon icon={faRulerHorizontal} className='mr-1 text-primary'
                                         style={{fontSize: '1.5rem'}}/> Huớng dẫn chọn kích cỡ
                    </p>
                    <div className="d-flex flex-column mb-4">
                        <p className="text-dark font-weight-medium mb-3 flex-wrap">
                            Kích cỡ: {productDetail.selectedSize &&
                            <span className={'text-primary'}>
                                {productDetail.selectedSize!.name}
                                (<span>
                                    Cân nặng: {formatKilogram(computeBodyMetricsRange(initialWeightRange!, productDetail.selectedSize.index).min)} - {formatKilogram(computeBodyMetricsRange(initialWeightRange!, productDetail.selectedSize.index).max)} |
                                    Chiều cao: {formatMeter(computeBodyMetricsRange(initialHeightRange!, productDetail.selectedSize.index).min)} - {formatMeter(computeBodyMetricsRange(initialHeightRange!, productDetail.selectedSize.index).max)}
                                </span>)
                            </span>}
                        </p>
                        <form>
                            {uniqueSizeNames && <GridRadioButtons arrayValues={uniqueSizeNames}
                                                                  onSetSelectedSizeName={handleSetSelectedSizeName}/>}
                        </form>
                    </div>
                    <div className="d-flex flex-column mb-4">
                        <p className="text-dark font-weight-medium mb-3">
                            Mẫu: {productDetail.selectedOption &&
                            <span
                                className={'text-primary'}>{productDetail.selectedOption!.name} ({productDetail.selectedOption!.description})</span>}
                        </p>
                        <form>
                            {optionNames && <GridRadioButtons arrayValues={optionNames!}
                                                              onSetSelectedOptionName={handleSetSelectedOptionName}/>}
                        </form>
                    </div>
                    <p className="text-dark font-weight-medium mb-3">Số lượng mẫu trong kho: <span
                        className={'text-primary'}>{quantityInStock}</span></p>
                    <div className="d-flex flex-wrap align-items-center mb-4 pt-2" style={{gap: '0.8rem'}}>
                        <div className="input-group quantity" style={{width: "130px"}}>
                            <ButtonQuantity quantity={quantity} setQuantity={setQuantity}/>
                        </div>
                        <button className="btn btn-primary px-3" onClick={handleAddToCart}><FontAwesomeIcon
                            className={'mr-1'} icon={faCartShopping}/>Thêm
                            vào giỏ hàng
                        </button>
                        <button className="btn btn-primary px-3"><FontAwesomeIcon className={'mr-1'}
                                                                                  icon={faHeart}/> Thêm
                            vào mục yêu thích
                        </button>
                        <button className="btn btn-primary px-3" onClick={handleShowRequireFormModal}><FontAwesomeIcon
                            className={'mr-1'} icon={faClipboard}/> Yêu cầu thiết kế & kích cỡ khác
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
            {
                (!productIdFromProp && productIdFromParam) &&
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
                        <ProductDetailTabPanel index={1} value={tabDisplayIndex}>
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
                                        <small>Các trường bắt buộc được đánh dấu <span className='text-danger'>*</span></small>
                                        <Form onSubmit={handleSubmitReviewForm(onSubmitSendReview)}>
                                            <div className="d-flex mt-3 mb-2 align-items-baseline">
                                                <p className="mb-0 mr-2 font-weight-semi-bold">Đánh giá của bạn <span
                                                    className='text-danger'>*</span></p>
                                                <div className="text-primary align-self-center">
                                                    <Controller
                                                        name="rating"
                                                        control={reviewFormControl}
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
                                                {reviewFormErrors.rating && <small
                                                    className='ml-1 text-danger'>({reviewFormErrors.rating.message})</small>}
                                            </div>
                                            <Form.Group controlId='comement' className='mb-3'>
                                                <Form.Label className='font-weight-semi-bold'>Nhận xét của bạn <span
                                                    className='text-danger'>*</span></Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    cols={30}
                                                    rows={5}
                                                    className='form-control'
                                                    {...reviewFormRegister('comment')}
                                                    placeholder="Nhập nội dụng nhận xét (tối thiểu 10 ký tự và tối đa 1000 ký tự)"
                                                    isInvalid={!!reviewFormErrors.comment}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {reviewFormErrors.comment?.message}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className='px-3'>
                                                Gửi đánh giá & nhận xét
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </ProductDetailTabPanel>
                    </div>
                </div>
            }
            <Modal show={showRequireFormModal} onHide={handleCloseRequireFormModal}>
                <Modal.Header>
                    <Modal.Title>Yêu cầu thiết kế & kích cỡ khác</Modal.Title>
                    <button type="button" className="close align-self-center" style={{outline: 'none'}}
                            onClick={handleCloseRequireFormModal}>
                        <span style={{fontSize: '2rem'}}>&times;</span>
                    </button>
                </Modal.Header>
                <Form onSubmit={handleSubmitRequireForm(onSubmitSendRequire)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId='fullName'>
                            <Form.Label className='font-weight-semi-bold'>Họ và tên người đại diện <span
                                className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên của người đại diện"
                                autoFocus
                                {...requireFormRegister('fullName')}
                                isInvalid={!!requireFormErrors.fullName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {requireFormErrors.fullName?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='email'>
                            <Form.Label className='font-weight-semi-bold'>Địa chỉ email <span
                                className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập email của cá nhân hoặc công ty"
                                autoFocus
                                {...requireFormRegister('email')}
                                isInvalid={!!requireFormErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {requireFormErrors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='phone'>
                            <Form.Label className='font-weight-semi-bold'>Số điện thoại <span
                                className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại của cá nhân hoặc công ty"
                                autoFocus
                                {...requireFormRegister('phone')}
                                isInvalid={!!requireFormErrors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {requireFormErrors.phone?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='companyName'>
                            <Form.Label className='font-weight-semi-bold'>Tên công ty (nếu có)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên công ty đang làm việc"
                                autoFocus
                                {...requireFormRegister(('companyName'))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId='content'>
                            <Form.Label className='font-weight-semi-bold'>Nội dung yêu cầu <span
                                className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                autoFocus
                                placeholder="Nhập nội dung yêu cầu (tối thiểu 10 ký tự và tối đa 1000 ký tự"
                                {...requireFormRegister('content')}
                                isInvalid={!!requireFormErrors.content}
                            />
                            <Form.Control.Feedback type="invalid">
                                {requireFormErrors.content?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseRequireFormModal}>
                            Hủy yêu cầu
                        </Button>
                        <Button variant='primary' type='submit'>
                            Gửi yêu cầu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showSendRequireSuccessModal} onHide={() => handleCloseSendRequireSuccessModal(false)}>
                <Form>
                    <Modal.Body>
                        <div className='d-flex flex-column text-center align-items-center'>
                            <div className='d-flex flex-column align-items-center mb-3'>
                                <AssignmentTurnedInIcon className='text-success' style={{fontSize: '12rem'}}/>
                                <strong style={{fontSize: '1.8rem'}}>Gửi yêu cầu thành công</strong>
                            </div>
                            <span style={{fontSize: '1.1rem'}}>Cảm ơn bạn đã gửi yêu cầu cho chúng tôi. Chúng tôi sẽ cố gắng phản hồi sớm nhất trong vòng 24h. Vui lòng bạn chú ý điện thoại hoặc email để nhận được phản hồi từ chúng tôi</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => handleCloseSendRequireSuccessModal(true)}>
                            Tiếp tục tạo yêu cầu mới
                        </Button>
                        <Button variant='primary' onClick={() => handleCloseSendRequireSuccessModal(false)}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showSizeGuideModal} onHide={handleCloseSizeGuideModal} size='lg'>
                <Modal.Header>
                    <Modal.Title>Hướng dẫn chọn kích cỡ</Modal.Title>
                    <button type="button" className="close align-self-center" style={{outline: 'none'}}
                            onClick={handleCloseSizeGuideModal}>
                        <span style={{fontSize: '2rem'}}>&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {sizeCharts?.map(sizeChart => (
                        <div className='d-flex flex-column mb-4'>
                            <span className='mb-2 font-weight-semi-bold' style={{fontSize: '1.5rem'}}><FontAwesomeIcon
                                icon={faTape}/> {sizeChart.name}</span>
                            <Table striped bordered hover>
                                <thead className='bg-primary text-white'>
                                <tr>
                                    <th>Kích cỡ</th>
                                    {uniqueSizeNames.map(size => <th>{size}</th>)}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Cân nặng</td>
                                    {uniqueSizeNames.map((_, index) => (
                                        <td>
                                            {formatKilogram(computeBodyMetricsRange(initialWeightRange!, index).min)} -
                                            {formatKilogram(computeBodyMetricsRange(initialWeightRange!, index).max)}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Chiều cao</td>
                                    {uniqueSizeNames.map((_, index) => (
                                        <td>
                                            {formatMeter(computeBodyMetricsRange(initialHeightRange!, index).min)} -
                                            {formatMeter(computeBodyMetricsRange(initialHeightRange!, index).max)}
                                        </td>
                                    ))}
                                </tr>
                                {sizeChart.initialUniformSpecs.map((initialUniformSpec, index) => (
                                    <tr>
                                        <td>{initialUniformSpec.measurement.name}</td>
                                        {uniqueSizeNames.map((_, index) => (
                                            <td>
                                                {computeUniformSpecMeasure(initialUniformSpec, index)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleCloseSizeGuideModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductDetail;