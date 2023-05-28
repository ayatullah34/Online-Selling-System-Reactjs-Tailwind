import { Add, ArrowForward, Category, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Card, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategories } from '../../redux/categorySlice';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.category.categories);
    const subCategories = useSelector((state) => state.category.subCategories);
    const [open, setOpen] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setEditCategoryId(null);
    };

    const handleClose = () => {
        setOpen(false);
        setEditCategoryId(null);
    };

    const handleEditCategory = (categoryId) => {
        setOpen(true);
        setEditCategoryId(categoryId);
    };

    const getCategoryById = (categoryId) => {
        return categories.find((category) => category.id === categoryId);
    };

    const getSubcategoryById = (subcategoryId) => {
        return subCategories?.find((subcategory) => subcategory.id === subcategoryId);
    };

    const getCategoryProductCount = (categoryId) => {
        const categoryProducts = products.filter(product => product.categoryId === categoryId);
        return categoryProducts.length;
    };

    const getCategorySubcategoryCount = (categoryId) => {
        const category = getCategoryById(categoryId);
        if (category) {
            return category.subCategories.length;
        }
        return 0;
    };

    const deleteCategory = (categoryId) => {
        const updatedCategories = categories.filter((category) => category.id !== categoryId);
        dispatch(setCategories(updatedCategories));
    };

    return (
        <div className="p-10">
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} className=" p-4 mb-4 rounded-lg">
                <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="text-sm md:text-lg">Kategoriler</Typography>
                    <Button onClick={handleOpen} size="small" variant="contained" color="primary" startIcon={<Add className="text-white" />}>
                        <span className='capitalize'>Yeni Kategori Oluştur</span>
                    </Button>
                </Box>
            </Card>
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} className="rounded-lg h-[450px]" style={{ overflowY: 'auto' }}>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id} className='grid grid-cols-3 gap-4'>
                            <Category fontSize='small' className='text-gray-300' />
                            <ListItemText className='col-span-2 truncate' primary={category.name} secondary={` ${getCategorySubcategoryCount(category.id)} alt kategori,${getCategoryProductCount(category.id)} ürün`} />
                            <Box className="flex gap-2 ">
                                <Button
                                    onClick={() => handleEditCategory(category.id)}
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    style={{ width: 'fit-content', height: 'fit-content' }}
                                >
                                    <div className='flex flex-row justfiy-between items-center gap-1'>
                                        <Edit fontSize='small' />
                                        <span className="hidden md:inline capitalize ">Düzenle</span>
                                    </div>
                                </Button>
                                <Button
                                    onClick={() => deleteCategory(category.id)}
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    style={{ width: 'fit-content', height: 'fit-content' }}
                                >
                                    <div className='flex flex-row justfiy-between items-center gap-1'>
                                        <Delete fontSize='small' />
                                        <span className="hidden md:inline capitalize">Sil</span>
                                    </div>
                                </Button>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    size="small"
                                    to={`/categories/${category.id}`}
                                    style={{ width: 'fit-content', height: 'fit-content' }}
                                >
                                    <div className='flex flex-row justfiy-between items-center gap-1'>
                                        <span className="hidden md:inline capitalize">Alt Kategoriler</span>
                                        <ArrowForward fontSize='small' />
                                    </div>
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <CategoryForm
                open={open}
                handleClose={handleClose}
                category={categories.find(category => category.id === editCategoryId)}
            />
        </div>
    );
};

export default CategoryList;
