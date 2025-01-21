import React from "react";
import { BsStarFill } from "react-icons/bs";

interface ProductCardsProps {
  name: string;
  paragraph: string;
  isBlurred?: boolean;
  customClass?: string;
}

const ReviewCard = ({
  name,
  paragraph,
  isBlurred,
  customClass,
}: ProductCardsProps) => {
  return (
    <div
      className={`h-fit min-w-fit rounded-[30px] border border-black/10 p-5 flex flex-col gap-2 ${
        isBlurred ? "lg:blur-sm" : ""
      } ${customClass}`}
    >
      <div className="flex gap-1">
        <BsStarFill  className="text-[#FFC633]"/>
        <BsStarFill  className="text-[#FFC633]" />
        <BsStarFill   className="text-[#FFC633]" />
        <BsStarFill   className="text-[#FFC633]"/>
        <BsStarFill    className="text-[#FFC633]"/>
      </div>
      <h1 className="text-xl font-bold">{name} ✅</h1>
      <p className="text-sm">{paragraph}</p>
    </div>
  );
};

export default ReviewCard;
