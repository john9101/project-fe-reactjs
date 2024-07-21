import {Category} from "../types/category.type";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../util/http";

interface CategorySliceState {
    categoriesList: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategorySliceState = {
    categoriesList: [],
    status: 'idle',
    error: null,
}

export const fetchCategoriesList = createAsyncThunk(
    "categories/fetchCategoriesList",
    async (_,thunkAPI) => {
        const response = await http.get<Category[]>('categories', {
            signal: thunkAPI.signal
        })
        return response.data;
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesList.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.categoriesList = action.payload
        })
    }
})

const categoryProducer = categorySlice.reducer
export default categoryProducer;