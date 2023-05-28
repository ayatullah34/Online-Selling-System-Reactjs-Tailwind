import { configureStore } from '@reduxjs/toolkit'
import product from './productSlice'
import category from './categorySlice'

export const store = configureStore({
    reducer: { category, product },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})