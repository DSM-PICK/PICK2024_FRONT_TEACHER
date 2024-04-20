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

const ClassChange = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [data, setData] = useState<FloorClass[]>([]);
  const [accept, setAccept] = useState<boolean>(false);
  const [refuse, setRefuse] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);

  const { data: AccpetMutate } = AcceptClassChange(selectedFloor);
  const { mutate: AccpetList } = AcceptClass();

  const Accept = async () => {
    setAccept(true);
  };

  const Refuse = () => {
    setRefuse(true);
  };

  useEffect(() => {
    if (AccpetMutate) {
      setData(AccpetMutate);
    }
  }, [AccpetMutate]);

  const handleAcceptListClick = (id: string, name: string) => {
    const isStudentSelected = selectedStudents.includes(id);
    if (isStudentSelected) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((selectedStudent) => selectedStudent !== id)
      );
      setSelectedStudentName((prevSelectedStudentName) =>
        prevSelectedStudentName.filter(
          (selectedStudentName) => selectedStudentName !== name
        )
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
  const nav = useRouter();

  const handleFloorChange = (selectedOption: number) => {
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

  return (
    <BackGround
      TabOnclick={() => {}}
      TabOK={false}
      title="교실이동수락"
      subTitle={getFullToday()}
      Dropdown={
        <div className=" flex justify-between items-center">
          <div className="flex gap-5 items-center">
            {/* <Button
              colorType="ghost"
              buttonSize="small"
              onClick={() => {
                nav.push("/classChange/ok");
              }}
            >
              교실 이동 보기
            </Button> */}
            <Dropdown type="floor" onChange={handleFloorChange} />
          </div>
          <div className=" flex gap-2 w-32">
            <Button colorType="red" buttonSize="extraSmall2" onClick={Refuse}>
              거절
            </Button>
            <Button
              colorType="primary"
              buttonSize="extraSmall2"
              onClick={Accept}
            >
              수락
            </Button>
          </div>
        </div>
      }
    >
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
    </BackGround>
  );
};

export default ClassChange;