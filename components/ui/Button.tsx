"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { animateOut } from "@/utils/animate";

interface ButtonProps {
  isBlack?: boolean;
  title?: string;
  customClass?: string;
  href: string;
  children?: React.ReactNode; // can be any node
  isImage?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  isBlack,
  title,
  customClass,
  href,
  children,
  isImage,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animateOut(href, router);
    }
  };

  // Check if the children is a valid React element and is a button
  if (React.isValidElement(children) && children.type === 'button') {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick, // Add onClick to the child button
      className: `px-12 py-4 rounded-full w-full lg:w-fit border border-black ${customClass}`,
    });
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        isBlack ? "bg-black text-white" : "bg-white text-black hover:bg-slate-300"
      } px-[70px] py-4 rounded-[62px] w-full lg:w-fit border border-black ${customClass}`}
    >
      {isImage ? children : title}
    </button>
  );
};

export default Button;
