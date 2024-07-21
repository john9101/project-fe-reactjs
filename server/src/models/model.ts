import mongoose, {Schema} from "mongoose";

export interface IOption{
    stocks: [
        {
            size: string,
            quantity: number
        }
    ]
    name: string
    description: string
    productId: string
    image: string
}

export interface IProduct{
    name: string;
    rating: number;
    shortDescription: string;
    longDescription: string;
    options: Array<mongoose.Types.ObjectId>;
    category: mongoose.Types.ObjectId;
    originalPrice: number;
    discountPercent: number;
    uniformGender: string;
    initialHeightRange: {
        min: string,
        max: string
    };
    initialWeightRange: {
        min: string,
        max: string
    };
    sizeCharts: mongoose.Types.ObjectId;
    views: number;
    createdAt: Schema.Types.Date
}
export interface IAddress {
    province: string;
    district: string;
    ward: string;
    specific: string;
}

export interface IRequire {
    fullName: string
    email: string
    phone: string
    companyName: string
    content: string
    sendDate?: string
}

export interface IUser {
    username: string,
    password: string,
    fullName: string,
    gender: string,
    email: string,
    phone: string,
    address: IAddress,
    companyName: string,
    avatar: string,
    birthDate: Schema.Types.Date,
}

export interface IContact {
    username: string,
    email: string,
    topic: string,
    message: string
}

const optionSchema: Schema = new Schema({
    name: {
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
        required: true
    },
    description: {
        type: String
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
    },
    initialHeightRange: {
        min: {
            type: Number,
            require: true
        },
        max: {
            type: Number,
            require: true
        }
    },
    initialWeightRange: {
        min: {
            type: Number,
            require: true
        },
        max: {
            type: Number,
            require: true
        }
    },
    sizeCharts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SizeChart',
        }
    ],
    views: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Schema.Types.Date,
        require: true
    }
})

const measurementSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    }
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

const sizeChartSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    initialUniformSpecs: [
        {
            measurement: {
                type: Schema.Types.ObjectId,
                ref: 'Measurement'
            },
            value: {
                type: Number,
                require: true
            },
            distanceToNext: {
                type: Number,
                require: true
            }
        }
    ]
})

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
        required: false
    },
    companyName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    birthDate: {
        type: Date
    }
}, {
    versionKey: false
});

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
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    topic: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, { versionKey: false })

const voucherSchema: Schema = new Schema({
    code: {
        type: String,
        require: true
    },
    voucherType: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    maxValueDiscount: {
        type: Number,
        require: true
    },
    discountPercent: {
        type: Number,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    usageLimit: {
        type: Number,
        require: true
    },
    minPriceApply: {
        type: Number,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    createdDate: {
        type: Date,
        require: true
    },
    updatedDate: {
        type: Date,
        require: true
    },
    userRestrictions: [
        {
            type: Number,
            require: true,
        }
    ],
    usageCount: {
        type: Number,
        require: true
    }
});


export const Category = mongoose.model('Category', categorySchema, 'categories')
export const Option = mongoose.model('Option', optionSchema, 'options')
export const Product = mongoose.model<IProduct>('Product', productSchema, 'products')
export const User = mongoose.model<IUser>('User', userSchema, 'users')
export const Require = mongoose.model<IRequire>("Require", requireSchema, 'requires')
export const Contact = mongoose.model("Contact", contactSchema, 'contacts')
export const Measurement = mongoose.model('Measurement', measurementSchema, 'measurements')
export const SizeChart = mongoose.model("SizeChart", sizeChartSchema, 'size_charts')
export const Voucher = mongoose.model('Voucher', voucherSchema, 'vouchers')