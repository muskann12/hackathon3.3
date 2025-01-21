'us client'
import React, { useState, useEffect } from 'react';

const Categorycard = () => {
  const products = [
    {
      image: "/images/t8.png",
      title: "Gradient Graphic T-shirt",
      price: 145,
      oldPrice: null,
      rating: 4.5,
      discount: null,
    },
    {
      image: "/images/t9.png",
      title: "Polo with Tipping Details",
      price: 180,
      oldPrice: null,
      rating: 4.5,
      discount: null,
    },
    {
      image: "/images/t10.png",
      title: "Black Striped T-shirt",
      price: 120,
      oldPrice: 150,
      rating: 4.7,
      discount: '-30%',
    },
    {
      image: "/images/a3.png",
      title: "Skinny Fit Jean",
      price: 240,
      oldPrice: 260,
      rating: 4.2,
      discount: '-20%',
    },
    {
      image: "/images/a2.png",
      title: "Checkered Shirt",
      price: 180,
      oldPrice: null,
      rating: 4.3,
      discount: null,
    },
    {
      image: "/images/a4.png",
      title: "Casual Hat",
      price: 50,
      oldPrice: null,
      rating: 4.0,
      discount: null,
    },
    {
      image: "/images/c1.png",
      title: "Vertical Striped Shirt",
      price: 212,
      oldPrice: 232,
      rating: 5,
      discount: "-30%",
    },
    {
      image: "/images/c2.png",
      title: "Courage Graphic T-Shirt",
      price: 145,
      oldPrice: null,
      rating: 4.6,
      discount: null,
    },
    {
      image: "/images/c4.png",
      title: "Loose Fit Bermuda Shorts",
      price: 80,
      oldPrice: null,
      rating: 4.4,
      discount: null,
    },
    // Add more products if necessary
  ];

  const productsPerPage = 9;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Hydration fix: ensure state is only set after component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // After the component is mounted, set the state to true
  }, []);

  // Prevent hydration issues by rendering only after the component is mounted
  if (!isMounted) return null;

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="w-full h-[43px] flex justify-between items-center mt-[120px] ml-[20px]">
        <span className="text-[32px] font-satoshi leading-[43.2px] font-semibold">Casual</span>
        <div className="flex gap-[12px]">
          <span className="font-[16px] leading-[21.6px] text-[#00000099]">
            Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, products.length)} of {products.length} Products
          </span>
          <span className="font-[16px] leading-[21.6px]">
            . Sort by: <strong>Most Popular</strong>
          </span>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 mt-8">
        {currentProducts.map((product, index) => (
          <div key={index} className="bg-[#F0EEED] rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-[250px] w-full object-contain"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-[16px] font-semibold font-satoshi text-black">{product.title}</h2>
              <div className="flex items-center mt-2">
                {/* Rating */}
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20">
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.286 3.955a1 1 0 00.95.69h4.162a1 1 0 01.592 1.806l-3.389 2.464a1 1 0 00-.364 1.118l1.286 3.955a1 1 0 01-1.539 1.118L10 13.763l-3.389 2.464a1 1 0 01-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.605 9.378a1 1 0 01.592-1.806h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-baseline mt-2 space-x-2">
                <span className="text-xl font-satoshi text-black">${product.price}</span>
                {product.oldPrice && <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>}
                {product.discount && <span className="text-sm text-red-500">{product.discount}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 px-10">
        <button className="text-black font-semibold py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300" onClick={handlePrevPage} disabled={currentPage === 1}>
          &larr; Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>

        <button className="text-black font-semibold py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Categorycard;
