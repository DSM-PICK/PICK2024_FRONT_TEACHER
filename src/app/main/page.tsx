"use client";
import Header from "@/components/header";
import Button from "./button";
import outAcceptImg from "@/assets/svg/outing.svg";
import AfterManageImg from "@/assets/svg/afterManage.svg";
import { useEffect, useState } from "react";
import CheckPage from "./checkPage";
import { GetName, GetTodaydirector } from "@/api/main";
import { getToday, getWeekDay } from "@/util/date";
const Main = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [floor, setFloor] = useState<string>();
  const [name, setName] = useState<string>("");
  const { data: getName } = GetName();
  const { data: getDirector } = GetTodaydirector();

  useEffect(() => {
    if (getName) {
      setName(getName);
      localStorage.setItem("name", getName);
    }
    if (getDirector) setFloor(getDirector);
  }, [getName, getDirector]);

  return (
    <>
      <Header />
      <div className="bg-primary-1200 flex flex-col gap-9 items-center px-6 h-dvh">
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
          <div className=" text-sub-title3-M text-neutral-50">{floor}</div>
        </div>
        <div className="flex w-full gap-3">
          <CheckPage type="outGoing" />
          <CheckPage type="homecoming" />
        </div>
      </div>
    </>
  );
};

export default Main;
