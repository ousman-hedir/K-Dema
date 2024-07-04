import React from 'react';
import { Product } from '../types';
import { FaRegHeart, FaShareAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const originalPrice = product.price * 1.2; // Assuming the original price is 20% higher

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-yellow-500" key={`full-${fullStars}`} />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" key="half" />}
        {Array(emptyStars).fill(<FaRegStar className="text-yellow-500" key={`empty-${emptyStars}`} />)}
      </>
    );
  };

  return (
    <div className="w-[230px] h-[417px] bg-white shadow-lg p-3 rounded-lg overflow-hidden flex flex-col">
      <div className="relative w-full h-52">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            {renderStars(product.rating)} <span className="ml-2"></span>
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <span className="text-sm font-bold text-[#757779] line-through">${originalPrice.toFixed(2)}</span>
          <span className="text-lg font-bold">${product.price}</span>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <button className="flex gap-2 text-sm py-1 px-2 text-[#F1BB06] bg-[#F4EFDA] font-semibold rounded-md hover:bg-yellow-400 hover:text-white  transition duration-300">
            Add to Cart
          </button>
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#F4EFDA] rounded-md">
              <FaRegHeart className="cursor-pointer  hover:text-yellow-600  text-[#F1BB06] transition duration-200" size={20} />
            </span>
            <span className="p-1 bg-[#F4EFDA] rounded-md">
              <FaShareAlt className="cursor-pointer text-[#F1BB06]  hover:text-yellow-600  transition duration-200" size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
