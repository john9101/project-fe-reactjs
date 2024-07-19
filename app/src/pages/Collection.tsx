import PriceRangeFilter from "../components/filter/PriceRangeFilter";
import UniformGenderFilter from "../components/filter/UniformGenderFilter";
import RatingFilter from "../components/filter/RatingFilter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import React, {useEffect, useRef, useState} from "react";
import noResults from '../assets/img/no-results.png'
import Typed from 'typed.js';
import {fetchProductsListWithQueryString} from "../store/product.slice";
import ProductCard from "../components/card/ProductCard";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Dropdown} from "react-bootstrap";
import {SortTypeConstant} from "../constants/sortType.constant";
import CategoryFilter from "../components/filter/CategoryFilter";
import {FeatureProductsDecorateConstant} from "../constants/featureProductsDecorate.constant";
import BreadcrumbsSection from "../components/common/BreadcrumbsSection";
import filterAttributesObject from "../util/filterAttributesObject";
import * as _ from "lodash";
import {fetchCategoriesList} from "../store/category.slice";
import {PathNamesConstant} from "../constants/pathNames.constant";

interface QueryProduct{
    checkedCategories: string[]
    checkedPriceRanges: string[]
    checkedUniformGenders: string[]
    checkedRatings: string[]
    searchedName: string
    sortedType: string
    isSaleOff: boolean
}

