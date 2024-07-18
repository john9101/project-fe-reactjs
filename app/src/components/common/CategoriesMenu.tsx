import * as React from 'react';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import { Button } from '@mui/material';
// import '../../assets/css/style.module.scss'
// import { useEffect, useState } from 'react';
// import http from '../../util/http';
// import { Category } from '../../types/category.type';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {useEffect} from "react";
import {fetchCategoriesList} from "../../store/category.slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {NavLink, useLocation} from "react-router-dom";
const CategoriesMenu = () => {
    // const [categories, setCategories] = useState<string[]>([]);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await http.get<Category[]>(`categories`)
    //             setCategories(response.data.map(category => category.name))
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation()
    const categoriesList = useSelector((state: RootState) => state.categories.categoriesList);

    useEffect(() => {
        const categoriesListPromise = dispatch(fetchCategoriesList());
        return () => {
            categoriesListPromise.abort()
        }
    }, []);

    // const styleCategoriesList = {
    //     top: '5px',
    //     width: '360px',
    //     background: 'var(--primary)',
    //     color: 'var(--light)',
    //     '&:hover': {
    //         background: '#c17a74 ',
    //     }
    // }
    // const styleMenuCategories = {
    //     padding: '0'
    // }
    // const styleMenuCategoriesItem = {
    //     width: '360px',
    //     padding: '8px 16px',
    //     borderBottom: '1px solid #d3ebff',
    //     '&:hover': {
    //         backgroundColor: 'var(--primary)',
    //         color: 'white',
    //     }
    // }
    return (
        // <PopupState variant="popover" popupId="demo-popup-menu">
        //     {(popupState) => (
        //         <React.Fragment>
        //             <Button variant='contained' {...bindTrigger(popupState)}
        //                 sx={{ maxWidth: 360, height: 50, ...styleCategoriesList }}
        //                 className="col-lg-4 CategoriesList">
        //                 Categories
        //             </Button>
        //             <Menu {...bindMenu(popupState)} className="MenuCategories" sx={{ ...styleMenuCategories }}>
        //                 {categoriesList.map((category, index) => (
        //                     <MenuItem
        //                         key={index}
        //                         onClick={popupState.close}
        //                         className="MenuCategoriesItem"
        //                         sx={{ maxWidth: 360, ...styleMenuCategoriesItem }}
        //                     >
        //                         {category.name}
        //                     </MenuItem>
        //                 ))}
        //             </Menu>
        //         </React.Fragment>
        //     )}
        // </PopupState>
        <div className="col-lg-3 d-none d-lg-block">
            <a className={`btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100`}
               data-toggle="collapse" href="#navbar-vertical"
               style={{height: '65px', marginTop: '-1px', padding: '0 30px'}}>
                <h6 className="m-0 font-weight-bold">Danh mục</h6>
                <FontAwesomeIcon icon={faAngleDown}/>
            </a>
            <nav
                className={`collapse ${location.pathname === '/' ? 'show' : 'position-absolute'} navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light`}
                id="navbar-vertical" style={location.pathname !== '/' ? {width: 'calc(100% - 30px)', zIndex: 1} :  {}}>
                <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                    {
                        categoriesList.map(category => (
                            <NavLink key={category._id} to={`/category/${category._id}`} className="nav-item nav-link">{category.name}</NavLink>
                        ))
                    }
                </div>
            </nav>
        </div>
    );
}

export default CategoriesMenu;
