"use client";
import Image from "next/image";
import { useState } from "react";
import outGoingImg from "@/assets/svg/outGoing.svg";
import applicationImg from "@/assets/svg/application.svg";
import Button from "@/components/button";

interface checkPageType {
  type: "outGoing" | "homecoming";
}

const CheckPage = ({ type }: checkPageType) => {
  const [out, setOut] = useState(0);
  const [sum, setSum] = useState(0);

  return (
    <>
      {type === "outGoing" ? (
        <div className=" rounded-xl w-42 h-62 bg-white flex flex-col items-center gap-4">
          <div className=" text-neutral-50 text-sub-title4-M text-center px-4 pt-6">
            현재 외출 중인 학생은 총 <span className=" text-primary-500">{out}명</span>입니다.
          </div>
          <Image src={outGoingImg} alt="" />
          <Button
            colorType="primary"
            buttonSize="extraSmall"
            onClick={() => {}}
          >
            외출자 확인
          </Button>
        </div>
      ) : (
        <div className=" rounded-xl w-42 h-62 bg-white flex flex-col items-center gap-4">
          <div className=" text-neutral-50 text-sub-title4-M text-center px-2 pt-6">
            현재 외출 / 조기 귀가 신청 학생은 총 <span className=" text-secondary-300">{sum}명</span>입니다.
          </div>
          <Image src={applicationImg} alt="" />
          <Button
            colorType="tertiary"
            buttonSize="extraSmall"
            onClick={() => {}}
          >
            출결 상태 확인
          </Button>
        </div>
      )}
    </>
  );
};

export default CheckPage;
