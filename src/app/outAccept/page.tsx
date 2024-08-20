"use client";
import { OutAcceptApi, GetClass } from "@/api/outList";
import { applicationOK } from "@/api/type";
import BackGround from "@/components/background";
import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import NonReturn from "@/components/list/application";
import Modal from "@/components/modal";
import useAccepListSelection from "@/hook/handleAcceptListClick";
import { getFullToday } from "@/util/date";
import { getStudentString } from "@/util/util";
import React, { useEffect, useState } from "react";

const OutAccept = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [applicationData, setApplicationData] = useState<applicationOK[]>();
  const [selectGrade, setSelectGrade] = useState<number>(5);
  const [selectClass, setSelectClass] = useState<number>(5);
  const [acmodal, setAcModal] = useState<boolean>(false);
  const [nomodal, setNomodal] = useState<boolean>(false);
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAccepListSelection();
  const { mutate: outAcceptMutate } = GetClass();
  const { mutate: AcceptMutate } = OutAcceptApi();

  useEffect(() => {
    AcceptDataList();
    setApplicationData([]);
  }, [selectedTab]);

  useEffect(() => {
    AcceptDataList();
  }, [selectGrade, selectClass]);

  useEffect(() => {
    const grade = parseInt(localStorage.getItem("grade") || "1", 10);
    const class_num = parseInt(localStorage.getItem("class_num") || "1", 10);
    const setgrade = grade === 0 ? 5 : grade;
    const setclass_num = class_num === 0 ? 5 : class_num;
    setSelectGrade(setgrade);
    setSelectClass(setclass_num);
  }, []);

  const handleGradeChange = (selectedOption: number) => {
    if (selectedOption === 5) {
      setSelectGrade(5);
      setSelectClass(5);
    } else {
      setSelectGrade(selectedOption);
    }
  };

  const acceptColor = () => {
    if (selectedStudents.length === 0) {
      return "solidDisabled";
    }
    return "primary";
  };

  const refuseColor = () => {
    if (selectedStudents.length === 0) {
      return "ghostDisabled";
    }
    return "red";
  };

  const handleClassChange = (selectedOption: number) => {
    if (selectGrade === 5) {
      alert("학년을 선택해주세요");
      setSelectClass(selectedOption);
    } else {
      setSelectClass(selectedOption);
    }
  };

  const AcceptDataList = async () => {
    try {
      if (selectGrade && selectClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await outAcceptMutate(
          {
            type: reqOption,
            grade: selectGrade,
            class: selectClass,
          },
          {
            onSuccess: (data) => {
              setApplicationData(data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      }
    } catch (error) {
      console.error("Out accept error", error);
    }
  };

  const Accept = () => {
    if (selectedStudents.length === 0) {
      alert("외출 수락 할 학생을 선택해주세요");
    } else setAcModal(true);
  };

  const No = () => {
    if (selectedStudents.length === 0) {
      alert("외출 거절 할 학생을 선택해주세요");
    } else setNomodal(true);
  };

  const onCancel = () => {
    setAcModal(false);
    setNomodal(false);
  };

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  const confirmReturn = async () => {
    try {
      if (selectGrade && selectClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await AcceptMutate(
          {
            type: reqOption,
            status: "NO",
            ids: selectedStudents,
          },
          {
            onSuccess: () => {
              location.reload();
              setNomodal(false);
            },
            onError: (error) => {
              console.error("Out accept error", error);
              setNomodal(false);
            },
          }
        );
      }
    } catch (error) {
      alert("외출 거절에 실패하였습니다");
      setNomodal(false);
    }
  };

  const Acceptconfirm = async () => {
    try {
      if (selectGrade && selectClass) {
        const reqOption = selectedTab ? "application" : "early-return";
        await AcceptMutate(
          {
            type: reqOption,
            status: "OK",
            ids: selectedStudents,
          },
          {
            onSuccess: () => {
              location.reload();
              setAcModal(false);
            },
            onError: (error) => {
              console.error("Out accept error", error);
              setAcModal(false);
            },
          }
        );
      }
    } catch (error) {
      alert("외출 수락에 실패하였습니다");
      setAcModal(false);
    }
  };

  return (
    <BackGround
      title="외출자 수락"
      subTitle={getFullToday()}
      TabOK={true}
      leftTab="외출"
      rightTab="조기귀가"
      TabOnclick={onClickTab}
      Dropdown={
        <div className=" flex w-full justify-between min-w-fit items-center gap-1">
          <div className=" flex gap-2">
            <Dropdown type="all" onChange={handleGradeChange} homeRoom={true} />
            <Dropdown
              type="class"
              onChange={handleClassChange}
              homeRoom={true}
            />
          </div>
          <div className=" flex gap-2 w-32">
            <Button
              colorType={refuseColor()}
              buttonSize="extraSmall2"
              onClick={No}
            >
              거절
            </Button>
            <Button
              colorType={acceptColor()}
              buttonSize="extraSmall2"
              onClick={Accept}
            >
              수락
            </Button>
          </div>
        </div>
      }
    >
      <div className=" overflow-y-scroll gap-4 flex flex-col">
        {selectedTab
          ? applicationData?.map((item, index) => (
              <NonReturn
                id={item.user_id}
                type="accept"
                key={index}
                returnTime={`${item.start_time}~${item.end_time}`}
                name={getStudentString(item)}
                onClick={() => handleAcceptListClick(item.id, item.username)}
                reason={item.reason}
              />
            ))
          : applicationData?.map((item, index) => (
              <NonReturn
                id={item.user_id}
                type="accept"
                key={index}
                returnTime={`${item.start_time}~`}
                name={getStudentString(item)}
                onClick={() =>
                  handleAcceptListClick(item.user_id, item.username)
                }
                reason={item.reason}
              />
            ))}
      </div>
      {acmodal && (
        <Modal
          type="button"
          buttonMessage="수락"
          onConfirm={Acceptconfirm}
          onCancel={onCancel}
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
        />
      )}
      {nomodal && (
        <Modal
          type="button"
          buttonMessage="거절"
          onConfirm={confirmReturn}
          onCancel={onCancel}
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
        />
      )}
    </BackGround>
  );
};

export default OutAccept;
