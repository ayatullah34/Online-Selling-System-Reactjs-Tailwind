import { Category, ShoppingBasket, Store } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Store />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1,flexShrink:0, cursor: 'pointer', marginLeft: 1 }}
                    onClick={() => navigate('/')}
                >
                    Online Satış Sistemi
                </Typography>
                <nav className='flex flex-row'>
                    <Link
                        component={RouterLink}
                        to="/categories"
                        variant="body2"
                        underline="none"
                        color="inherit"
                        sx={{ marginLeft: '1px' }}
                    >
                        <IconButton size="large" edge="start" color="inherit" aria-label="Kategoriler">
                            <Category />
                            <span className='text-sm ml-1'>Kategoriler</span>
                        </IconButton>
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/"
                        variant="body2"
                        underline="none"
                        color="inherit"
                    >
                        <IconButton size="large" edge="start" color="inherit" aria-label="Ürünler">
                            <ShoppingBasket />
                            <span className='text-sm ml-1'>Ürünler</span>
                        </IconButton>
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
