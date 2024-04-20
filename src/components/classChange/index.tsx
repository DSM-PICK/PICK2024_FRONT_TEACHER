"use client";
import Image from "next/image";
import React, { useState } from "react";
import nextArrow from "@/assets/Icon/arrow-narrow-right.svg";

interface ChangeClassProps {
  student: string;
  prevClass: string;
  nextClass: string;
  type?: "accept";
  onClick?: () => void;
}

const ChangeClass: React.FC<ChangeClassProps> = ({
  student,
  prevClass,
  nextClass,
  type,
  onClick,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
  };

  return (
    <>
      {type === "accept" ? (
        <div
          className={` cursor-pointer whitespace-nowrap rounded-lg justify-between flex gap-10 w-full py-3 px-4 active:bg-primary-00 ${
            isActive ? " border border-primary-500 bg-white " : "bg-white"
          }`}
          onClick={handleClick}
        >
          <div className=" text-sub-title4-M text-neutral-50">{student}</div>
          <div className="flex gap-4 text-sub-title4-M text-neutral-50">
            {prevClass}
            <Image src={nextArrow} alt="" />
            <span className=" text-primary-300">{nextClass}</span>
          </div>
        </div>
      ) : (
        <div
          className={`whitespace-nowrap rounded-lg justify-between flex bg-white gap-10 w-max px-6 py-5`}
        >
          <div className="text-Button-L text-neutral-50">{student}</div>
          <div className="flex gap-4 text-Button-L text-neutral-50">
            {prevClass}
            <Image src={nextArrow} alt="" />
            {nextClass}
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeClass;
