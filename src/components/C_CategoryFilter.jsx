import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('https://bestbrowsergamesapi--1matzh.repl.co/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <div>
      <select className='category-filter' value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todas as categorias</option>
        {categories.map(category => (
          <option key={category._id} value={category.name}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
