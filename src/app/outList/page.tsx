"use client";
import { EarlyReturn, OutFloorList, ReturnSchool } from "@/api/outList";
import { applicationOK } from "@/api/type";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import NonReturn from "@/components/list/application";
import Modal from "@/components/modal";
import useAcceptListSelection from "@/hook/handleAcceptListClick";
import { getFullToday } from "@/util/date";
import { getStudentString } from "@/util/util";
import React, { useEffect, useState } from "react";

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();
  const [modal, setModal] = useState<boolean>(false);
  const [selectedFloor, setSelectedFloor] = useState<number>(5);
  const [data, setData] = useState<applicationOK[]>([]);

  const { mutate: floorData } = OutFloorList();
  const { data: earlyReturnData } = EarlyReturn();
  const { mutate: ReturnApplication } = ReturnSchool();

  const GetFloorData = async () => {
    await floorData(
      { floor: selectedFloor, status: "OK" },
      {
        onSuccess: (data) => {
          setData(data);
        },
      }
    );
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    GetFloorData();
  }, [selectedFloor]);

  const Return = () => {
    ReturnApplication(selectedStudents, {
      onSuccess: () => {
        location.reload();
      },
      onError: () => {
        console.log("에러가 발생했습니다");
        setModal(false);
      },
    });
  };

  const handleFloorChange = (selectedOption: number) => {
    setSelectedFloor(selectedOption);
  };

  return (
    <BackGround
      title="외출자 목록"
      subTitle={getFullToday()}
      TabOK={true}
      leftTab="외출"
      rightTab="조기귀가"
      TabOnclick={onClickTab}
      Dropdown={
        selectedTab && (
          <div className=" flex justify-between items-center">
            <div>
              <Dropdown onChange={handleFloorChange} type="floor" />
            </div>
            <div className=" flex gap-2 w-32">
              <Button
                colorType="primary"
                buttonSize="extraSmall2"
                onClick={() => {
                  setModal(true);
                }}
              >
                복귀
              </Button>
            </div>
          </div>
        )
      }
    >
      <div className=" overflow-y-scroll gap-4 flex flex-col">
        {selectedTab ? (
          <>
            {data?.map((item, index) => (
              <NonReturn
                onClick={() => {
                  handleAcceptListClick(item.id, item.username);
                }}
                id={item.id}
                type="application"
                key={index}
                returnTime={item.end}
                name={getStudentString(item)}
                reason={item.reason}
              />
            ))}
          </>
        ) : (
          earlyReturnData?.map((item, index) => (
            <NonReturn
              id={item.id}
              key={index}
              name={getStudentString(item)}
              type="early-return"
              reason={item.reason}
            />
          ))
        )}
      </div>
      {modal && (
        <Modal
          type="button"
          buttonMessage="확인"
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명을 복귀시키겠습니까?`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생을 복귀시키겠습니까?`
              : ""
          }`}
          onCancel={() => {
            setModal(false);
          }}
          onConfirm={Return}
        />
      )}
    </BackGround>
  );
};

export default OutList;
