import {Filter} from "../../util/filter";
import {useState} from "react";

const genderFilterData: Filter = {
    unisex: 'Đồng phục cho cả nam và nữ',
    male: 'Đồng phục cho nam',
    female: 'Đồng phục cho nữ'
}

interface GenderFilterProps{
    handleGenderChange: (newCheckedGenders: string[]) => void
}

const GenderFilter = ({handleGenderChange}: GenderFilterProps) => {

    const [checkedGenders, setCheckedGenders] = useState<string[]>([]);
    const genderFilterKeys = Object.keys(genderFilterData);

    const onGenderFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedGenders = checked ? [...checkedGenders, value] : checkedGenders.filter(gender => gender !== value);
        setCheckedGenders(newCheckedGenders);
        handleGenderChange(newCheckedGenders)
    }

    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo giới tính</h5>
            <form>
                {genderFilterKeys.map(key => (
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" className="custom-control-input" id={`uniform-${key}`} value={key} onChange={onGenderFilterChange}/>
                        <label className="custom-control-label" htmlFor={`uniform-${key}`}>{genderFilterData[key]}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default GenderFilter;