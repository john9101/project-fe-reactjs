import {UniformSpec} from "../types/uniformSpec.type";
import Decimal from "decimal.js";
import {BodyMetricRange} from "../types/bodyMetricRange.type";

export const computeBodyMetricsRange = (initialBodyMetricRange: BodyMetricRange, index: number) => {
    const {min, max} = initialBodyMetricRange
    let distance = max - min;
    if(Number.isInteger(max)){
        distance += 1
    }else{
        distance += 0.01
    }
    return {
        min: min + distance * index,
        max: max + distance * index
    } as BodyMetricRange
}

export const computeUniformSpecMeasure = (initialUniformSpec: UniformSpec, index: number) => {
    let distance =  new Decimal(initialUniformSpec.distanceToNext).times(index).plus(initialUniformSpec.value);
    return parseFloat(distance.toString())
}