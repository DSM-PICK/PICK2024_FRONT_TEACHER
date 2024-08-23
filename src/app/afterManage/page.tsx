"use client";
import {
  FixStatus,
  GetAfterStudent,
  GetClubList,
  PostStudent,
} from "@/api/afterManage";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import AfterList from "@/components/list/afterManage";
import AfterDelete from "@/components/list/delete";
import Modal from "@/components/modal";
import useAcceptListSelection from "@/hook/handleAcceptListClick";
import useAttendanceStore from "@/stores/useChangeStatus";
import { getStudentString, setStudentNum } from "@/util/util";
import { useState } from "react";

const AfterManage = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [modal, setMadal] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [selectClassTime, setSelectClassTime] = useState<number>(8);
  const [selectClub, setSelectClub] = useState<string>("대동여지도");
  const { data: getClub } = GetClubList(selectClub, selectClassTime);
  const { mutate: Post } = PostStudent();
  const { mutate: changeStatus } = FixStatus();
  const { data: getStudent, refetch: ReGetStudent } = GetAfterStudent();
  const { handleAcceptListClick } = useAcceptListSelection();
  const { students } = useAttendanceStore();

  const handleSaveClub = async () => {
    changeStatus(
      { period: selectClassTime, data: students },
      {
        onSuccess: () => {
          alert("상태가 변경되었습니다");
          ReGetStudent();
        },
      }
    );
    setEdit(false);
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
          getClub?.map((item, index) => (
            <AfterList
              key={index}
              name={getStudentString(item)}
              id={item.id}
              state={item.status}
              class_name={item.classroom_name}
            />
          ))
        ) : (
          <>
            {edit ? (
              <div className=" flex flex-col gap-8 w-full">
                {edit ? (
                  <>
                    {getStudent?.map((item, index) => {
                      return (
                        <AfterList
                          after={true}
                          key={index}
                          id={item.id}
                          state={item.status}
                          name={`${setStudentNum(item)} ${item.name}`}
                          class_name={item.classroom_name}
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
                {getStudent?.map((item, index) => (
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
              onClick={handleSaveClub}
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
