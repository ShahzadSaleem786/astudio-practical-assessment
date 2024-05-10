import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import Pagination from './Pagination';
import { FaSearch } from 'react-icons/fa';
import './styles.css';

const COLORS = {
  BLACK: "#322625",
  GREY: "#ebebeb",
  BLUE: "#c0e3e5",
  YELLOW: "#fdc936"
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTitleFilter, setSelectedTitleFilter] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      const allProducts = response.data.products;
      const totalProducts = allProducts.length;
      const totalPages = Math.ceil(totalProducts / pageSize);
      setProducts(allProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTitleFilterChange = (value) => {
    setSelectedTitleFilter(value);
  };

  const handleBrandFilterChange = (value) => {
    setSelectedBrandFilter(value);
  };

  const handleCategoryFilterChange = (value) => {
    setSelectedCategoryFilter(value);
  };

  const filteredProducts = searchValue
  ? products.filter(product =>
      Object.values(product).some(val => {
        if (typeof val === 'number') {
          return val.toString().toLowerCase().includes(searchValue.toLowerCase());
        } else if (typeof val === 'string') {
          return val.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
      })
    )
  : products;


  const filteredProductsWithTitleFilter = selectedTitleFilter
    ? filteredProducts.filter(product => product.title && product.title.toLowerCase() === selectedTitleFilter.toLowerCase())
    : filteredProducts;

  const filteredProductsWithBrandFilter = selectedBrandFilter
    ? filteredProductsWithTitleFilter.filter(product => product.brand && product.brand.toLowerCase() === selectedBrandFilter.toLowerCase())
    : filteredProductsWithTitleFilter;

  const filteredProductsWithCategoryFilter = selectedCategoryFilter
    ? filteredProductsWithBrandFilter.filter(product => product.category && product.category.toLowerCase() === selectedCategoryFilter.toLowerCase())
    : filteredProductsWithBrandFilter;

  return (
    <div>
      <h1 style={{ color: COLORS.BLACK, fontFamily: 'Neutra Text' }}>Home/Products</h1>
      <div className="filters-container" style={{ display: 'flex', alignItems: 'center' }}>
        <select
          className="filter-input"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
          style={{color: COLORS.BLACK, marginRight: '10px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span style={{ color: COLORS.BLACK, marginRight: '10px' }}>Entries</span>
        <span>|</span>
        <i className="search-icon" style={{ color: COLORS.BLACK, marginLeft: '15px', marginRight: '15px' }} onClick={() => setShowSearchInput(!showSearchInput)}>
          <FaSearch />
        </i>
        {showSearchInput && (
          <input 
            type="text" 
            className="filter-input" 
            placeholder="Search" 
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)} 
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
        )}
        <span>|</span>
        <select
          className="filter-input"
          value={selectedTitleFilter}
          onChange={(e) => handleTitleFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Title</option>
          {Array.from(new Set(products.map(product => product.title))).map(title => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedBrandFilter}
          onChange={(e) => handleBrandFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Brand</option>
          {Array.from(new Set(products.map(product => product.brand))).map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select
          className="filter-input"
          value={selectedCategoryFilter}
          onChange={(e) => handleCategoryFilterChange(e.target.value)}
          style={{color: COLORS.BLACK, marginLeft: '10px' }}
        >
          <option value="">Category</option>
          {Array.from(new Set(products.map(product => product.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ProductTable products={filteredProductsWithCategoryFilter} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} pageSize={pageSize} />
    </div>
  );
};

export default ProductsPage;
