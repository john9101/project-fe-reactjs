import {Rating} from "@mui/material";
import {useState} from "react";
import {RatingFilterConstant} from "../../constants/ratingFilter.constant";

interface RatingFilterProps{
    handleRatingChange: (newCheckedRatings: string[]) => void
    checkedRatings: string[]
}

const RatingFilter = ({handleRatingChange, checkedRatings}: RatingFilterProps) => {
    const onRatingFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedRatings = checked ? [...checkedRatings, value] : checkedRatings.filter(rating => rating !== value);
        handleRatingChange(newCheckedRatings)
    }

    return (
        <div className="mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo đánh giá</h5>
            <form>
                {Object.entries(RatingFilterConstant).map(([key, value], index) => (
                    <div
                        key={key}
                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox"
                               className="custom-control-input"
                               id={`rating-${key}`} value={key}
                               onChange={onRatingFilterChange}
                               checked={checkedRatings.includes(key)}
                        />
                        <label className="custom-control-label d-inline-flex align-items-center"
                               htmlFor={`rating-${key}`}><Rating className={'pr-1'} value={value.star} readOnly/>{value.label}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default RatingFilter;