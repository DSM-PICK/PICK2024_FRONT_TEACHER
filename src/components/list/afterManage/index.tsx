"use client";
import StatusDrop from "@/components/dropdown/status";
import useAttendanceStore from "@/stores/useChangeStatus";
import React, { useEffect, useState } from "react";

interface NonReturnProp {
  state: string;
  id: string;
  onClick?: () => void;
  after?: boolean;
  name: string;
  class_name?: string;
}

export const AfterList = ({
  state,
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
      case "GO_HOME":
        return "귀가";
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

  const { addStudent, getStatus } = useAttendanceStore();

  const handleChange = (newState: string) => {
    addStudent(id, newState);
  };

  return (
    <div onClick={onClick}>
      <div
        className={`min-w-fit gap-2 flex justify-between w-full bg-white px-4 py-3 rounded-lg flex-col`}
      >
        <div className="whitespace-nowrap min-w-fit gap-2 items-center flex justify-between w-full rounded-lg">
          <div className="flex whitespace-nowrap gap-2 items-center justify-between">
            <div className="text-sub-title4-M">{name}</div>
            {class_name === "" ? (
              ""
            ) : (
              <div className="border border-primary-400 px-2 py-1 rounded-2xl bg-primary-400 text-body3 text-white">
                {class_name}
              </div>
            )}
          </div>
          <StatusDrop onChange={handleChange} state={Change(state)} />
        </div>
      </div>
    </div>
  );
};

export default AfterList;
