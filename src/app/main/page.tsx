"use client";
import Header from "@/components/header";
import Button from "./button";
import outAcceptImg from "@/assets/svg/outing.svg";
import AfterManageImg from "@/assets/svg/afterManage.svg";
import { useEffect, useState } from "react";
import CheckPage from "./checkPage";
import { GetName } from "@/api/main";
import { getFullToday, getToday, getWeekDay } from "@/util/date";
import { get } from "http";

const Main = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [floor, setFloor] = useState(null);
  const [name, setName] = useState<string>();
  const { data: getName } = GetName();
  useEffect(() => {
    if (getName) {
      setName(getName);
    }
  }, [getName]);
  return (
    <>
      <Header />
      <div className="bg-primary-1200 flex flex-col items-center px-6">
        <div className="flex w-full justify-between">
          <Button src="/outAccept" name="외출 수락" img={outAcceptImg} />
          <Button src="/afterManage" name="방과후 관리" img={AfterManageImg} />
          <Button src="/" name="출석 체크" img={outAcceptImg} />
          <Button src="/classChange" name="교실 이동" img={outAcceptImg} />
        </div>
        <div className="rounded-xl	w-full h-auto bg-white gap-2 flex items-center flex-wrap px-5 py-3">
          <div className="text-sub-title4-M text-neutral-300">
            {getToday()} {getWeekDay()}요일
          </div>
          {floor !== null ? (
            <div className=" text-sub-title3-M text-neutral-50">
              {name} 선생님은{" "}
              <span className=" text-primary-500">{floor}층 자습감독</span>
              입니다.
            </div>
          ) : (
            <div className="text-sub-title3-M text-neutral-50">
              {name} 선생님은 자습감독이 아닙니다.
            </div>
          )}
        </div>
        <div className="flex w-full">
          <CheckPage type="outGoing" />
          <CheckPage type="homecoming" />
        </div>
      </div>
    </>
  );
};

export default Main;
