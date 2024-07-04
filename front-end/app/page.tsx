"use client"



import React, { useEffect, useState } from 'react';
import { Product } from './types';
import SelectingInputs from './_Componnets/SelectingInputs';
import ProductCard from './_Componnets/ProductCard';
import { FaStar } from 'react-icons/fa';

const Home: React.FC = () => {
  const productsFilePath = '/data/dummyData.json';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(productsFilePath);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setProducts(jsonData);
        setFilteredProducts(jsonData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [productsFilePath]);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = [...products];

      if (selectedBrand) {
        updatedProducts = updatedProducts.filter(
          (product) => product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
      }

      if (selectedColor) {
        updatedProducts = updatedProducts.filter(
          (product) => product.color.toLowerCase() === selectedColor.toLowerCase()
        );
      }

      if (selectedRating !== null) {
        updatedProducts = updatedProducts.filter(
          (product) => product.rating >= selectedRating
        );
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [selectedBrand, selectedColor, selectedRating, products]);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="flex w-full h-full">
      {/* Filters */}
      <div className="w-1/6 p-4 mt-6 ms-2 bg-[#F4F5F6] ">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Brand Filter */}
        <SelectingInputs
          id="brand-select"
          title="CATEGORIES"
          options={['Apple', 'Samsung', 'Tecno', 'Huawei', 'Nokia']}
          selectedOption={selectedBrand}
          onChange={setSelectedBrand}
        />

        {/* Product Rating Filter */}
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">PRODUCT RATING</h2>
          <div className="flex flex-col justify-between space-">
            {[1, 2, 3, 4, 5].map((rating) => (
              <div
                key={rating}
                className={`cursor-pointer flex justify-between  p-2 border border-transparent rounded-md hover:border-gray-400 focus:ring focus:ring-2 focus:ring-gray-300 ${
                  selectedRating === rating ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleRatingClick(rating)}
              >
                <div className="flex justify-between ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-${star <= rating ? 'yellow-500' : 'gray-400'} mr-1`}
                    />
                  ))}
                </div>
             
                {selectedRating === rating && (
                  <div className=" w-5 h-5 flex items-center justify-center border-white  rounded-md">
                    <span className=" p-1 bg-yellow-500 font-bold"></span>
                  </div>
                )}
                {/* Custom indicator for unselected rating */}
                {selectedRating !== rating && (
                  <div className=" w-5 h-5 border border-gray-300 rounded-md"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Color Filter */}
  
<SelectingInputs
  id="color-select"
  title="COLOR"
  options={['Black', 'Blue', 'Gold', 'Silver', 'Purple']}
  selectedOption={selectedColor}
  onChange={setSelectedColor}
/>


      </div>

      {/* Products */}
      <div className="w-5/6 p-4 grid grid-cols-4 gap-4 mt-16">
  {filteredProducts.length === 0 ? (
    <div className="text-center text-xl relative mt-10  text-gray-500">No products match the selected filters.</div>
  ) : (
    filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  )}
</div>

    </div>
  );
};

export default Home;
