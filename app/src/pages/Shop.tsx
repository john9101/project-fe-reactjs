import PriceRangeFilter from "../components/filter/PriceRangeFilter";
import GenderFilter from "../components/filter/GenderFilter";
import RatingFilter from "../components/filter/RatingFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faArrowUpWideShort, faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useRef, useState} from "react";
import noResults from '../assets/img/no-results.png'
import Typed from 'typed.js';
import {
    fetchNoQueryProductsList,
    fetchQueryFilterSearchProductsList
} from "../store/product.slice";
import ProductCard from "../components/card/ProductCard";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import {Dropdown} from "react-bootstrap";

enum SortType {
    asc = "asc",
    desc = "desc"
}

type SortProduct = {
    [key in SortType]: {
        name: string,
        icon: React.ReactElement
    }
}

const sortProductData: SortProduct = {
    [SortType.asc]: {
        name: 'Giá từ thấp đến cao',
        icon: <FontAwesomeIcon icon={faArrowUpWideShort}/>
    },
    [SortType.desc]: {
        name: 'Giá từ cao đến thấp',
        icon: <FontAwesomeIcon icon={faArrowDownWideShort}/>
    }
}

interface QueryProduct {
    checkedPriceRanges: string[]
    checkedGenders: string[]
    checkedRatings: string[]
    searchedName: string
    directPage: number
    sortedType: SortType
    isSale: boolean
}


