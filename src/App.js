import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Header';
import CategoryList from './pages/categories/CategoryList';
import SubCategoryList from './pages/categories/subCategory/SubCategoryList';
import ProductList from './pages/products/ProductList';

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Header />
        <Routes>
          <Route
            path="/categories"
            element={<CategoryList />}
          />
          <Route
            path="/categories/:categoryId"
            element={<SubCategoryList />}
          />
          <Route
            path="/"
            element={<ProductList />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
