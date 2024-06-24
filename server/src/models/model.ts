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

export interface IInformationUser{
    userName: string;
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

const informationUserSchema: Schema = new Schema({
    userName: {
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

export const InformationUser = mongoose.model('InformationUser', informationUserSchema)
export const Category = mongoose.model('Category', categorySchema)
export const Option = mongoose.model('Option', optionSchema)
export const Product = mongoose.model('Product', productSchema)

