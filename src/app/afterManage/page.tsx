"use client";
import {
  CheckStatus,
  FixStatus,
  GetAfterStudent,
  GetClubList,
  PostStudent,
} from "@/api/afterManage";
import { AfterStudent, ChangeClub, ChangeStatus, ClubList } from "@/api/type";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import AfterList from "@/components/list/afterManage";
import AfterDelete from "@/components/list/delete";
import Modal from "@/components/modal";
import { getStudentString, setStudentNum } from "@/util/util";
import { useEffect, useState } from "react";

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [modal, setMadal] = useState<boolean>(false);
  const [clubList, setClubList] = useState<ClubList[]>([]);
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [selectClassTime, setSelectClassTime] = useState<number>(8);
  const [selectClub, setSelectClub] = useState<string>("대동여지도");
  const [studentData, setStudentData] = useState<AfterStudent[]>();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);
  const { data: getClub } = GetClubList(selectClub);
  const { mutate: Post } = PostStudent();
  const { mutate: changeStatus } = FixStatus();
  const { data: getStudent } = GetAfterStudent();
  const { mutate: CulbCheck } = CheckStatus();

  const handleSaveClub = async () => {
    const updatedData: ChangeClub[] = [];
    studentData?.forEach((item) => {
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
      await changeStatus(updatedData, {
        onSuccess: () => {
          alert("상태가 변경되었습니다");
        },
        onError: (error) => {
          alert(error.name);
        },
      });
    } catch (error) {
      updatedData.forEach((item) => {
        localStorage.setItem(item.user_id, JSON.stringify(item.status_list));
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (getStudent) {
      setStudentData(getStudent);
    }
  }, [getStudent]);

  const handleSaveModalConfirm = () => {
    setEdit(false);
    const updatedData: ChangeStatus[] = [];
    clubList?.forEach((item) => {
      const localData = localStorage.getItem(item.id);
      if (localData) {
        const parsedData = JSON.parse(localData);
        const studentData = {
          user_id: item.id,
          status_list: [
            parsedData[0],
            parsedData[1],
            parsedData[2],
            parsedData[3] || "ATTENDANCE",
            parsedData[4] || "ATTENDANCE",
          ],
        };
        updatedData.push(studentData);
      }
    });
    CulbCheck(updatedData);
  };

  const onClickSave = () => {
    setEdit(true);
  };

  const handleModalConfirm = async () => {
    const localData = localStorage.getItem("students");
    const data = localData ? JSON.parse(localData) : [];
    const updatedData = data.map((item: string) => {
      const [studentNum] = item.split(" ");
      return {
        student_num: studentNum,
      };
    });
    Post(updatedData);
    location.reload();
    setMadal(false);
  };

  const handleAcceptListClick = (id: string, name: string) => {
    const selectedIndex = selectedStudents.indexOf(id);
    const isSelected = selectedIndex !== -1;
    if (isSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((studentId) => studentId !== id)
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter((studentName) => studentName !== name)
      );
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        id,
      ]);
      setSelectedStudentName((prevSelectedStudentName) => [
        ...prevSelectedStudentName,
        name,
      ]);
    }
  };

  useEffect(() => {
    setClubList([]);
    if (getClub) {
      setClubList(getClub);
    }
  }, [getClub]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("-")) {
        localStorage.removeItem(key);
      }
    });
  }, [selectClub]);

  const handleClubChange = (selectedOption: string) => {
    setSelectClub(selectedOption);
  };

  const handleClassTimeChange = (selectedOption: number) => {
    setSelectClassTime(selectedOption);
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const onAdd = () => {
    setMadal(true);
  };

  const onCancel = () => {
    setMadal(false);
    if (typeof window !== "undefined") {
      const localData = localStorage.removeItem("students");
      return localData;
    }
  };

  return (
    <BackGround
      title="방과후 관리"
      TabOK={true}
      leftTab="전공 동아리"
      rightTab="방과후(창조실)"
      Dropdown={
        <>
          {selectedTab ? (
            <div className="flex gap-2">
              <Dropdown type="club" onChange={handleClubChange} />
              <Dropdown type="classTime" onChange={handleClassTimeChange} />
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <Dropdown type="classTime" onChange={handleClassTimeChange} />
              <Button
                colorType="tertiary"
                buttonSize="extraSmall"
                onClick={onAdd}
              >
                인원 추가
              </Button>
            </div>
          )}
        </>
      }
      TabOnclick={onClickTab}
    >
      <div className="overflow-y-scroll h-80 flex flex-col gap-4">
        {selectedTab ? (
          clubList.map((item, index) => (
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
            />
          ))
        ) : (
          <>
            {edit ? (
              <div className=" flex flex-col gap-8 w-full">
                {edit ? (
                  <>
                    {studentData?.map((item, index) => {
                      return (
                        <AfterList
                          after={true}
                          key={index}
                          id={item.id}
                          state1={item.status1}
                          state2={item.status2}
                          state3={item.status3}
                          state4={item.status4}
                          state5={item.status5}
                          name={`${setStudentNum(item)} ${item.name}`}
                          onClick={() =>
                            handleAcceptListClick(item.id, item.name)
                          }
                          time={selectClassTime}
                        />
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <>
                {studentData?.map((item, index) => (
                  <AfterDelete student={item.name} key={index} id={item.id} />
                ))}
              </>
            )}
          </>
        )}

        {modal && (
          <Modal
            type="add"
            heading1=""
            buttonMessage="추가"
            onCancel={onCancel}
            onConfirm={handleModalConfirm}
          />
        )}
      </div>
      <div className="absolute bottom-4% w-5/6">
        {edit ? (
          selectedTab ? (
            <Button
              colorType="ghost"
              buttonSize="full"
              onClick={handleSaveModalConfirm}
            >
              출결 저장하기
            </Button>
          ) : (
            <Button
              colorType="ghost"
              buttonSize="full"
              onClick={handleSaveClub}
            >
              출결 저장하기
            </Button>
          )
        ) : selectedTab ? (
          <Button colorType="ghost" buttonSize="full" onClick={onClickSave}>
            출결 체크하기
          </Button>
        ) : (
          <Button colorType="ghost" buttonSize="full" onClick={handleSaveClub}>
            출결 저장하기
          </Button>
        )}
      </div>
    </BackGround>
  );
};

export default AfterManage;
