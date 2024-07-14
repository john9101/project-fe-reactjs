export const formatCurrency = (value: number, locate: string = 'vi-VN', currency: string = 'VND') => {
    return new Intl.NumberFormat(locate, {
        style: 'currency',
        currency: currency
    }).format(value);
}