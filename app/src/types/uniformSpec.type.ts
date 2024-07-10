import {Measurement} from "./measurement.type";

export interface UniformSpec{
    measurement: Measurement,
    value: number,
    distanceToNext: number
}