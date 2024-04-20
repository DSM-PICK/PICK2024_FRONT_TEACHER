"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import outGoingImg from "@/assets/svg/outGoing.svg";
import applicationImg from "@/assets/svg/application.svg";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { CountOutList } from "@/api/main";
import { CountOutListType } from "@/api/type";

interface checkPageType {
  type: "outGoing" | "homecoming";
}

const CheckPage = ({ type }: checkPageType) => {
  const [list, setList] = useState<CountOutListType>({
    out: 0,
    request: 0,
    classMove: 0,
  });
  const router = useRouter();
  const { data: countOutList } = CountOutList();

  useEffect(() => {
    if (countOutList) {
      setList(countOutList);
    }
  }, [countOutList]);

  return (
    <>
      {type === "outGoing" ? (
        <div className=" rounded-xl w-full h-62 bg-white flex flex-col items-center gap-3">
          <div className=" text-neutral-50 text-sub-title4-M text-center px-4 pt-6">
            현재 외출 중인 학생은 총{" "}
            <span className=" text-primary-500">{list.out}명</span>입니다.
          </div>
          <Image src={outGoingImg} alt="" />
          <Button
            colorType="primary"
            buttonSize="extraSmall"
            onClick={() => router.push("/outList")}
          >
            외출자 확인
          </Button>
        </div>
      ) : (
        <div className=" rounded-xl w-full h-62 bg-white flex flex-col items-center gap-3">
          <div className=" text-neutral-50 text-sub-title4-M text-center px-2 pt-6">
            현재 외출/귀가 신청 학생은 총{" "}
            <span className=" text-secondary-300">{list.request}명</span>입니다.
          </div>
          <Image src={applicationImg} alt="" />
          <Button
            colorType="tertiary"
            buttonSize="extraSmall"
            onClick={() => router.push("/")}
          >
            출결 상태 확인
          </Button>
        </div>
      )}
    </>
  );
};

export default CheckPage;
