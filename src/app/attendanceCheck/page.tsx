"use client";
import { AttendanceSave, GetStudentsAttendance } from "@/api/attendanceCheck";
import { AfterStudent, AttendanceChack, ClubList } from "@/api/type";
import BackGround from "@/components/background";
import Button from "@/components/button";
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
  const { mutate: attendanceSave } = AttendanceSave();

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

  const AttandenceSaveFn = async () => {
    const updatedData: AttendanceChack[] = [];
    students?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      if (localData) {
        const parsedData = JSON.parse(localData);
        const studentData = {
          user_id: item.id,
          status_list: [
            parsedData[0],
            parsedData[1],
            parsedData[2],
            parsedData[3],
            parsedData[4],
          ],
        };
        updatedData.push(studentData);
      }
    });

    try {
      await attendanceSave(updatedData, {
        onSuccess: () => {
          alert("저장되었습니다");
        },
        onError: (error) => {
          alert(error.name);
        },
      });
      updatedData.forEach((item) => {
        localStorage.setItem(item.user_id, JSON.stringify(item.status_list));
      });
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
  }, [selectedGrade, selectedClass, selectClassTime]);

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
        {students?.map((item, index) => (
          <AfterList
            key={index}
            time={selectClassTime}
            name={getStudentString(item)}
            id={item.id}
            state1={item.status6}
            state2={item.status7}
            state3={item.status8}
            state4={item.status9}
            state5={item.status10}
            after
          />
        ))}
      </div>
    </BackGround>
  );
};

export default attendanceCheck;
