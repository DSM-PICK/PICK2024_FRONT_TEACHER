"use client";
import Header from "@/components/header";
import Tab from "@/components/tab";
import React from "react";

interface Prop {
  title: string;
  subTitle: string;
  Dropdown?: React.ReactNode;
  TabOK: boolean;
  children: React.ReactNode;
  TabOnclick: (tab: boolean) => void;
}

const BackGround: React.FC<Prop> = ({
  title,
  subTitle,
  Dropdown,
  TabOK = true,
  children,
  TabOnclick,
}) => {
  return (
    <div className=" min-w-fit min-h-full h-dvh px-6 py-3 bg-primary-1200">
      <Header />
      <div>
        <div className=" py-3 flex items-center gap-3 font-sans">
          <div className=" text-sub-title1-M">{title}</div>
          <div className=" text-sun-title3-M text-neutral-300">{subTitle}</div>
        </div>
        <div>{Dropdown}</div>
        <div className=" flex flex-col gap-6">
          <div>
            {TabOK && (
              <Tab
                firstText="외출"
                SecondText="조기귀가"
                onClick={TabOnclick}
              />
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackGround;
