"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pick from "@/assets/PiCKLogo.svg";
import { useRouter } from "next/navigation";

const Header: NextPage = ({}) => {
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("name");
    setTeacherName(name);
  }, []);

  if (teacherName === "영양사") {
    router.push(`/WeekendMeals/all`);
  } else if (teacherName === "지킴이") {
    router.push(`/outList`);
  }

  return (
    <div className="flex justify-between items-center py-1 ">
      <Link href={"/main"}>
        <Image src={pick} alt="" width={42} />
      </Link>
      <div className="flex font-sans text-nowrap text-sub-title4-M text-neutral-50">
        {teacherName ? `${teacherName}선생님` : "선생님"}
      </div>
    </div>
  );
};
export default Header;
