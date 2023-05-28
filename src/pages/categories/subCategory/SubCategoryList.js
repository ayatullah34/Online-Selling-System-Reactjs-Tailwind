import { Add, ArrowBack, ClearAll, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Card, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCategories } from '../../../redux/categorySlice';
import SubCategoryForm from './SubCategoryForm';

const SubCategoryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.categories)
    const { categoryId } = useParams();
    const [open, setOpen] = useState(false);
    const categoryIndex = categories.findIndex((category) => parseInt(category.id) === parseInt(categoryId));
    const [editSubCategory, setEditSubCategory] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setEditSubCategory(null);
    };

    const handleClose = () => {
        setOpen(false);
        setEditSubCategory(null);
    };

    const handleDelete = (subcategoryId) => {
        deleteSubcategory(subcategoryId, categoryId);
    };

    const handleEditSubCategory = (subCategory) => {
        setOpen(true);
        setEditSubCategory(subCategory);
    };

    const deleteSubcategory = (subcategoryId, categoryId) => {
        const categoryIndex = categories.findIndex((category) => parseInt(category.id) === parseInt(categoryId));
        if (categoryIndex !== -1) {
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex] = {
                ...updatedCategories[categoryIndex],
                subCategories: updatedCategories[categoryIndex].subCategories.filter(
                    (subcategory) => subcategory.id !== parseInt(subcategoryId)
                )
            };
            dispatch(setCategories(updatedCategories));
        }
    };

    return (
        <div className="p-10">
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} className="p-4 mb-4 rounded-lg ">
                <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="text-sm md:text-lg">
                        <IconButton size="small" onClick={() => navigate('/categories')} title='Geri'>
                            <ArrowBack fontSize="medium" />
                        </IconButton>
                        <span className='ml-4'>{categories[categoryIndex]?.name}</span>
                    </Typography>
                    <Button size="small" variant="contained" color="primary" startIcon={<Add className="text-white" />} onClick={handleOpen}>
                        <span className='capitalize'>Alt Kategori Ekle</span>
                    </Button>
                </Box>
            </Card>
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} className="rounded-lg h-[450px]" style={{ overflowY: 'auto' }}>
                <List>
                    {categories[categoryIndex]?.subCategories?.map((subcategory) => (
                        <ListItem key={subcategory.id}>
                            <ListItemIcon>
                                <ClearAll fontSize='small' className='text-gray-300' />
                            </ListItemIcon>
                            <ListItemText primary={subcategory.name} />
                            <Box className="flex gap-2 ">
                                <Button
                                    onClick={() => handleEditSubCategory(subcategory)}
                                    variant="outlined"
                                    style={{ width: 'fit-content', height: 'fit-content' }}
                                    size='small'
                                    color="warning"
                                >
                                    <div className='flex flex-row justfiy-between items-center gap-1'>
                                        <Edit fontSize='small' />
                                        <span className="hidden md:inline capitalize ">Düzenle</span>
                                    </div>
                                </Button>
                                <Button onClick={() => handleDelete(subcategory.id)}
                                    variant="outlined" color="error"
                                    size="small"
                                    style={{ width: 'fit-content', height: 'fit-content' }}>
                                    <div className='flex flex-row justfiy-between items-center gap-1'>
                                        <Delete fontSize='small' />
                                        <span className="hidden md:inline capitalize">Sil</span>
                                    </div>
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <SubCategoryForm
                handleClose={handleClose}
                open={open}
                categoryId={categoryId}
                editSubCategory={editSubCategory}
            />
        </div>
    );
};

export default SubCategoryList;
