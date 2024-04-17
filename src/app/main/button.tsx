"use client";
import Image from "next/image";

interface buttonProps {
  name: "외출 수락" | "방과후 관리" | "출석 체크" | "교실 이동";
  img: string;
}

const Button: React.FC<buttonProps> = ({ name, img }) => {
  return (
    <div className=" flex flex-col items-center gap-2">
      <Image
        src={img}
        alt=""
        width={60}
        height={60}
        className="bg-white rounded-2xl"
      />
      <div className=" text-label2">{name}</div>
    </div>
  );
};

export default Button;
