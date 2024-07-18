import {Category} from "../../types/category.type";

interface CategoryFilterProps{
    handleCategoryChange: (newCheckedCategories: string[]) => void
    categoriesList: Category[],
    checkedCategories: string[]
}

const CategoryFilter = ({handleCategoryChange, categoriesList, checkedCategories}: CategoryFilterProps) => {
    const onCategoryFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const newCheckedCategories = checked ? [...checkedCategories, value] : checkedCategories.filter(category => category !== value);
        handleCategoryChange(newCheckedCategories)
    }

    return (
        <div className="border-bottom mb-4 pb-4">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo danh mục</h5>
            <form>
                {
                    categoriesList.map((category, index) => (
                        <div
                            className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox"
                                   className="custom-control-input"
                                   id={`${category._id}`}
                                   value={category._id}
                                   onChange={onCategoryFilterChange}
                                   checked={checkedCategories.includes(category._id!)}
                            />
                            <label className="custom-control-label d-inline-flex align-items-center" htmlFor={`${category._id}`}>{category.name}</label>
                        </div>
                    ))
                }
            </form>
        </div>
    )
}

export default CategoryFilter;