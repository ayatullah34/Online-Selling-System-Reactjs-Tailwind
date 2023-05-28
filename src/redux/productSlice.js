import { createSlice } from '@reduxjs/toolkit';
import { productsData } from '../constant/productsData';

const initialState = {
    products: productsData
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const { id, name, categoryId, subCategoryId } = action.payload;
            const product = state.products.find(product => product.id === id);
            if (product) {
                product.name = name;
                product.categoryId = categoryId;
                product.subCategoryId = subCategoryId;
            }
        }
    }
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
