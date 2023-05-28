import { createSlice } from "@reduxjs/toolkit";
import { categoriesData } from "../constant/categoriesData";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: categoriesData
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSubCategories: (state, action) => {
            state.subCategories = action.payload;
        },
    },
})
export const { setCategories, setSubCategories } = categorySlice.actions
export default categorySlice.reducer


