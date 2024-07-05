"use client";
import Header from "@/components/header";
import Button from "../../components/main/button";
import { useEffect, useState } from "react";
import CheckPage from "../../components/main/checkPage";
import { GetName, GetTodaydirector } from "@/api/main";
import { getToday, getWeekDay } from "@/util/date";
import AfterManageImg from "@/assets/svg/aferManege.svg";
import attendanceImg from "@/assets/svg/attendance.svg";
import outingImg from "@/assets/svg/outing.svg";
import moveClassImg from "@/assets/svg/moveClass.svg";
import BugImg from "@/assets/svg/bug.svg";
import Survey from "@/components/survey";

const Main = () => {
  const [floor, setFloor] = useState<string>();
  const [surveyModal, setSurveyModal] = useState<boolean>(false);
  const { data: getDirector } = GetTodaydirector();
  GetName();

  useEffect(() => {
    if (getDirector) setFloor(getDirector);
  }, [getDirector]);

  useEffect(() => {
    const check = localStorage.getItem("survey");
    if (check !== "OK") {
      setSurveyModal(true);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="bg-primary-1200 flex flex-col gap-9 items-center px-6 h-dvh pt-7">
        <div className="flex w-full justify-between">
          <Button src="/outAccept" name="외출 수락" img={outingImg} />
          <Button src="/afterManage" name="방과후 출결" img={AfterManageImg} />
          <Button src="/attendanceCheck" name="출석 체크" img={attendanceImg} />
          <Button src="/classChange" name="교실 이동" img={moveClassImg} />
          <Button src="/BugReport" name="버그 제보" img={BugImg} />
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
        {surveyModal && (
          <Survey
            onClick={() => {
              setSurveyModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Main;