const Collection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname, search, state} = location;
    const {featureName, categoryId} = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const productsList = useSelector((state: RootState) => state.products.productsList);
    const categoriesList = useSelector((state: RootState) => state.categories.categoriesList)
    const notFound = useSelector((state: RootState) => state.products.notFoundUniform);
    const {products, totalPages, currentPage, isDisabledEvent} = productsList
    const [destBreadcrumb, setDestBreadcrumb] = useState<string | null>(null);

    const inputSearchRef = useRef<HTMLInputElement>(null);
    const typedRef = useRef<Typed | null>(null)
    console.log(pathname)
    const isSearchPath = pathname.includes(PathNamesConstant.search);
    const isCategoryPath = pathname.includes(PathNamesConstant.category);
    const isShopPath = pathname.includes(PathNamesConstant.shop);
    const isFeaturePath = pathname.includes(PathNamesConstant.feature);
    const sortTypeConstant = isSearchPath ? SortTypeConstant : filterAttributesObject(SortTypeConstant, ([key, Value]) => key !== 'relevant')

    const initialQueryProduct: QueryProduct = {
        checkedCategories: [],
        checkedPriceRanges: [],
        checkedUniformGenders: [],
        checkedRatings: [],
        searchedName: '',
        sortedType: isSearchPath ? SortTypeConstant['relevant'].serverValue : SortTypeConstant['asc'].serverValue,
        isSaleOff: false
    }

    const [queryProduct, setQueryProduct] = useState<QueryProduct>(initialQueryProduct)

    const collectionParamsURLWithPage = (page: number) => {
        const collectionParamsURL = new URLSearchParams(search)
        if(page !== 1){
            collectionParamsURL.set('page', page.toString())
        }else{
            collectionParamsURL.delete('page')
        }
        return collectionParamsURL
    }

    useEffect(() => {
        if (inputSearchRef.current){
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
    },[])

    useEffect(() => {
        if(state?.resetCollection){
            setQueryProduct(initialQueryProduct)
        }
        const collectionParamsURL = new URLSearchParams(search)
        collectionParamsURL.set('sort', queryProduct.sortedType)
        if (isShopPath){
            setDestBreadcrumb('Cửa hàng')
        }else if(isCategoryPath){
            collectionParamsURL.set('categories', categoryId!)
            if(!categoriesList.length){
                dispatch(fetchCategoriesList())
                    .unwrap()
                    .then(categoriesData =>{
                        if(categoriesData.length){
                            setDestBreadcrumb(categoriesData.find(category => categoryId! === category._id)?.name!)
                        }
                    })
            }else {
                setDestBreadcrumb(categoriesList.find(category => categoryId! === category._id)!.name)
            }
        }else if(isSearchPath){
            setDestBreadcrumb(`Kết quả tìm kiếm`)
            if(collectionParamsURL.has('keyword')){
                setQueryProduct({...queryProduct, searchedName: collectionParamsURL.get('keyword')!})
            }
        } else if(isFeaturePath){
            Object.values(FeatureProductsDecorateConstant).map(decorateValue => {
                if (decorateValue.clientName === featureName){
                    collectionParamsURL.set(decorateValue.serverName, String(true))
                    setDestBreadcrumb(decorateValue.destBreadcrumb)
                }
            })
        }

        if(collectionParamsURL.has('uniformGenders')){
            setQueryProduct({...queryProduct, checkedUniformGenders: _.split(collectionParamsURL.get('uniformGenders'), ',')})
        }else if(collectionParamsURL.has('priceRanges')){
            setQueryProduct({...queryProduct, checkedPriceRanges: _.split(collectionParamsURL.get('priceRanges'), ',')})
        }else if(collectionParamsURL.has('ratings')){
            setQueryProduct({...queryProduct, checkedRatings: _.split(collectionParamsURL.get('ratings'), ',')})
        }else if(collectionParamsURL.has('categories') && !isCategoryPath){
            setQueryProduct({...queryProduct, checkedCategories: _.split(collectionParamsURL.get('categories'), ',')})
        } else if(collectionParamsURL.has('name')){
            setQueryProduct({...queryProduct, searchedName: collectionParamsURL.get('name')!})
        }else if(collectionParamsURL.has('saleOff')){
            if (collectionParamsURL.get('saleOff') === 'true'){
                setQueryProduct({...queryProduct, isSaleOff: true})
            }else{
                setQueryProduct({...queryProduct, isSaleOff: false})
                collectionParamsURL.delete('saleOff')
            }
        }

        const queryStringProductsListPromise = dispatch(fetchProductsListWithQueryString(`?${decodeURIComponent(collectionParamsURL.toString())}`))
        return () => {
            queryStringProductsListPromise.abort()
        }
    }, [location, dispatch]);



    const handleCategoryChange = (newCheckedCategories: string[]) => {
        const newQueryProduct = {...queryProduct, checkedCategories: newCheckedCategories}
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handlePriceRangeChange = (newCheckedPriceRanges: string[]) => {
        const newQueryProduct = {...queryProduct, checkedPriceRanges: newCheckedPriceRanges}
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleUniformGenderChange = (newCheckedUniformGenders: string[]) => {
        const newQueryProduct = {...queryProduct, checkedUniformGenders: newCheckedUniformGenders};
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

    const handleSortTypeChange = (newSortType: string) => {
        const newQueryProduct = {...queryProduct, sortedType: newSortType};
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newQueryProduct;
        if(event.target.checked){
            newQueryProduct = {...queryProduct, isSaleOff: true}
        }else{
            newQueryProduct = {...queryProduct, isSaleOff: false}
        }
        setQueryProduct(newQueryProduct)
        handleQueryProduct(newQueryProduct)
    }

    const handleQueryProduct = (newQueryProduct: QueryProduct) => {
        const collectionParams = new URLSearchParams(search);
        if (newQueryProduct.checkedCategories.length){
            collectionParams.set("categories", newQueryProduct.checkedCategories.join(','))
        }else{
            collectionParams.delete('categories')
        }

        if (newQueryProduct.checkedPriceRanges.length) {
            collectionParams.set("priceRanges", newQueryProduct.checkedPriceRanges.join(','))
        }else{
            collectionParams.delete('priceRanges')
        }

        if (newQueryProduct.checkedUniformGenders.length) {
            collectionParams.set("uniformGenders", newQueryProduct.checkedUniformGenders.join(','))
        }else{
            collectionParams.delete('uniformGenders')
        }

        if (newQueryProduct.checkedRatings.length) {
            collectionParams.set("ratings", newQueryProduct.checkedRatings.join(','))
        }else{
            collectionParams.delete('ratings')
        }

        if (newQueryProduct.searchedName && !isSearchPath){
            collectionParams.set('name', newQueryProduct.searchedName)
        }else{
            collectionParams.delete('name')
        }

        collectionParams.set('sort', newQueryProduct.sortedType)

        if (newQueryProduct.isSaleOff){
            collectionParams.set('saleOff', String(newQueryProduct.isSaleOff))
        }else{
            collectionParams.delete('saleOff')
        }

        navigate(`${pathname}?${decodeURIComponent(collectionParams.toString())}`)
    }

    return (
        <>
            <BreadcrumbsSection destBreadcrumb={destBreadcrumb!}/>
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-12">
                        {
                            !isCategoryPath &&
                            <CategoryFilter
                                handleCategoryChange={handleCategoryChange}
                                categoriesList={categoriesList}
                                checkedCategories={queryProduct.checkedCategories}
                            />
                        }
                        <PriceRangeFilter
                            handlePriceRangeChange={handlePriceRangeChange}
                            checkedPriceRanges={queryProduct.checkedPriceRanges}
                        />
                        <UniformGenderFilter
                            handleUniformGenderChange={handleUniformGenderChange}
                            checkedUniformGenders={queryProduct.checkedUniformGenders}
                        />
                        <RatingFilter
                            handleRatingChange={handleRatingChange}
                            checkedRatings={queryProduct.checkedRatings}
                        />
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1 container">
                                <div className="d-flex align-items-center mb-4 row" style={{rowGap: '0.8rem'}}>
                                    {
                                        featureName !== 'sale-off' &&
                                        <div
                                            className="d-flex align-items-center justify-content-center custom-control custom-checkbox btn border-secondary col-auto ml-3"
                                            style={{paddingLeft: '2.5rem'}}
                                        >
                                            <input type='checkbox' className='custom-control-input' id='sale' onChange={handleSaleChange} disabled={isDisabledEvent} checked={queryProduct.isSaleOff}/>
                                            <label htmlFor='sale' className='custom-control-label text-nowrap'>Giảm giá</label>
                                        </div>
                                    }
                                    <Dropdown className='col'>
                                        <Dropdown.Toggle disabled={isDisabledEvent}>
                                            <b>
                                                {<FontAwesomeIcon icon={SortTypeConstant[queryProduct.sortedType].iconDefinition}/>} Sắp xếp:
                                            </b>
                                            {SortTypeConstant[queryProduct.sortedType].label}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                Object.values(sortTypeConstant)
                                                    .map((sortTypeValue, sortTypeIndex) => (
                                                        <Dropdown.Item onClick={() => handleSortTypeChange(sortTypeValue!.serverValue)} key={sortTypeIndex}>
                                                            <FontAwesomeIcon icon={sortTypeValue!.iconDefinition}/> {sortTypeValue!.label}
                                                        </Dropdown.Item>
                                                    ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div className="text-right col-8">
                                        {
                                            !notFound && (
                                                queryProduct.searchedName &&
                                                <span style={{fontSize: '1rem'}}>
                                                    <FontAwesomeIcon icon={faMagnifyingGlass}/> Tìm thấy {products.length} kết quả cho
                                                    <span className='font-weight-bold'>"{queryProduct.searchedName}"</span>
                                                </span>
                                            )
                                        }
                                    </div>
                                    {
                                        !isSearchPath &&
                                        <div className="input-group col-8 col-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={queryProduct.searchedName}
                                                onChange={handleSearchNameChange}
                                                ref={inputSearchRef}
                                                disabled={isDisabledEvent}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                !notFound && currentPage <= totalPages &&
                                products?.map(product => (
                                    <ProductCard key={product._id} colGridClass={'col-lg-4 col-md-6 col-sm-12 pb-1'} product={product}/>
                                ))
                            }

                            {
                                !notFound &&
                                <div className="col-12 pb-1">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center mb-3">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <NavLink className="page-link"
                                                         to={`${pathname}?${decodeURIComponent(collectionParamsURLWithPage(1).toString())}`}
                                                         aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                    <span className="sr-only">Trang đầu tiên</span>
                                                </NavLink>
                                            </li>
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <NavLink className="page-link"
                                                         to={`${pathname}?${decodeURIComponent(collectionParamsURLWithPage(currentPage - 1).toString())}`}
                                                         aria-label="Previous">
                                                    <span aria-hidden="true">&lt;</span>
                                                    <span className="sr-only">Trang trước</span>
                                                </NavLink>
                                            </li>
                                            {
                                                Array
                                                    .from({length: totalPages}, (_, index) => index + 1)
                                                    .map((page, index) => (
                                                        <li key={index} className={`page-item ${page === currentPage && 'active'}`}>
                                                            <NavLink className="page-link" to={`${pathname}?${decodeURIComponent(collectionParamsURLWithPage(page).toString())}`}>{page}</NavLink>
                                                        </li>
                                                    ))
                                            }
                                            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                                <NavLink className="page-link"
                                                         to={`${pathname}?${decodeURIComponent(collectionParamsURLWithPage(currentPage + 1).toString())}`}
                                                         aria-label="Next">
                                                    <span aria-hidden="true">&gt;</span>
                                                    <span className="sr-only">Trang tiếp theo</span>
                                                </NavLink>
                                            </li>
                                            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                                <NavLink className="page-link"
                                                         to={`${pathname}?${decodeURIComponent(collectionParamsURLWithPage(totalPages).toString())}`}
                                                         aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                    <span className="sr-only">Trang cuối cùng</span>
                                                </NavLink>
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
                                    <p style={{fontSize: '1.2rem'}}
                                       className='font-weight-semi-bold'>{notFound.message}</p>
                                    <p>Hãy cố gắng thay đổi các tùy chọn trong bộ lọc hoặc từ khóa tìm kiếm để có kết
                                        quả tốt hơn</p>
                                </Box>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection;


