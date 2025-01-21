/* eslint-disable @next/next/no-img-element */
import ProductCards from "@/components/ProductCards";
import ReviewCard from "@/components/ReviewCard";
import Button from "@/components/ui/Button";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const ProductPage = () => {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <h1 className="text-black/50 mt-12">
          {"Home > Shop > Men >"} <span className="text-black">T-shirt</span>{" "}
        </h1>

        <div className="mt-12 lg:mt-24 w-full flex flex-col lg:flex-row gap-8 lg:gap-4 h-fit lg:h-[600px]">
          <div className="h-full w-full lg:w-auto flex flex-col-reverse items-center lg:items-stretch lg:justify-between lg:flex-row gap-4">
            <div className="flex lg:flex-col justify-between gap-2 w-full lg:w-auto">
              <div className="w-full lg:w-[132px] bg-[#f2f0f1] h-[120px] lg:h-[180px] rounded-[20px] flex items-center overflow-hidden justify-center">
                <img
                  src="/images/c2.png"
                  alt=""
                  className="object-cover h-full"
                />
              </div>
              <div className="w-full lg:w-[132px] bg-[#f2f0f1] h-[120px] lg:h-[180px] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img
                  src="/images/c2.png"
                  alt=""
                  className="object-cover h-full"
                />
              </div>
              <div className="w-full lg:w-[132px] bg-[#f2f0f1] h-[120px] lg:h-[180px] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img
                  src="/images/c1.png"
                  alt=""
                  className="object-cover h-full"
                />
              </div>
            </div>
            <div className="h-[300px] lg:h-[600px] w-full lg:w-[444px] bg-[#f2f0f1] rounded-[30px] flex items-center justify-center overflow-hidden">
              <img
                src="/images/main.png"
                alt=""
                className="object-cover h-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <h1 className="font-extrabold text-xl md:text-2xl lg:text-4xl xl:text-6xl">
              ONE LIFE GRAPHIC T-SHIRT
            </h1>
            <div className="flex items-center gap-2">
              <BsStarFill className="" />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <h1> 5/5</h1>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-3">
              $260 <span className="line-through text-black/50">$300</span>{" "}
              <span className="bg-red-200 text-destructive text-base lg:text-2xl rounded-full px-2 font-light">
                -40%
              </span>
            </h1>
            <p className="border-b border-gray-200 pb-6">
              This graphic t-shirt which is perfect for any occasion. Crafted
              from a soft and breathable fabric, it offers superior comfort and
              style.
            </p>

            <div className="border-b border-gray-200 pb-8 lg:pb-12 mt-2">
              <h1 className="text-lg lg:text-xl font-light">Select Colors</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-10 w-10 lg:h-12 lg:w-12 bg-[#4f4631] rounded-full cursor-pointer"></div>
                <div className="h-10 w-10 lg:h-12 lg:w-12 bg-[#314f4a] rounded-full cursor-pointer"></div>
                <div className="h-10 w-10 lg:h-12 lg:w-12 bg-[#31344f] rounded-full cursor-pointer"></div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 mt-2">
              <h1 className="text-lg lg:text-xl font-light">Choose Sizes</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="bg-[#f2f0f1] h-10 lg:h-12 w-fit flex items-center justify-center rounded-[30px] px-4 cursor-pointer">
                  Small
                </div>
                <div className="bg-[#f2f0f1] h-10 lg:h-12 w-fit flex items-center justify-center rounded-[30px] px-4 cursor-pointer">
                  Medium
                </div>
                <div className="bg-[#f2f0f1] h-10 lg:h-12 w-fit flex items-center justify-center rounded-[30px] px-4 cursor-pointer">
                  Large
                </div>
                <div className="bg-[#f2f0f1] h-10 lg:h-12 w-fit flex items-center justify-center rounded-[30px] px-4 cursor-pointer">
                  X-Large
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 items-center w-full">
              <div className="w-full lg:w-48 h-12 px-6 bg-[#f2f0f1] flex items-center justify-between rounded-[30px] cursor-pointer">
                <h1 className="text-2xl font-bold cursor-pointer">-</h1>
                <h1 className="text-2xl font-bold">1</h1>
                <h1 className="text-2xl font-bold cursor-pointer">+</h1>
              </div>
              <div className="w-full h-12 px-6 bg-black text-white flex items-center justify-center rounded-[30px] cursor-pointer">
                Add to Cart
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-24 w-full flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between">
          <h1 className="text-center w-full lg:w-[33%] border-b border-black/10 pb-6 h-8 text-lg lg:text-xl font-semibold">
            Product Details
          </h1>
          <h1 className="text-center w-full lg:w-[33%] border-b border-black pb-6 h-8 text-lg lg:text-xl font-semibold">
            Rating & Reviews
          </h1>
          <h1 className="text-center w-full lg:w-[33%] border-b border-black/10 pb-6 h-8 text-lg lg:text-xl font-semibold">
            FAQs
          </h1>
        </div>

        <div className="mt-12 w-full flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
          <h1 className="text-black text-xl lg:text-2xl font-bold">
            All Reviews{" "}
            <span className="text-lg lg:text-xl font-light text-black/50">
              (451)
            </span>
          </h1>
          <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
            <div className="bg-[#f2f0f1] h-12 w-12 flex items-center justify-center rounded-full cursor-pointer">
              <CiSettings className="text-2xl" />
            </div>
            <div className="flex h-12 items-center gap-2 bg-[#f2f0f1] rounded-[30px]">
              <select name="" id="" className="bg-transparent px-4 py-2">
                <option value="">Select</option>
              </select>
            </div>
            <div className="bg-black h-12 w-full lg:w-48 text-white flex items-center justify-center rounded-[30px] cursor-pointer">
              <h1>Write a review</h1>
            </div>
          </div>
        </div>

        {/* review div */}
        <div className="">
          <div className="flex w-full flex-col lg:flex-row gap-4 mt-12">
            <div className="w-full flex flex-col justify-center gap-2">
              <ReviewCard
                name="Samantha D."
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
                customClass="!w-full"
              />
              <ReviewCard
                customClass="!w-full"
                name="Alex M."
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
              />
             
              <ReviewCard
                name="Olivia P."
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
                customClass="!w-full"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <ReviewCard
                name="Liam K."
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
                customClass="!w-full"
              />
              <ReviewCard
                name="Ava H."
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
                customClass="!w-full"
              />
              <ReviewCard
                name="John Doe"
                paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, mollitia?"
                customClass="!w-full"
              />
             
            </div>
          </div>
          <div className="w-full flex justify-center mt-12">
            <Button title="Load More" href="/" />
          </div>
        </div>

        <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-center mt-12 z-50 text-black">
  YOU MIGHT ALSO LIKE
</h1>

<div className="w-full lg:mb-48 mt-12">
  {/* Grid system for responsive layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 justify-center">
    <ProductCards
      title="Polo With Contrast Trims"
      price={212}
      imgSrc="/images/blue.png"
      rating={4.0}
      oldPrice={242}
      discount="-20%"
    />
    <ProductCards
      title="Grading Graphics T-shirt"
      price={145}
      imgSrc="/images/graphic.png"
      rating={3.5}

    />
    <ProductCards
      title="Polo With Tipping Details"
      price={180}
      imgSrc="/images/red.png"
      rating={4.5}

    />
    <ProductCards
      title="Black Stripped T-shirt"
      price={120}
      imgSrc="/images/bw.png"
      rating={5.0}
      oldPrice={160}
      discount="30%"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductPage;
