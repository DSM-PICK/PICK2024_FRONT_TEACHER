"use client";
import StatusDrop from "@/components/dropdown/status";
import React, { useEffect, useState } from "react";

interface NonReturnProp {
  state1: string;
  state2: string;
  state3: string;
  state4: string;
  state5: string;
  id: string;
  onClick?: () => void;
  after?: boolean;
  name: string;
  time?: number;
  class_name?: string;
}

export const AfterList = ({
  state1,
  state2,
  state3,
  state4,
  state5,
  time,
  id,
  onClick,
  name,
  class_name,
}: NonReturnProp) => {
  const Change = (item: string) => {
    switch (item) {
      case "ATTENDANCE":
        return "출석";
      case "MOVEMENT":
        return "이동";
      case "GO_OUT":
        return "외출";
      case "DISALLOWED":
        return "무단";
      case "PICNIC":
        return "현체";
      case "EMPLOYMENT":
        return "취업";
      default:
        return "";
    }
  };

  const [statusList, setStatusList] = useState<string[]>([]);

  useEffect(() => {
    setStatusList([state1, state2, state3, state4, state5]);
  }, [state1, state2, state3]);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(statusList));
  }, [id, statusList]);

  const handleChange = (index: number, newState: string) => {
    const newStatusList = [...statusList];
    newStatusList[index] = newState;
    setStatusList(newStatusList);
  };

  const ClassCheck = (newState: string) => {
    switch (time) {
      case 6:
        handleChange(0, newState);
        break;
      case 7:
        handleChange(1, newState);
        break;
      case 8:
        handleChange(2, newState);
        break;
      case 9:
        handleChange(3, newState);
        break;
      case 10:
        handleChange(4, newState);
        break;
      default:
        break;
    }
  };

  const changeProp = () => {
    switch (time) {
      case 6:
        return state1;
      case 7:
        return state2;
      case 8:
        return state3;
      case 9:
        return state4 || "";
      case 10:
        return state5 || "";
      default:
        return "";
    }
  };

  return (
    <div onClick={onClick}>
      <div
        className={`min-w-fit gap-2 flex justify-between w-full bg-white px-4 py-3 rounded-lg flex-col`}
      >
        <div className=" whitespace-nowrap min-w-fit gap-2 items-center flex justify-between w-full rounded-lg">
          <div className=" flex whitespace-nowrap gap-2 items-center justify-between">
            <div className=" text-sub-title4-M">{name}</div>
            {class_name === "" || class_name === "null" ? (
              ""
            ) : (
              <div className=" border border-primary-400 px-2 py-1 rounded-2xl bg-primary-400 text-body3 text-white">
                {class_name}
              </div>
            )}
          </div>
          <StatusDrop onChange={ClassCheck} state={Change(changeProp())} />
        </div>
      </div>
    </div>
  );
};

export default AfterList;
