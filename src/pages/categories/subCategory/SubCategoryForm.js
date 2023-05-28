import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../../redux/categorySlice';

const SubCategoryForm = ({ handleClose, open, categoryId, editSubCategory }) => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories)
  const [name, setName] = useState('');

  useEffect(() => {
    setName(editSubCategory ? editSubCategory.name : "")
  }, [editSubCategory])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editSubCategory) {
      updateSubCategory(editSubCategory.id, { name });
    } else {
      const newSubcategory = { id: Date.now(), categoryId: parseInt(categoryId), name: name };
      addSubcategory(newSubcategory, parseInt(categoryId));
    }
    setName('');
    handleClose();
  };

  const addSubcategory = (subcategoryId, categoryId) => {
    const categoryIndex = categories.findIndex((category) => category.id === categoryId);
    if (categoryIndex !== -1) {
      const updatedCategories = categories.map((category, index) => {
        if (index === categoryIndex) {
          return {
            ...category,
            subCategories: [...category.subCategories, subcategoryId]
          };
        }
        return category;
      });
      dispatch(setCategories(updatedCategories));
    }
  };

  const updateSubCategory = (subcategoryId, updatedSubcategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.subCategories) {
        const updatedSubCategories = category.subCategories.map((subcategory) => {
          if (subcategory.id === subcategoryId) {
            return { ...subcategory, ...updatedSubcategory };
          }
          return subcategory;
        });
        return { ...category, subCategories: updatedSubCategories };
      }
      return category;
    });
    dispatch(setCategories(updatedCategories));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <DialogTitle>Alt Kategori Ekle</DialogTitle>
      <DialogContent className='flex flex-col' dividers>
        <TextField
          size='small'
          label="Alt kategori adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubCategoryForm;
