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

export interface IUser{
    username: string,
    password: string,
    fullName: string,
    gender: string,
    email: string,
    phone: string,
    address: string,
    companyName: string,
    avatar: string,
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

const userSchema: Schema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    companyName: {
        type: String
    },
    avatar: {
        type: String
    }
})

export const Category = mongoose.model('Category', categorySchema, 'categories')
export const Option = mongoose.model('Option', optionSchema, 'options')
export const Product = mongoose.model('Product', productSchema, 'products')
export const User = mongoose.model('User', userSchema, 'users')
