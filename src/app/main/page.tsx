"use client";
import Header from "@/components/header";
import Button from "./button";
import outAcceptImg from "@/assets/buttonImg/outing.svg";
import { useState } from "react";

const Main = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [name, setName] = useState("백승휘");
  const [floor, setFloor] = useState(2);
  return (
    <div className=" bg-primary-1200 flex flex-col items-center ">
      <Header />
      <div className=" flex w-full justify-evenly">
        <Button name="외출 수락" img={outAcceptImg} />
        <Button name="방과후 관리" img={outAcceptImg} />
        <Button name="출석 체크" img={outAcceptImg} />
        <Button name="교실 이동" img={outAcceptImg} />
      </div>
      <div className=" rounded-xl	w-80 h-20 bg-white">
        <div>{date}</div>
        {floor !== null ? (
          <div>
            {name} 선생님은 <span>{floor}층 자습감독</span>입니다.
          </div>
        ) : (
          <div>{name} 선생님은 자습감독이 아닙니다.</div>
        )}
      </div>
    </div>
  );
};

export default Main;
