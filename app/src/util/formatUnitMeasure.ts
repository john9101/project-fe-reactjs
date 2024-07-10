export const formatKilogram = (value: number, locate: string = 'en-US', unit: string = 'kilogram') => {
    return new Intl.NumberFormat(locate, {
        style: 'unit',
        unit: unit,
        unitDisplay: 'short'
    }).format(value);
}

export const formatMeter = (value: number, locate: string = 'en-US', unit: string = 'meter') => {
    return new Intl.NumberFormat(locate, {
        style: 'unit',
        unit: unit,
        unitDisplay: 'short'
    }).format(value);

}