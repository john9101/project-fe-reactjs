import PriceRangeFilter from "../components/filter/PriceRangeFilter";
import GenderFilter from "../components/filter/GenderFilter";
import RatingFilter from "../components/filter/RatingFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useState} from "react";
import noResults from '../assets/img/no-results.png'
import {
    fetchNoQueryProductsList,
    fetchQueryFilterSearchProductsList
} from "../store/product.slice";
import ProductCard from "../components/card/ProductCard";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

interface QueryProduct{
    checkedPriceRanges: string[]
    checkedGenders: string[]
    checkedRatings: string[]
    searchedName: string
    directPage: number
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
    const imagesCollection = products.flatMap(product => product.options.map(option => option.image));
    const [minHeight, setMinHeight] = useState<number>(0);

    const [queryProduct, setQueryProduct] = useState<QueryProduct>({
        checkedPriceRanges: [],
        checkedGenders: [],
        checkedRatings: [],
        searchedName: '',
        directPage: 1
    })

    useEffect(() => {
        if(location.search === ''){
            const noQueryProductsListPromise = dispatch(fetchNoQueryProductsList())
            return () => {
                noQueryProductsListPromise.abort();
            }
        }else{
            console.log(location.search)
            const queryFilterSearchProductsListPromise = dispatch(fetchQueryFilterSearchProductsList(location.search))
            return () => {
                queryFilterSearchProductsListPromise.abort()
            }
        }
    }, [location.search, dispatch]);


    // useEffect(() => {
    //     const loadImageHeights = async () => {
    //         const imageHeightsPromises = imagesCollection.map(
    //             (image) =>
    //                 new Promise<number>((resolve) => {
    //                     const img = new Image();
    //                     img.src = image;
    //                     img.onload = () => {
    //                         resolve(img.naturalHeight);
    //                     };
    //                 })
    //         );
    //
    //         const heights = await Promise.all(imageHeightsPromises);
    //         setMinHeight(Math.min(...heights));
    //     };
    //     loadImageHeights();
    // },[imagesCollection])

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

        if (newQueryProduct.searchedName){
            params.set('name', newQueryProduct.searchedName)
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
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={queryProduct.searchedName} placeholder="Tìm kiếm đồng phục" onChange={handleSearchNameChange}/>
                                        <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="dropdown ml-4">
                                    {
                                        !notFound &&
                                        (
                                            queryProduct.searchedName &&
                                            <>Tìm thấy {products.length} kết quả cho <span className='font-weight-bold'>"{queryProduct.searchedName}"</span></>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            !notFound &&
                            products?.map(product => (
                                <ProductCard key={product._id} product={product} minHeight={minHeight}/>
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
                                <p>Hãy cố gắng thay đổi các tùy chọn trong bộ lọc hoặc từ khóa tìm kiếm để có kết quả tốt hơn</p>
                            </Box>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;


