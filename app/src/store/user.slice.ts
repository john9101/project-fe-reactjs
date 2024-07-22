import {User} from "../types/user.type";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import http from "../util/http";

interface UserSliceState {
    user: User | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: {
        username: string,
        password?: string
    } | null;
}

const initialState: UserSliceState = {
    user: null,
    status: 'idle',
    error: null,
}

export const loginAccount = createAsyncThunk(
    'users/loginAccount',
    async (loginData: Pick<User, 'username' | 'password'>, thunkAPI) => {
        try {
            const response = await http.post<User>('/users/login', loginData, {
                signal: thunkAPI.signal
            })
            return response.data
        }catch (error: any){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const registerAccount = createAsyncThunk(
    'users/registerAccount',
    async (registerData: User, thunkAPI) => {
        try {
            const response = await http.post<User>('/users/register', registerData, {
                signal: thunkAPI.signal
            })
            return response.data
        }catch (error: any){
            console.log(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutAccount: (state) => {
            state.user = null
            if(localStorage.getItem('user')){
                localStorage.removeItem('user')
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = null
                state.status = 'succeeded'
            })
            .addCase(registerAccount.pending, (state, action) => {
                state.error = null
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.error = action.payload as {username: string}
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = null
                if(localStorage.getItem('user')){
                    localStorage.removeItem('user')
                }
                localStorage.setItem('user', JSON.stringify(state.user))
                state.status = 'succeeded'
            })
            .addCase(loginAccount.pending, (state, action) => {
                state.error = null
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.error = action.payload as {username: string, password: string}
            })
    }
})

export const {logoutAccount} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
