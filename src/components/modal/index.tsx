"use client";

import React, { useState, useEffect } from "react";
import Button from "../button";
//import AutoInput from "../input/auto/page";

interface ChangeProps {
  text: string;
  name: string;
}

interface ModalProps {
  heading1?: string;
  heading2?: string;
  type: "button" | "error" | "add";
  buttonMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
  name?: string;
  value?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  heading1,
  heading2,
  type,
  buttonMessage,
  onCancel,
  onConfirm,
  name,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [addstudent, setAddstudent] = useState({
    student: "",
  });

  const AutohandleChange = ({ text, name }: ChangeProps) => {
    setAddstudent({ ...addstudent, [name]: text });
    setInputValue(text);
  };

  const renderButtons = () => {
    return (
      <div className="flex gap-2">
        <Button colorType="ghost" buttonSize="small" onClick={onCancel}>
          취소
        </Button>
        <Button
          colorType={type === "error" ? "red" : "primary"}
          buttonSize="small"
          onClick={onConfirm}
        >
          {buttonMessage}
        </Button>
      </div>
    );
  };

  return (
    <div className=" inset-0 fixed flex items-center justify-center bg-gray-800 bg-opacity-30">
      {type === "button" || type === "error" ? (
        <div className=" z-10 bg-white rounded-xl px-5 py-6">
          <div className="flex flex-col gap-8 items-center">
            <div className="font-sans text-neutral-50 text-center  text-sub-title2-M">
              {heading1 && <div className="max-w-none">{heading1}</div>}
              {heading2 && <div className=" w-max">{heading2}</div>}
            </div>
            <div className="font-sans  text-label2 text-neutral-400 text-center">
              {buttonMessage}하기 선택하면 다시 변경할 수 없습니다.
            </div>
            {renderButtons()}
          </div>
        </div>
      ) : type === "add" ? (
        <div className=" z-10 bg-white rounded-xl px-5 py-6">
          <div className="flex flex-col gap-8 items-center">
            <div className=" text-neutral-50 text-center">
              {heading1 && (
                <div className=" flex flex-col gap-9 max-w-none items-center">
                  <div className=" text-sub-title2-M flex gap-2">
                    <div className=" text-purple-400">창조실</div> 인원추가
                  </div>
                  <div className=" w-full">
                    {/* <AutoInput
                      type="student"
                      placeholder="학번과 이름을 입력하세요"
                      width="full"
                      onChange={AutohandleChange}
                      value={addstudent.student}
                      name="student"
                    /> */}
                  </div>
                  {renderButtons()}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
