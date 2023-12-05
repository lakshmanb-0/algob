import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"
import { postType } from "../../components/Card"

export type authState = {
    confirmPassword: string,
    email: string,
    name: string,
    password: string,
    username: string,
    _id: string,
    image: string
}

const getAllPost = createAsyncThunk('posts/getAllPosts', async () => {
    const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/user/656ca06c3eebc8a6ca7b4f69/posts`);
    const data = await response.json();
    let sorted = data.sort(function (a: postType, b: postType) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });;
    return sorted
})

const authSlice = createSlice({
    name: 'authReducer',
    initialState: InitialStore.auth,
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logOut: (state) => {
            state.user = {
                confirmPassword: '',
                email: '',
                name: '',
                password: '',
                username: '',
                _id: '',
                image: ''
            }
            localStorage.clear()
        },
        loadingState: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPost.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
    },
})

export const { logIn, logOut, loadingState } = authSlice.actions
export { getAllPost }

export default authSlice.reducer