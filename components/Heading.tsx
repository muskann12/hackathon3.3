import React from "react";

const Heading = () => {
  return (
    <div className="bg-black w-full h-[38px]">
      <div className="container mx-auto h-full flex items-center justify-center text-sm font-semibold text-white relative">
        <h1 className="animate-pulse">Sign up and get 20% off to your first order. Sign Up Now</h1>
        <h1 className="absolute right-0 font-semibold text-sm cursor-pointer hidden lg:block">
          X
        </h1>
      </div>
    </div>
  );
};

export default Heading;
