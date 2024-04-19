"use client";
import { FixStatus, GetClubList } from "@/api/afterManage";
import { ChangeStatus, ClubList } from "@/api/type";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import AfterList from "@/components/list/afterManage";
import { getStudentString } from "@/util/util";
import { useEffect, useState } from "react";

const AfterManage = () => {
  const [clubList, setClubList] = useState<ClubList[]>([]);
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [selectClassTime, setSelectClassTime] = useState<number>(8);
  const [selectClub, setSelectClub] = useState<string>("대동여지도");
  const { data: getClub } = GetClubList(selectClub);
  const { mutate: changeStatus } = FixStatus();

  const handleSaveModalConfirm = () => {
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
    changeStatus(updatedData);
  };

  useEffect(() => {
    if (getClub) {
      setClubList(getClub);
    }
  }, [getClub]);

  const handleClubChange = (selectedOption: string) => {
    setSelectClub(selectedOption);
  };

  const handleClassTimeChange = (selectedOption: number) => {
    setSelectClassTime(selectedOption);
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  return (
    <BackGround
      title="방과후 관리"
      TabOK={true}
      leftTab="전공 동아리"
      rightTab="방과후(창조실)"
      Dropdown={
        <div className="flex gap-2">
          <Dropdown type="club" onChange={handleClubChange} />
          <Dropdown type="classTime" onChange={handleClassTimeChange} />
        </div>
      }
      TabOnclick={onClickTab}
    >
      <div className="overflow-y-scroll h-96 flex flex-col gap-4">
        {selectedTab &&
          clubList.map((item, index) => (
            <AfterList
              key={index}
              time={selectClassTime}
              name={getStudentString(item)}
              id={item.id}
              state1={item.status6}
              state2={item.status7}
              state3={item.status8}
            />
          ))}
      </div>
      <div className="absolute bottom-4% w-5/6 left-50%">
        <Button
          colorType="primary"
          onClick={handleSaveModalConfirm}
          buttonSize="full"
        >
          출결 저장하기
        </Button>
      </div>
    </BackGround>
  );
};

export default AfterManage;
