"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Link from "next/link";

interface Product {
  _id: string; // Product ki unique ID
  title: string;
  price: number;
  imgSrc: string;
  rating: number;
  oldPrice?: number;
  discount?: number;
}

const Casual = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          title,
          price,
          "imgSrc": imgSrc.asset->url,
          rating,
          oldPrice,
          discount
        }`;
        const data = await client.fetch(query);
        setProducts(data as Product[]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.title} has been added to the cart!`);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400" />
        ))}
        {Array.from({ length: halfStars }, (_, index) => (
          <FaStarHalfAlt key={`half-${index}`} className="text-yellow-400" />
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-400" />
        ))}
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-gray-500 text-sm mb-6">
          Home &gt; Shop &gt; <span className="text-gray-900 font-semibold">Casual</span>
        </h1>

        <div className="flex justify-end mb-8">
          <Link href="/cart">
            <button className="bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-800 transition">
              View Cart
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div key={product._id} className="p-6 rounded-lg shadow-md border transform hover:scale-105 transition">
              <Link href={`/casual/${product._id}`}>
                <Image
                  src={product.imgSrc || "/placeholder-image.png"}
                  alt={product.title}
                  width={450}
                  height={450}
                  className="object-cover w-full h-60 rounded-lg"
                />
                <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
                <div className="flex items-center mt-1">{renderStars(product.rating)}</div>
                <p className={`text-sm mt-1 ${product.discount || product.oldPrice ? "text-gray-500" : "text-black text-xl font-bold"}`}>
                  ${product.price}{" "}
                  {product.oldPrice && (
                    <span className="line-through text-gray-400">${product.oldPrice}</span>
                  )}
                </p>
                {product.discount && (
                  <p className="text-red-500 text-sm">{product.discount}% off</p>
                )}
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-4 bg-black text-white py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 px-4 py-2 rounded-md shadow-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-4 py-2 rounded-md shadow-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Casual;
