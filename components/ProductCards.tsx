"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";
import { BsStarFill } from "react-icons/bs";

interface ProductCardsProps {
  imgSrc: string;
  title: string;
  price: number;
  oldPrice?: number                          ; 
  discount?: string; 
  rating: number;
}

const ProductCards = ({ imgSrc, title, price, oldPrice, discount, rating }: ProductCardsProps) => {
  const router = useRouter();
  return (
    <div
      className="h-[444px] min-w-[296px] space-y-1"
      onClick={() => router.push("/productpage")}
    >
      {/* Image Section */}
      <div className="h-3/4 w-full bg-[#f2f0f1] overflow-hidden rounded-[30px] cursor-pointer flex items-center justify-center">
        <img src={imgSrc} alt={title} className="object-cover" />
      </div>

      {/* Title and Rating Section */}
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        {/* Rating */}
        {Array.from({ length: Math.floor(rating) }, (_, i) => (
          <BsStarFill key={i} className="text-[#FFC633]" />
        ))}
        <h1>{rating}/5</h1>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline gap-2 mt-2">
        <h1 className="font-bold text-xl text-black">${price}</h1>

        {/* Display old price if available */}
        {oldPrice && (
          <span className="text-sm text-gray-500 line-through">${oldPrice}</span>
        )}

        {/* Display discount if available */}
        {discount && (
          <span className="text-sm text-red-500 font-semibold">{discount}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
