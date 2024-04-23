"use client";
import Image from "next/image";
import Link from "next/link";

interface buttonProps {
  name: "외출 수락" | "방과후 출결" | "출석 체크" | "교실 이동";
  img: string;
  src: string;
}

const Button = ({ name, img, src }: buttonProps) => {
  return (
    <Link href={src} className=" flex flex-col items-center gap-2">
      <Image
        src={img}
        alt=""
        width={60}
        height={60}
        className="bg-white rounded-2xl"
      />
      <div className=" text-label2">{name}</div>
    </Link>
  );
};

export default Button;