const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch<AppDispatch>();
    const productsList = useSelector((state: RootState) => state.products.productsList);
    const notFound = useSelector((state: RootState) => state.products.notFound);
    const products = productsList.products;
    const totalPages = productsList.totalPages
    const currentPage = productsList.currentPage;

    const inputSearchRef = useRef<HTMLInputElement>(null);
    const typedRef = useRef<Typed | null>(null)

    const [queryProduct, setQueryProduct] = useState<QueryProduct>({
        checkedPriceRanges: [],
        checkedGenders: [],
        checkedRatings: [],
        searchedName: '',
        directPage: 1,
        sortedType: SortType.asc,
        isSale: false
    })

    useEffect(() => {
        if (location.search === '') {
            const noQueryProductsListPromise = dispatch(fetchNoQueryProductsList())
            return () => {
                noQueryProductsListPromise.abort();
            }
        } else {
            console.log(location.search)
            const queryFilterSearchProductsListPromise = dispatch(fetchQueryFilterSearchProductsList(location.search))
            return () => {
                queryFilterSearchProductsListPromise.abort()
            }
        }
    }, [location.search, dispatch]);

    useEffect(() => {
        console.log(typedRef.current === null)
        if (inputSearchRef.current) {
            typedRef.current = new Typed(inputSearchRef.current, {
                strings: [
                    'Bạn đang muốn tìm kiếm đồng phục',
                    'Bạn có thể nhập bất kỳ tên đồng phục nào vào đây',
                    'Kết quả tìm kiếm sẽ hiển thị ngay lập tức cho bạn'
                ],
                typeSpeed: 25,
                backSpeed: 25,
                loop: true,
                attr: 'placeholder',
                smartBackspace: true
            })
        }
        return () => {
            typedRef.current?.destroy()
        }
    }, [])


    const totalPagesArray = Array.from({length: totalPages}, (_, i) => i + 1)

    const handlePriceRangeChange = (newCheckedPriceRanges: string[]) => {
        const newQueryProduct = {...queryProduct, checkedPriceRanges: newCheckedPriceRanges}
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleGenderChange = (newCheckedGenders: string[]) => {
        const newQueryProduct = {...queryProduct, checkedGenders: newCheckedGenders};
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleRatingChange = (newCheckedRatings: string[]) => {
        const newQueryProduct = {...queryProduct, checkedRatings: newCheckedRatings};
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQueryProduct = {...queryProduct, searchedName: event.target.value};
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleSortTypeChange = (newSortType: SortType) => {
        const newQueryProduct = {...queryProduct, sortedType: newSortType};
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newQueryProduct;
        if (event.target.checked) {
            newQueryProduct = {...queryProduct, isSale: true}
        } else {
            newQueryProduct = {...queryProduct, isSale: false}
        }
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleQueryProduct = (newQueryProduct: QueryProduct) => {
        const params = new URLSearchParams();
        if (newQueryProduct.checkedPriceRanges.length) {
            params.set("priceRanges", newQueryProduct.checkedPriceRanges.join(','))
        }

        if (newQueryProduct.checkedGenders.length) {
            params.set("uniformGenders", newQueryProduct.checkedGenders.join(','))
        }

        if (newQueryProduct.checkedRatings.length) {
            params.set("ratings", newQueryProduct.checkedRatings.join(','))
        }

        if (newQueryProduct.searchedName) {
            params.set('name', newQueryProduct.searchedName)
        }

        params.set('sort', newQueryProduct.sortedType)

        if (newQueryProduct.isSale) {
            params.set('sale', String(newQueryProduct.isSale))
        }

        navigate(`/shop?${decodeURIComponent(params.toString())}`)
    }

    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-12">
                    <PriceRangeFilter handlePriceRangeChange={handlePriceRangeChange}/>
                    <GenderFilter handleGenderChange={handleGenderChange}/>
                    <RatingFilter handleRatingChange={handleRatingChange}/>
                </div>
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1 container">
                            <div className="d-flex align-items-center mb-4 row" style={{rowGap: '0.8rem'}}>
                                <div
                                    className="d-flex align-items-center justify-content-center custom-control custom-checkbox btn border-secondary col-auto ml-3"
                                    style={{paddingLeft: '2.5rem'}}
                                >
                                    <input type='checkbox' className='custom-control-input' id='sale'
                                           onChange={handleSaleChange}/>
                                    <label htmlFor='sale' className='custom-control-label text-nowrap'>Giảm giá</label>
                                </div>
                                <Dropdown className='col'>
                                    <Dropdown.Toggle>
                                        <b>{sortProductData[queryProduct.sortedType].icon} Sắp
                                            xếp:</b> {sortProductData[queryProduct.sortedType].name}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {Object.keys(sortProductData).map(key => (
                                            <Dropdown.Item onClick={() => handleSortTypeChange(key as SortType)}>
                                                {sortProductData[key as SortType].icon} {sortProductData[key as SortType].name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="text-right col-8">
                                    {
                                        !notFound &&
                                        (
                                            queryProduct.searchedName &&
                                            <span style={{fontSize: '1rem'}}><FontAwesomeIcon
                                                icon={faMagnifyingGlass}/> Tìm thấy {products.length} kết quả cho <span
                                                className='font-weight-bold'>"{queryProduct.searchedName}"</span></span>
                                        )
                                    }
                                </div>
                                <div className="input-group col-8 col-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={queryProduct.searchedName}
                                        onChange={handleSearchNameChange}
                                        ref={inputSearchRef}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            !notFound &&
                            products?.map(product => (
                                <ProductCard key={product._id} product={product}/>
                            ))
                        }

                        {
                            !notFound &&
                            <div className="col-12 pb-1">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center mb-3">
                                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Trang trước</span>
                                            </a>
                                        </li>
                                        {totalPagesArray.map(page => (
                                            <li className={`page-item ${page === currentPage && 'active'}`}><NavLink
                                                className="page-link" to={''}>{page}</NavLink></li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPagesArray[totalPagesArray.length - 1] && 'disabled'}`}>
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Trang tiếp theo</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        }

                        {
                            notFound &&
                            <Box component='section' sx={
                                {
                                    m: 2,
                                    p: 4,
                                    width: 1,
                                    border: '1px dashed var(--primary)',
                                    textAlign: 'center',
                                    borderRadius: '8px'
                                }
                            }>
                                <img src={noResults} style={{width: '20rem'}}/>
                                <p style={{fontSize: '1.2rem'}} className='font-weight-semi-bold'>{notFound.message}</p>
                                <p>Hãy cố gắng thay đổi các tùy chọn trong bộ lọc hoặc từ khóa tìm kiếm để có kết quả
                                    tốt hơn</p>
                            </Box>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;


