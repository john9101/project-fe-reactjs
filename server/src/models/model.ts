import mongoose, {Schema} from "mongoose";

export interface IOption{
    stocks: [
        {
            size: string,
            quantity: number
        }
    ]
    price: number
    option_name: string
}

const optionSchema: Schema = new Schema({
    option_name: {
        type: String,
        require: true
    },
    stocks: [
        {
            size: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ],
    price: {
        type: Number,
        require: true
    }
})

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    }
})

const productSchema: Schema = new Schema({
    name: {
        type: String, 
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    salePrice: {
        type: Number
    },
    originalPrice: {
        type: Number, 
        require: true
    },
    images: [
        {
            type: String, 
            require: true
        }
    ],
    options: [
        {
            type: Schema.Types.ObjectId,
            ref: "Option"
        }
    ]
})

export const Category = mongoose.model('Category', categorySchema)
export const Option = mongoose.model('Option', optionSchema)
export const Product = mongoose.model('Product', productSchema)

