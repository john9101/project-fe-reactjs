import GenderFilter from "./filter/GenderFilter";
import PriceFilter from "./filter/PriceFilter";
import RatingFilter from "./filter/RatingFilter";

const Sidebar = () => {
    return (
        <div className="col-lg-3 col-md-12">
            <PriceFilter/>
            <GenderFilter/>
            <RatingFilter/>
        </div>
    )
}

export default Sidebar