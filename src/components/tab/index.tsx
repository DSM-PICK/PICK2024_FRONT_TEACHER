import React, { useState } from "react";

interface Tab {
  firstText: string;
  SecondText: string;
  onClick: (tab: boolean) => void;
}

const Tab: React.FC<Tab> = ({ firstText, SecondText, onClick }) => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  const selectTabClass = (tab: boolean) =>
    selectedTab === tab
      ? "font-sans text-sub-title3-B w-full border-b-1 border-primary-500 py-3 flex items-center justify-center select-none"
      : "font-sans text-sub-title3-B0 py-3 w-full flex items-center justify-center select-none";

  const handleTabClick = (tab: boolean) => {
    setSelectedTab(tab);
    onClick(tab);
  };

  return (
    <div className=" flex w-full justify-evenly ">
      <div
        className={`${selectTabClass(true)}`}
        onClick={() => handleTabClick(true)}
      >
        {firstText}
      </div>
      <div
        className={`${selectTabClass(false)}`}
        onClick={() => handleTabClick(false)}
      >
        {SecondText}
      </div>
    </div>
  );
};

export default Tab;
