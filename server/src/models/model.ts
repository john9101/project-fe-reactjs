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
export interface IAddress {
    province: string;
    district: string;
    ward: string;
    specific: string;
}

export interface IUsers{
    username: string;
    password: string;
    fullName: string;
    gender: string;
    phone: string;
    email: string;
    address: IAddress;
    companyName: string;
    avatar: string;
}

const optionSchema: Schema = new Schema({
    optionName: {
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
    image: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true
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
    originalPrice: {
        type: Number,
        require: true
    },
    discountPercent: {
        type: Number,
        require: true
    },
    options: [
        {
            type: Schema.Types.ObjectId,
            ref: "Option"
        }
    ]
})
const addressSchema: Schema = new Schema({
    province: {
        type: String,
        
    },
    district: {
        type: String,
    },
    ward: {
        type: String,
    },
    specific: {
        type: String,
    }
});

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,

    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
    },
    companyName: {
        type: String,
    },
    avatar: {
        type: String,
    }
});


export const User = mongoose.model('User', userSchema)
export const Category = mongoose.model('Category', categorySchema)
export const Option = mongoose.model('Option', optionSchema)
export const Product = mongoose.model('Product', productSchema)