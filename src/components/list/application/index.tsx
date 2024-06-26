"use client";
import StatusDrop from "@/components/dropdown/status";
import React, { useState } from "react";

interface NonReturnProp {
  name: string;
  returnTime?: string;
  type: "application" | "early-return" | "accept" | "after";
  id: string;
  onClick?: () => void;
  reason: string;
}

export const NonReturn: React.FC<NonReturnProp> = ({
  name,
  returnTime,
  type,
  onClick,
  reason,
}) => {
  const [click, setClick] = useState<boolean>(false);

  return (
    <div onClick={onClick}>
      <div
        className={`min-w-fit gap-2 flex justify-between w-full bg-white px-4 py-3 rounded-lg flex-col ${
          click ? " border border-primary-500" : ""
        }`}
        onClick={() => setClick(!click)}
      >
        <div className=" whitespace-nowrap min-w-fit gap-2 items-center flex justify-between w-full rounded-lg">
          <div className=" text-sub-title4-M">{name}</div>
          {type === "application" && (
            <>
              <div className=" text-caption2 text-neutral-400">
                {returnTime} 복귀 예정
              </div>
            </>
          )}
          {type === "after" && <StatusDrop onChange={() => {}} state="출석" />}
          {type === "accept" && (
            <div className=" text-caption2 text-neutral-400">{returnTime}</div>
          )}
        </div>
        {type !== "after" && click && (
          <div className=" w-full  text-sub-title4-M">{reason}</div>
        )}
      </div>
    </div>
  );
};

export default NonReturn;
