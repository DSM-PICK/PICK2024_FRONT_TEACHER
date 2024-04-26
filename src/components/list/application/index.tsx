"use client";
import { ReturnSchool } from "@/api/outList";
import Button from "@/components/button";
import StatusDrop from "@/components/dropdown/status";
import Modal from "@/components/modal";
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
  id,
  onClick,
  reason,
}) => {
  const { mutate: ReturnStudent } = ReturnSchool();
  const [click, setClick] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const onClickModal = () => {
    setModal(true);
  };

  const onCancelModal = () => {
    setModal(false);
  };

  const confirmReturn = async () => {
    try {
      await ReturnStudent(
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
    setModal(false);
  };

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
              <div className=" p-px">
                <div className="flex gap-2 w-14">
                  <Button
                    colorType="primary"
                    buttonSize="extraSmall"
                    onClick={onClickModal}
                  >
                    복귀
                  </Button>
                </div>
              </div>
            </>
          )}
          {type === "after" && <StatusDrop onChange={() => {}} state="출석" />}
          {modal && (
            <Modal
              heading1={`${name}의 외출을 끝내시겠습니까?`}
              type="button"
              buttonMessage="복귀"
              onCancel={onCancelModal}
              onConfirm={confirmReturn}
            />
          )}
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
