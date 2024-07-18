import {PriceRangeFilterConstant} from "../../constants/priceRangeFilter.constant";

interface PriceRangeFilterProps{
    handlePriceRangeChange: (newCheckedPriceRanges: string[]) => void
    checkedPriceRanges: string[]
}

const PriceRangeFilter = ({handlePriceRangeChange, checkedPriceRanges}: PriceRangeFilterProps) => {
    const onPriceRangeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedPriceRanges = checked ? [...checkedPriceRanges,value] : checkedPriceRanges.filter(priceRange => priceRange !== value);
        handlePriceRangeChange(newCheckedPriceRanges)
    }

    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo khoảng giá</h5>
            <form>
                {Object.entries(PriceRangeFilterConstant).map(([key, value]) => (
                    <div
                        key={key}
                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox"
                               className="custom-control-input"
                               id={`price-range-${key}`}
                               value={key}
                               onChange={onPriceRangeFilterChange}
                               checked={checkedPriceRanges.includes(key)}
                        />
                        <label className="custom-control-label" htmlFor={`price-range-${key}`}>{value}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default PriceRangeFilter;