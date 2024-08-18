"use client";
import { GetStudentsAttendance } from "@/api/attendanceCheck";
import { FixStatus } from "@/api/afterManage";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import AfterList from "@/components/list/afterManage";
import { getStudentString } from "@/util/util";
import { useState } from "react";
import useAttendanceStore from "@/stores/useChangeStatus";

const attendanceCheck = () => {
  const [selectClassTime, setSelectClassTime] = useState<number>(8);
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const { data: GetStudent, refetch: ReGetStudent } = GetStudentsAttendance(
    selectedGrade,
    selectedClass,
    selectClassTime
  );
  const { mutate: attendanceSave } = FixStatus();
  const { students } = useAttendanceStore();

  const handleGradeChange = (selectedOption: number) => {
    setSelectedGrade(selectedOption);
  };

  const handleClassChange = (selectedOption: number) => {
    setSelectedClass(selectedOption);
  };

  const handleClassTimeChange = (selectedOption: number) => {
    setSelectClassTime(selectedOption);
  };

  const AttandenceSaveFn = async () => {
    attendanceSave(
      { period: selectClassTime, data: students },
      {
        onSuccess: () => {
          alert("변경되었습니다");
          ReGetStudent();
        },
      }
    );
  };

  return (
    <BackGround
      title="출석 체크"
      TabOK={false}
      Dropdown={
        <div className="flex justify-between">
          <div className=" flex gap-3">
            <Dropdown onChange={handleGradeChange} type="grade" />
            <Dropdown onChange={handleClassChange} type="class" />
            <Dropdown onChange={handleClassTimeChange} type="classTime" />
          </div>
          <div className=" w-16 flex">
            <Button
              colorType="primary"
              onClick={AttandenceSaveFn}
              buttonSize="extraSmall"
            >
              저장
            </Button>
          </div>
        </div>
      }
      TabOnclick={() => {}}
    >
      <div className=" flex flex-col gap-4 h-full">
        {GetStudent?.map((item, index) => (
          <AfterList
            key={index}
            name={getStudentString(item)}
            id={item.id}
            state={item.status}
            after
            class_name={item.classroom_name}
          />
        ))}
      </div>
    </BackGround>
  );
};

export default attendanceCheck;
