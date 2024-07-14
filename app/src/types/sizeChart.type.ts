// import {Measurement} from "./measurement.type";
import {UniformSpec} from "./uniformSpec.type";

export interface SizeChart {
    _id: string
    name: string
    productId: string
    initialUniformSpecs: UniformSpec[]
}