import {UniformGenderFilterConstant} from "../../constants/uniformGenderFilter.constant";

interface UniformGenderFilterProps{
    handleUniformGenderChange: (newCheckedUniformGenders: string[]) => void
    checkedUniformGenders: string[]
}

const UniformGenderFilter = ({handleUniformGenderChange, checkedUniformGenders}: UniformGenderFilterProps) => {
    const onUniformGenderFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedUniformGenders = checked ? [...checkedUniformGenders, value] : checkedUniformGenders.filter(uniformGender => uniformGender !== value);
        handleUniformGenderChange(newCheckedUniformGenders)
    }

    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo giới tính</h5>
            <form>
                {Object.entries(UniformGenderFilterConstant).map(([key, value]) => (
                    <div
                        key={key}
                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox"
                               className="custom-control-input"
                               id={`uniform-${key}`}
                               value={key}
                               onChange={onUniformGenderFilterChange}
                               checked={checkedUniformGenders.includes(key)}
                        />
                        <label className="custom-control-label" htmlFor={`uniform-${key}`}>{value}</label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default UniformGenderFilter;