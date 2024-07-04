import {Rating} from "@mui/material";
import {Filter} from "../../util/filter";
import {useState} from "react";

const ratingFilterData: Filter = {
    5: '5 sao',
    4: '4 sao trở lên',
    3: '3 sao trở lên',
    2: '2 sao trở lên',
    1: '1 sao trở lên'
}

interface RatingFilterProps{
    handleRatingChange: (newCheckedRatings: string[]) => void
}

const RatingFilter = ({handleRatingChange}: RatingFilterProps) => {
    const [checkedRatings, setCheckedRatings] = useState<string[]>([]);
    const ratingFilterKeys = Object.keys(ratingFilterData);

    const onRatingFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedRatings = checked ? [...checkedRatings, value] : checkedRatings.filter(priceRange => priceRange !== value);
        setCheckedRatings(newCheckedRatings);
        handleRatingChange(newCheckedRatings)
    }

    return (
        <div className="mb-5">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo đánh giá</h5>
            <form>
                {ratingFilterKeys.reverse().map(key => (
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" className="custom-control-input" id={`rating-${key}`} value={key} onChange={onRatingFilterChange}/>
                        <label className="custom-control-label d-inline-flex align-items-center"
                               htmlFor={`rating-${key}`}><Rating className={'pr-1'} value={parseInt(key)} readOnly/> {ratingFilterData[key]}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default RatingFilter;