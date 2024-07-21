import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from "../store/store";
import WishlistEmpty from "../components/WishlistEmpty";
import ProductCard from "../components/card/ProductCard";


function Wishlist() {
    const favouriteItems = useSelector((state: RootState) => state.wishlist.products);
    console.log("favourite: " , favouriteItems);
    return (
        <div className="col-12 d-flex flex-column align-items-center justify-content-sm-center">
            <div className={"row col-md-8"}>
                {favouriteItems.length > 0 ? (
                    favouriteItems.map(item => (
                        <ProductCard key={item._id} product={item} colGridClass={'col-lg-4 col-md-6 col-sm-12 pb-1'}/>
                    ))
                ) : (
                    <WishlistEmpty/>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
