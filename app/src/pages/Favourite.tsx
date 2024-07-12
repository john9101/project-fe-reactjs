import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {formatCurrency} from "../util/formatCurrency";
import {RootState} from "../store/store";
import FavouriteEmpty from "../components/FavouriteEmpty";
import {removeFromFavourite} from "../store/favourite.slice";

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
        <div className="favourite-items">
            {favouriteItems.length > 0 ? (
                favouriteItems.map(item => {
                    const image = item.options.length > 0 ? item.options[0].image : '';
                    return (
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={item._id}>
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img className="img-fluid w-100" src={image} alt={item.name} />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className="text-truncate mb-3">{item.name}</h6>
                                    <div className="d-flex justify-content-center">
                                        <h6>{formatCurrency(item.originalPrice * (1 - item.discountPercent))}</h6>
                                        <h6 className="text-muted ml-2">
                                            <del>{formatCurrency(item.originalPrice)}</del>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light border">
                                    <StyledNavLink to={`/products/${item._id}`} className="btn btn-sm text-dark p-0">
                                        <i className="fas fa-eye text-primary mr-1"></i>Xem chi tiết
                                    </StyledNavLink>
                                    <button className="btn btn-sm text-dark p-0"
                                            onClick={() => handleUnFavourite(item._id)}>
                                        <i className="fas fa-heart-broken text-danger mr-1"></i>Hủy yêu thích
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <FavouriteEmpty/>
            )}
        </div>
    );
}

export default Favourite;
