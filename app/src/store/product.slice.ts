import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../types/product.type";
import http from "../util/http";
import {formatCurrency} from "../util/formatCurrency";
export interface ProductList{
    products: Product[]
    currentPage: number
    totalPages: number
}

export interface NotFound{
    message: string
}

interface ProductSliceState {
    productsList: ProductList;
    productDetail: {
        product: Product | null,
        priceWithUnit: string | null,
        quantityInStock: number,
        selectedOptionName: string | null,
        selectedSize: string | null
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    notFound: NotFound | null;
}

const initialState: ProductSliceState = {
    productsList: {
        products: [],
        currentPage: 1,
        totalPages: 0
    },
    productDetail: {
        product: null,
        priceWithUnit: null,
        quantityInStock: 0,
        selectedOptionName:  null,
        selectedSize: null
    },
    status: 'idle',
    error: null,
    notFound: null
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

export const fetchNoQueryProductsList = createAsyncThunk(
    "products/fetchNoQueryProductsList",
    async (_,thunkAPI)=> {
        const response = await http.get<ProductList>('products', {
            signal: thunkAPI.signal
        })
        return response.data;
    }
)

export const fetchQueryFilterSearchProductsList = createAsyncThunk(
    "products/fetchQueryFilterSearchProductsList",
    async (queryStringFilterSearch: string, thunkAPI)=>{
        const response = await http.get<ProductList | NotFound>(`products${queryStringFilterSearch}`,{
            signal: thunkAPI.signal
        })
        return response.data;
    }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedSize: (state, action: PayloadAction<string>) => {
            // const options = state.productDetail.product!.options
            // state.productDetail.selectedSize = action.payload;
            // if(state.productDetail.selectedOptionName){
            //     const selectedOption = options.find(option => option.option_name === state.productDetail.selectedOptionName)
            //     const selectedStock = selectedOption!.stocks.find(stock => stock.size === state.productDetail.selectedSize)
            //     state.productDetail.quantityInStock = selectedStock?.quantity!
            //     state.productDetail.priceWithUnit = formatCurrency(selectedOption!.price)
            // }
        },
        setSelectedOptionName: (state, action: PayloadAction<string>) => {
            // const options = state.productDetail.product!.options
            // state.productDetail.selectedOptionName = action.payload;
            //
            // const selectedOption = options.find(option => option.option_name === state.productDetail.selectedOptionName)
            // state.productDetail.priceWithUnit = formatCurrency(selectedOption!.price)
            // if(state.productDetail.selectedSize){
            //     const selectedStock = selectedOption!.stocks.find(stock => stock.size === state.productDetail.selectedSize)
            //     state.productDetail.quantityInStock = selectedStock?.quantity!
            // }
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchProductDetail.fulfilled, (state, action)=>{
                state.status = "succeeded"
                let product = action.payload;
                state.productDetail!.product = product

                const options = product.options
                const stocks = options.flatMap(options => options.stocks)
                stocks.forEach(stock => {
                    state.productDetail!.quantityInStock += stock.quantity!
                })

                const prices = options.map(option => option.price)
                const minPrice = Math.min(...prices)
                const maxPrice = Math.max(...prices)
                state.productDetail!.priceWithUnit = formatCurrency(minPrice).concat(" - ", formatCurrency(maxPrice))
            })
            .addCase(fetchNoQueryProductsList.fulfilled, (state, action)=>{
                state.notFound = null
                state.status = "succeeded"
                state.productsList = action.payload
            })
            .addCase(fetchQueryFilterSearchProductsList.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                if(action.payload.hasOwnProperty("message")){
                    state.notFound = action.payload as NotFound
                }else{
                    state.notFound = null
                    state.productsList = action.payload as ProductList
                }
            })
    }
})

export const {setSelectedOptionName, setSelectedSize} = productSlice.actions
const productReducer = productSlice.reducer
export default productReducer;