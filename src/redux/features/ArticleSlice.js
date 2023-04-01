import { createSlice } from "@reduxjs/toolkit"
import { getArticles } from "./AuthUserSlice"

const initialState = {
    data: {},
    isLoaded: false
}

const articlesSlise = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setDataArticles: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [getArticles.pending]: (state) => {
            state.isLoaded = false
        },
        [getArticles.fulfilled]: (state) => {
            state.isLoaded = true
        },
        [getArticles.rejected]: (state) => {
            state.isLoaded = false
        }
    }
})

export const { setDataArticles } = articlesSlise.actions
export const articleSliceReducer = articlesSlise.reducer