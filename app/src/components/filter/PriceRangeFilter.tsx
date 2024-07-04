import {formatCurrency} from "../../util/formatCurrency";
import {Filter} from "../../util/filter";
import {useState} from "react";

const priceRangeFilterData: Filter = {
    under100000: `Nhỏ hơn ${formatCurrency(100000)}`,
    from100000To200000: `Từ ${formatCurrency(100000)} - ${formatCurrency(200000)}`,
    from200000To350000: `Từ ${formatCurrency(200000)} - ${formatCurrency(350000)}`,
    from350000To500000: `Từ ${formatCurrency(350000)} - ${formatCurrency(500000)}`,
    from500000To700000: `Từ ${formatCurrency(500000)} - ${formatCurrency(700000)}`,
    over700000: `Lớn hơn ${formatCurrency(700000)}`
}

interface PriceRangeFilterProps{
    handlePriceRangeChange: (newCheckedPriceRanges: string[]) => void
}

const PriceRangeFilter = ({handlePriceRangeChange}: PriceRangeFilterProps) => {
    const [checkedPriceRanges, setCheckedPriceRanges] = useState<string[]>([]);
    const priceRangeFilterKeys = Object.keys(priceRangeFilterData);

    const onPriceRangeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: targetValue, checked: targetChecked } = event.target;
        const newCheckedPriceRanges = targetChecked ? [...checkedPriceRanges,targetValue] : checkedPriceRanges.filter(priceRange => priceRange !== targetValue);
        setCheckedPriceRanges(newCheckedPriceRanges)
        handlePriceRangeChange(newCheckedPriceRanges)
    }

    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo khoảng giá</h5>
            <form>
                {priceRangeFilterKeys.map(key => (
                    <div
                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" className="custom-control-input" id={`price-range-${key}`} value={key} onChange={onPriceRangeFilterChange}/>
                        <label className="custom-control-label" htmlFor={`price-range-${key}`}>{priceRangeFilterData[key]}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default PriceRangeFilter;