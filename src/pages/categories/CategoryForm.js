import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/categorySlice';

const CategoryForm = ({ open, handleClose, category }) => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.categories)
    const [name, setName] = useState("");

    useEffect(() => {
        setName(category ? category.name : '')
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category) {
            editCategory(category.id, { name });
        } else {
            const newCategory = { id: Date.now(), name, subCategories: [] };
            addCategory(newCategory);
        }
        setName('');
        handleClose();
    };

    const editCategory = (categoryId, updatedCategory) => {
        const updatedCategories = categories.map((category) => {
            if (category.id === categoryId) {
                return { ...category, ...updatedCategory };
            }
            return category;
        });
        dispatch(setCategories(updatedCategories));
    };

    const addCategory = (category) => {
        dispatch(setCategories([...categories, category]));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
            <DialogTitle>{category ? 'Kategori Düzenle' : 'Kategori Oluştur'}</DialogTitle>
            <DialogContent className='flex flex-col' dividers>
                <TextField
                    size='small'
                    label="Kategori adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
            </DialogContent>
            <DialogActions >
                <form onSubmit={handleSubmit} className="flex flex-row gap-3">
                    <Button onClick={handleClose} >
                        İptal
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        {category?.id ? 'Kaydet' : 'Oluştur'}
                    </Button>
                </form>
            </DialogActions>
        </Dialog >
    );
};

export default CategoryForm;
