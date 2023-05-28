import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/productSlice';

const ProductForm = ({ open, handleClose, product }) => {
    const categories = useSelector(state => state.category.categories);
    const [productName, setProductName] = useState(product ? product.name : '');
    const [categoryId, setCategoryId] = useState(product ? product.categoryId : '');
    const [subCategoryId, setSubCategoryId] = useState(product ? product.subCategoryId : '');
    const dispatch = useDispatch();

    const handleCategoryChange = e => {
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId);
        setSubCategoryId('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formData = {
            id: product ? product.id : Date.now(),
            name: productName,
            categoryId,
            subCategoryId,
        };

        if (product) {
            dispatch(updateProduct(formData));
        } else {
            dispatch(addProduct(formData));
        }

        handleClose();
    };

    const getSubCategoriesByCategoryId = categoryId => {
        const selectedCategory = categories.find(category => category.id === categoryId);
        return selectedCategory ? selectedCategory.subCategories : [];
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>{product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</DialogTitle>
            <DialogContent dividers className='grid grid-rows-3 gap-4 '>
                <TextField
                    label="Ürün Adı"
                    variant="outlined"
                    size='small'
                    fullWidth
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
                <TextField
                    label="Kategori"
                    variant="outlined"
                    size='small'
                    select
                    fullWidth
                    value={categoryId}
                    onChange={handleCategoryChange}
                >
                    {categories.map(category => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Alt Kategori"
                    variant="outlined"
                    size='small'
                    select
                    fullWidth
                    value={subCategoryId}
                    onChange={e => setSubCategoryId(e.target.value)}
                    disabled={!categoryId}
                >
                    {getSubCategoriesByCategoryId(categoryId).length > 0 ? (
                        getSubCategoriesByCategoryId(categoryId).map(subCategory => (
                            <MenuItem key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Alt kategori yok</MenuItem>
                    )}
                </TextField>
            </DialogContent>
            <DialogActions className="flex flex-row gap-4">
                <Button onClick={handleClose} >
                    İptal
                </Button>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} disabled={!categoryId || !subCategoryId || !productName?.length > 0}>
                    <span className='capitalize'>{product ? 'Değişikliği Kaydet' : 'Kaydet'}</span>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
