import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../types/product.type";
import http from "../util/http";
import {Option} from "../types/option.type";

interface ProductSliceState {
    productsList: Product[];
    productDetail: {
        product: Product | null,
        quantityInStock: number,
        selectedOptionName: string | null,
        selectedSize: string | null
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductSliceState = {
    productsList: [],
    productDetail: {
        product: null,
        quantityInStock: 0,
        selectedOptionName:  null,
        selectedSize: null
    },
    status: 'idle',
    error: null,
}

export const fetchProductDetail = createAsyncThunk(
    "products/fetchProductDetail",
    async (productId: string, thunkAPI)=> {
        const response = await http.get<Product>(`products/${productId}`, {
            signal: thunkAPI.signal
        })
        return response.data
    }
)

const totalQuantityInStock = (options: Option[]) => {
    return options.flatMap(option => option.stocks)
                    .reduce((total, stock) => total + stock.quantity!, 0)
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedSize: (state, action: PayloadAction<string | null>) => {
            const options = state.productDetail.product!.options
            if(action.payload) {
                state.productDetail.selectedSize = action.payload
                if(state.productDetail.selectedOptionName){
                    const selectedOption = options.find(option => option.optionName === state.productDetail.selectedOptionName)
                    const selectedStock = selectedOption!.stocks.find(stock => stock.size === state.productDetail.selectedSize)
                    state.productDetail.quantityInStock = selectedStock?.quantity!
                }
            }else{
                state.productDetail.selectedSize = null
                state.productDetail.quantityInStock = totalQuantityInStock(options)
            }
        },
        setSelectedOptionName: (state, action: PayloadAction<string | null>) =>{
            const options = state.productDetail.product!.options;
            if(action.payload){
                state.productDetail.selectedOptionName = action.payload;
                const selectedOption = options.find(option => option.optionName === state.productDetail.selectedOptionName)
                if(state.productDetail.selectedSize){
                    const selectedStock = selectedOption!.stocks.find(stock => stock.size === state.productDetail.selectedSize)
                    state.productDetail.quantityInStock = selectedStock?.quantity!
                }
            }else{
                state.productDetail.selectedOptionName = null
                state.productDetail.quantityInStock = totalQuantityInStock(options)
            }
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchProductDetail.fulfilled, (state, action)=>{
                state.status = "succeeded"
                let product = action.payload;
                state.productDetail!.product = product
                if(!state.productDetail.selectedOptionName || !state.productDetail.selectedSize){
                    state.productDetail!.quantityInStock = totalQuantityInStock(product.options)
                }
            })
    }
})

export const {setSelectedOptionName, setSelectedSize} = productSlice.actions
const productReducer = productSlice.reducer
export default productReducer;

