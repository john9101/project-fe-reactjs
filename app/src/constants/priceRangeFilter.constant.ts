import {formatCurrency} from "../util/formatCurrency";

export const PriceRangeFilterConstant = {
    under100000: `Nhỏ hơn ${formatCurrency(100000)}`,
    from100000To200000: `Từ ${formatCurrency(100000)} - ${formatCurrency(200000)}`,
    from200000To350000: `Từ ${formatCurrency(200000)} - ${formatCurrency(350000)}`,
    from350000To500000: `Từ ${formatCurrency(350000)} - ${formatCurrency(500000)}`,
    from500000To700000: `Từ ${formatCurrency(500000)} - ${formatCurrency(700000)}`,
    over700000: `Lớn hơn ${formatCurrency(700000)}`
}
