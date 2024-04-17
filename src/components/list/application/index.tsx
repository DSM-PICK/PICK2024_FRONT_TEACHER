"use client";
import { ReturnSchool } from "@/api/outList";
import Button from "@/components/button";
import React, { useState } from "react";

interface NonReturnProp {
  name: string;
  returnTime?: string;
  type: "application" | "early-return";
  id: string;
}

export const NonReturn: React.FC<NonReturnProp> = ({
  name,
  returnTime,
  type,
  id,
}) => {
  const { mutate: ReturnStudent } = ReturnSchool();
  const [selected, setSelected] = useState<boolean>(false);

  const confirmReturn = async () => {
    try {
      const result = await ReturnStudent(
        { id: id },
        {
          onSuccess: () => {
            location.reload();
            alert("복귀에 성공하셨습니다");
          },
          onError: () => {
            console.log("에러발생");
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" whitespace-nowrap min-w-fit gap-2 flex justify-between w-full items-center bg-white px-4 py-3 rounded-lg">
      <div className=" text-sub-title4-M">{name}</div>
      {type === "application" && (
        <>
          <div className=" text-caption2 text-neutral-400">
            {returnTime} 복귀 예정
          </div>
          <div className=" p-px">
            <div className="flex gap-2 w-14">
              <Button
                colorType="primary"
                buttonSize="extraSmall"
                onClick={confirmReturn}
              >
                복귀
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NonReturn;
