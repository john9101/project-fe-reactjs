import {Option} from "./option.type";
import {Category} from "./category.type";
import {SizeChart} from "./sizeChart.type";
import {BodyMetricRange} from "./bodyMetricRange.type";

export interface Product {
    _id: string
    name: string
    category: Category
    shortDescription?: string
    longDescription?: string
    rating: number
    options: Option[]
    originalPrice: number
    discountPercent: number
    uniformGender: string
    initialHeightRange: BodyMetricRange
    initialWeightRange: BodyMetricRange
    sizeCharts: SizeChart[]
}