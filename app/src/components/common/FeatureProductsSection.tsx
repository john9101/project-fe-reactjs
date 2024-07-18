import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {fetchProductsListWithQueryString, ProductList} from "../../store/product.slice";
import ProductCard from "../card/ProductCard";
import Slider, {Settings} from "react-slick";
import '../../assets/css/styleHome.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faVestPatches} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {Product} from "../../types/product.type";
import {FeatureProductsDecorateConstant,} from "../../constants/featureProductsDecorate.constant";

interface FeatureProductsSectionProps {
    decorateKey: string
}

const FeatureProductsSection = ({decorateKey}: FeatureProductsSectionProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const {params, bgColor, path, destBreadcrumb} = FeatureProductsDecorateConstant[decorateKey]
    const [featureProductsData, setFeatureProductsData] = useState<Product[]>([]);
    const sliderRef = useRef<Slider>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchProductsListWithQueryString(`?${params.toString()}`))
            .unwrap()
            .then((data) =>{
                setFeatureProductsData((data as ProductList).products)
            })
    }, [params,dispatch, path]);

    const PreviousArrowCustom = () =>{
        return (
            currentSlide >= settings.slidesToScroll! / 2 && (
                <div className="carousel-control-prev" onClick={handlePreviousSlide}>
                    <FontAwesomeIcon icon={faChevronLeft} className="custom-arrow-icon"/>
                </div>
            )
        )
    }

    const NextArrowCustom = () => {
        return (
            currentSlide < settings.slidesToScroll! / 2 && (
                <div className="carousel-control-next" onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faChevronRight} className="custom-arrow-icon"/>
                </div>
            )
        )
    }

    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext()
        }
    };

    const handlePreviousSlide = () => {
        if(sliderRef.current){
            sliderRef.current.slickPrev()
        }
    };

    const settings: Settings = {
        dots: false,
        speed: 500,
        infinite: false,
        slidesToScroll: 4,
        slidesToShow: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        nextArrow: <NextArrowCustom/>,
        prevArrow: <PreviousArrowCustom/>
    }

    return (
        <div className="container-fluid pt-5">
            <div className="mb-4 d-flex px-xl-5 justify-content-between align-items-end">
                <h2 className='text-uppercase d-flex align-items-baseline text-white py-3 px-4'
                    style={{
                        borderRadius: '2rem',
                        fontSize: '1.2rem',
                        gap: '0.4rem',
                        backgroundColor: `var(--${bgColor})`
                    }}
                >
                    <FontAwesomeIcon icon={faVestPatches} style={{fontSize: '1.4rem'}}/>
                    <span style={{fontWeight: 900}}>{destBreadcrumb}</span>
                </h2>
                <NavLink to={`${path}`} state={{resetCollection: true}} className='font-weight-bold' style={{fontSize: '1.2rem'}}>Xem thêm</NavLink>
            </div>
            <div className='slider-container feature'>
                <Slider ref={sliderRef} {...settings} className="px-xl-5 pb-3">
                    {featureProductsData?.map((product, index) => (
                        <ProductCard key={index} product={product} colGridClass={null}/>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default FeatureProductsSection;