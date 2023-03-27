import { configureStore } from "@reduxjs/toolkit"
import { articleSliceReducer } from "./features/ArticleSlice"
import { userSliceReducer } from "./features/AuthUserSlice"

export const store = configureStore({
    reducer: {
        articles: articleSliceReducer,
        user: userSliceReducer
    }
})