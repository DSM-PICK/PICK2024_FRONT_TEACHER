"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import arrow from "@/assets/svg/chevron-right.svg";
import downarrow from "@/assets/svg/downarrow.svg";

interface DropdownProp {
  type: "grade" | "class" | "floor" | "classTime" | "club" | "all";
  onChange: (selectedOption: any, type: string) => void;
}

const Dropdown: React.FC<DropdownProp> = ({ type, onChange }) => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<number>(1);
  const [selectedClassOption, setSelectedClassOption] = useState<number>(1);
  const [selectedFloorOption, setSelectedFloorOption] = useState<number>(2);
  const [selectedClubOption, setSelectedClubOption] =
    useState<string>("세미나실 2-1(대동여지도)");
  const [selectedAllOption, setSelectedAllOption] = useState<number>(1);
  const [selectedClassTime, setSelectedClassTime] = useState<number>(8);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: any) => {
    if (onChange) {
      onChange(option.value, type);
      switch (type) {
        case "grade":
          setSelectedGradeOption(option.value);
          break;
        case "all":
          setSelectedAllOption(option.value);
          break;
        case "class":
          setSelectedClassOption(option.value);
          break;
        case "classTime":
          setSelectedClassTime(option.value);
          break;
        case "club":
          setSelectedClubOption(option.label);
          break;
        case "floor":
          setSelectedFloorOption(option.value);
          break;
        default:
          break;
      }
    }
    setIsDropdownVisible(false);
  };

  const generateOptions = (options: any[]) => {
    return options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleOptionClick(option)}
        className="py-2 px-3 rounded"
      >
        {option.label}
      </div>
    ));
  };

  const floorOptions = [
    { value: 2, label: "2층" },
    { value: 3, label: "3층" },
    { value: 4, label: "4층" },
  ];

  const AllOption = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
    { value: 5, label: "전체" },
  ];

  const gradeOptions = [
    { value: 1, label: "1학년" },
    { value: 2, label: "2학년" },
    { value: 3, label: "3학년" },
  ];

  const classOptions = [
    { value: 1, label: "1반" },
    { value: 2, label: "2반" },
    { value: 3, label: "3반" },
    { value: 4, label: "4반" },
  ];

  const clubOptions = [
    { value: "대동여지도", label: "세미나실 2-1(대동여지도)" },
    { value: "DMS", label: "세미나실 2-2(DMS)" },
    { value: "gram", label: "세미나실 2-3(gram)" },
    { value: "Lift", label: "소개2실(Lift)" },
    { value: "Log", label: "세미나실 3-1(Log)" },
    { value: "은하", label: "세미나실 3-2(은하)" },
    { value: "PiCK", label: "세미나실 3-3(PiCK)" },
    { value: "어게인", label: "보안 1실(어게인)" },
    { value: "info", label: "보안 2실(info)" },
    { value: "TeamQSS", label: "세미나실 4-1(TeamQSS)" },
    { value: "NoNamed", label: "세미나실 4-2(NoNamed)" },
    { value: "Modeep", label: "세미나실 4-3(Modeep)" },
    { value: "자습", label: "자습" },
  ];

  const classTimeOption = [
    { value: 6, label: "6교시" },
    { value: 7, label: "7교시" },
    { value: 8, label: "8교시" },
    { value: 9, label: "9교시" },
    { value: 10, label: "10교시" },
  ];
  const options = () => {
    switch (type) {
      case "all":
        return AllOption;
      case "class":
        return classOptions;
      case "classTime":
        return classTimeOption;
      case "club":
        return clubOptions;
      case "floor":
        return floorOptions;
      case "grade":
        return gradeOptions;
      default:
        return [];
    }
  };

  return (
    <div className="relative w-auto" ref={dropdownRef}>
      <div
        className="group border whitespace-nowrap text-Button-ES w-max bg-white py-2 px-3 focus:border-primary-200 rounded-lg cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {type === "grade"
          ? `${selectedGradeOption}학년`
          : type === "class"
          ? `${selectedClassOption}반`
          : type === "floor"
          ? `${selectedFloorOption}층`
          : type === "all"
          ? selectedAllOption === 5
            ? `전체`
            : `${selectedAllOption}학년`
          : type === "classTime"
          ? `${selectedClassTime}교시`
          : `${selectedClubOption}`}
        <Image
          src={isDropdownVisible ? `${downarrow.src}` : `${arrow.src}`}
          alt="arrow"
          width={12}
          height={12}
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute h-auto max-h-72 shadow-md overflow-y-scroll bg-white border rounded-lg w-full text-caption3 z-20">
          {generateOptions(options())}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
