"use client";
import { GetStudentsAttendance } from "@/api/attendanceCheck";
import { AfterStudent, ClubList } from "@/api/type";
import BackGround from "@/components/background";
import Dropdown from "@/components/dropdown";
import AfterList from "@/components/list/afterManage";
import { getStudentString } from "@/util/util";
import { useEffect, useState } from "react";

const attendanceCheck = () => {
  const [students, setStudents] = useState<ClubList[]>([]);
  const [selectClassTime, setSelectClassTime] = useState<number>(8);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { mutate: getStudentsAttendance } = GetStudentsAttendance();

  const handleGradeChange = (selectedOption: number) => {
    setStudents([]);
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setStudents([]);
    setSelectedClass(selectedOption);
  };

  const handleClassTimeChange = (selectedOption: number) => {
    setSelectClassTime(selectedOption);
  };

  const Check = async () => {
    try {
      await getStudentsAttendance(
        {
          grade: selectedGrade,
          class: selectedClass,
        },
        {
          onSuccess: (data) => {
            setStudents(data);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
    Check();
  }, [selectedGrade, selectedClass]);

  return (
    <BackGround
      title="출석 체크"
      TabOK={false}
      Dropdown={
        <div className="flex">
          <Dropdown onChange={handleGradeChange} type="grade" />
          <Dropdown onChange={handleClassChange} type="class" />
          <Dropdown onChange={handleClassTimeChange} type="classTime" />
        </div>
      }
      TabOnclick={() => {}}
    >
      <div className=" flex flex-col gap-4 h-full">
        {students.map((item, index) => (
          <AfterList
            key={index}
            time={selectClassTime}
            name={getStudentString(item)}
            id={item.id}
            state1={item.status8}
            state2={item.status9}
            state3={item.status10}
            after={true}
          />
        ))}
      </div>
    </BackGround>
  );
};

export default attendanceCheck;
