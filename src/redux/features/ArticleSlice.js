import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getArticles = createAsyncThunk('articles/getArticles', async (page, {rejectWithValue, dispatch}) => {
    const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${window.localStorage.getItem('token')}`,
        }})
        .then(res => res.json())
        .catch((error) => rejectWithValue(error))
        
    dispatch(setDataArticles(res))
})

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