import Header from "@/components/header";
import Tab from "@/components/tab";
import React from "react";

interface Prop {
  title: string;
  subTitle?: string;
  Dropdown?: React.ReactNode;
  TabOK: boolean;
  children: React.ReactNode;
  TabOnclick: (tab: boolean) => void;
  leftTab?: string;
  rightTab?: string;
}

const BackGround: React.FC<Prop> = ({
  title,
  subTitle,
  Dropdown,
  TabOK = true,
  leftTab,
  rightTab,
  children,
  TabOnclick,
}) => {
  return (
    <div className="min-w-fit min-h-full h-dvh px-6 py-3 bg-primary-1200">
      <Header />
      <div className="py-3">
        <div className="flex items-center gap-3 font-sans">
          <div className="text-sub-title1-M">{title}</div>
          <div className="text-sun-title3-M text-neutral-300">{subTitle}</div>
        </div>
        {Dropdown && <div>{Dropdown}</div>}
        <div className="flex flex-col gap-6">
          {TabOK && (
            <Tab
              firstText={leftTab || "Left Tab"}
              SecondText={rightTab || "Right Tab"}
              onClick={TabOnclick}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackGround;
