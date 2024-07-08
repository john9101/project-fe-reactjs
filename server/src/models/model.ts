import mongoose, {Schema} from "mongoose";

export interface IOption{
    stocks: [
        {
            size: string,
            quantity: number
        }
    ]
    optionName: string
}

export interface IRequire{
    fullName: string
    email: string
    phone: string
    companyName: string
    content: string
    sendDate?: string
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

export interface IContact {
    username: string,
    email: string,
    topic: string,
    message: string
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
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    description: {
        type: String,
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
    rating: {
        type: Number
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
    ],
    uniformGender: {
        type: String,
        require: true
    }
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

const requireSchema: Schema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true
    },
    companyName: {
        type: String
    },
    content: {
        type: String
    },
    sendDate: {
        type: Schema.Types.Date,
        default: Date.now
    }
}, {
    versionKey: false
})
const contactSchema: Schema = new Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    topic: {
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
},  { versionKey: false })

export const Category = mongoose.model('Category', categorySchema, 'categories')
export const Option = mongoose.model('Option', optionSchema, 'options')
export const Product = mongoose.model('Product', productSchema, 'products')
export const User = mongoose.model('User', userSchema, 'users')
export const Require =mongoose.model<IRequire>("Require", requireSchema, 'requires')
export const Contact = mongoose.model("Contact", contactSchema, 'contacts')