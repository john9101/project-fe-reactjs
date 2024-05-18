import ColorFilter from "./filter/ColorFilter";
import PriceFilter from "./filter/PriceFilter";
import SizeFilter from "./filter/SizeFilter";

const Sidebar = () => {
    return (
        <div className="col-lg-3 col-md-12">
            <PriceFilter/>
            <ColorFilter/>
            <SizeFilter/>
        </div>
    )
}

export default Sidebar