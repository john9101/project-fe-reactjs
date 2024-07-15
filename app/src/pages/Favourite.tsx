import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {formatCurrency} from "../util/formatCurrency";
import {RootState} from "../store/store";
import FavouriteEmpty from "../components/FavouriteEmpty";
import {removeFromFavourite} from "../store/favourite.slice";
import ProductCard from "../components/card/ProductCard";

const StyledNavLink = styled(NavLink)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

function Favourite() {
    const favouriteItems = useSelector((state: RootState) => state.favourite.products);
    const dispatch = useDispatch();


    const handleUnFavourite = (itemId: string) => {
        dispatch(removeFromFavourite(itemId));
    };

    return (
        <div className="col-12 d-flex flex-column align-items-center justify-content-sm-center">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Sản phẩm yêu thích</span></h2>
            </div>
            <div className={"row col-md-8"}>
                {favouriteItems.length > 0 ? (
                    favouriteItems.map(item => (
                        <ProductCard key={item._id} product={item}/>
                    ))
                ) : (
                    <FavouriteEmpty/>
                )}
            </div>
        </div>
    );
}

export default Favourite;
