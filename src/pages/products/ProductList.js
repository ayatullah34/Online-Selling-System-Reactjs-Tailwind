import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TablePagination from '@mui/material/TablePagination';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/productSlice';
import ProductForm from './ProductForm';

const ProductList = () => {
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleDelete = productId => {
        dispatch(deleteProduct(productId));
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setSelectedProduct(null);
    };

    const handleEditProduct = product => {
        setOpenDialog(true);
        setSelectedProduct(product);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedProduct(null);
    };

    const getCategoryName = categoryId => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.name : '';
    };

    const getSubCategoryName = subCategoryId => {
        let categoryName = '';
        let subCategoryName = '';
        categories.forEach(category => {
            const subCategory = category.subCategories.find(subCategory => subCategory.id === subCategoryId);
            if (subCategory) {
                categoryName = category.name;
                subCategoryName = subCategory.name;
            }
        });
        return categoryName ? `${subCategoryName}` : '';
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="p-8 flex flex-col gap-4">
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }} className="p-4 rounded-lg">
                <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="text-sm md:text-md"> Ürün Listesi</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Add />}
                        onClick={handleOpenDialog}
                    >
                        <span className="capitalize">Yeni Ürün Ekle</span>
                    </Button>
                </Box>
            </Card>
            <Card sx={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', height: "100%" }} className="rounded-lg">
                <CardContent>
                    <TableContainer style={{ height: 400 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Ürün Adı</TableCell>
                                    <TableCell>Kategori</TableCell>
                                    <TableCell>Alt Kategori</TableCell>
                                    <TableCell align="center">İşlemler</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product, index) => (
                                        <TableRow key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '' }} className="hover:bg-gray-200">
                                            <TableCell><span className="text-xs">{product.id}</span></TableCell>
                                            <TableCell><span className="text-xs">{product.name}</span></TableCell>
                                            <TableCell ><span className="text-xs"> {getCategoryName(product.categoryId)}</span></TableCell>
                                            <TableCell><span className="text-xs">{getSubCategoryName(product.subCategoryId)}</span></TableCell>
                                            <TableCell align="center">
                                                <div className="flex justify-center">
                                                    <IconButton
                                                        onClick={() => handleEditProduct(product)}
                                                        size="small"
                                                    >
                                                        <Edit fontSize='small' />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(product.id)}
                                                        size="small"
                                                    >
                                                        <Delete fontSize='small' />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25]}
                        count={products.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage='Satır sayısı'
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </CardContent>
            </Card>
            {openDialog && <ProductForm open={openDialog} handleClose={handleCloseDialog} product={selectedProduct} />}
        </div>
    );
};

export default ProductList;
