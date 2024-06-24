"use client";
import { getFullToday } from "@/util/date";
import BackGround from "@/components/background";
import Dropdown from "@/components/dropdown";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { getStudentString } from "@/util/util";
import Modal from "@/components/modal";
import { AcceptClass, AcceptClassChange } from "@/api/classChange";
import { FloorClass } from "@/api/type";
import ChangeClass from "@/components/classChange";
import useAcceptListSelection from "@/hook/handleAcceptListClick";

const ClassChange = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [data, setData] = useState<FloorClass[]>([]);
  const [accept, setAccept] = useState<boolean>(false);
  const [refuse, setRefuse] = useState<boolean>(false);
  const { selectedStudents, selectedStudentName, handleAcceptListClick } =
    useAcceptListSelection();

  const { data: AccpetMutate } = AcceptClassChange(selectedFloor);
  const { mutate: AccpetList } = AcceptClass();

  const router = useRouter();

  const Accept = async () => {
    if (selectedStudents.length === 0) {
      alert("교실 이동 수락 할 학생을 선택해 주세요");
    } else {
      setAccept(true);
    }
  };

  const Refuse = () => {
    if (selectedStudents.length === 0) {
      alert("교실 이동 거절 할 학생을 선택해 주세요");
    } else {
      setRefuse(true);
    }
  };

  useEffect(() => {
    if (AccpetMutate) {
      setData(AccpetMutate);
    }
  }, [AccpetMutate]);

  const nav = useRouter();

  const handleFloorChange = (selectedOption: number) => {
    setData([]);
    setSelectedFloor(selectedOption);
  };

  const closeModal = () => {
    setRefuse(false);
  };

  const AcceptrCancel = () => {
    setAccept(false);
  };

  const confirmReturn = async () => {
    try {
      await AccpetList(
        { status: "NO", id: selectedStudents },
        {
          onSuccess: () => {
            location.reload();
            alert("교실이동이 거절되었습니다.");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const Acceptconfirm = async () => {
    try {
      await AccpetList(
        { status: "OK", id: selectedStudents },
        {
          onSuccess: () => {
            location.reload();
            alert("교실이동이 수락되었습니다");
          },
        }
      );
    } catch (error) {
      console.log(error);
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

  return (
    <BackGround
      TabOnclick={() => {}}
      TabOK={false}
      title="교실 이동 수락"
      subTitle={getFullToday()}
      Dropdown={
        <div className=" flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Dropdown type="floor" onChange={handleFloorChange} />
          </div>
          <div className=" flex gap-2 w-32">
            <Button
              colorType={refuseColor()}
              buttonSize="extraSmall2"
              onClick={Refuse}
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
      <div className=" flex flex-col h-60dvh overflow-y-scroll gap-4">
        {data?.map((item, index) => (
          <ChangeClass
            type="accept"
            key={index}
            onClick={() => handleAcceptListClick(item.id, item.username)}
            prevClass={`${item.grade}-${item.class_num}`}
            nextClass={`${item.classroom_name}`}
            student={getStudentString(item)}
          />
        ))}
      </div>

      {refuse && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`교실이동을 거절하시겠습니까?`}
          type="error"
          buttonMessage="거절"
          onCancel={closeModal}
          onConfirm={confirmReturn}
        />
      )}
      {accept && (
        <Modal
          heading1={`${
            selectedStudentName.length > 1
              ? `${selectedStudentName[0]} 학생 외 ${
                  selectedStudentName.length - 1
                }명`
              : selectedStudentName.length === 1
              ? `${selectedStudentName[0]} 학생`
              : ""
          }`}
          heading2={`교실이동을 수락하시겠습니까?`}
          type="button"
          buttonMessage="수락"
          onCancel={AcceptrCancel}
          onConfirm={Acceptconfirm}
        />
      )}
      <div className=" absolute bottom-4% w-5/6">
        <Button
          onClick={() => {
            router.push("/classChange/status");
          }}
          colorType="primary"
          buttonSize="full"
        >
          전체 이동자 보기
        </Button>
      </div>
    </BackGround>
  );
};

export default ClassChange;
