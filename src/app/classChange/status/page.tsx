"use client";
import React, { useEffect } from "react";
import { getFullToday } from "@/util/date";
import { useState } from "react";
import Dropdown from "@/components/dropdown";
import { GetFloor } from "@/api/classChange";
import { getStudentString } from "@/util/util";
import BackGround from "@/components/background";
import ChangeClass from "@/components/classChange";
import { changeClass } from "@/api/type";

const ClassChangeOk = () => {
  const [floorData, setFloorData] = useState<changeClass[]>([]);
  const { mutate: changelistFloorMutate } = GetFloor();
  const [selectedFloor, setSelectedFloor] = useState<number>(5);

  const handleFloorChange = (selectedOption: number) => {
    setSelectedFloor(selectedOption);
  };

  useEffect(() => {
    ChangeClassDataFloor();
  }, [selectedFloor]);

  const ChangeClassDataFloor = async () => {
    try {
      if (selectedFloor) {
        await changelistFloorMutate(
          { floor: selectedFloor },
          {
            onSuccess: (data) => {
              setFloorData(data);
            },
            onError: (error) => {
              console.log(error);
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackGround
      title="교실이동"
      subTitle={getFullToday()}
      Dropdown={<Dropdown type="floor" onChange={handleFloorChange} />}
      TabOK={false}
      TabOnclick={() => {}}
    >
      {floorData?.map((item, index) => (
        <ChangeClass
          key={index}
          prevClass={`${item.grade}-${item.class_num}`}
          nextClass={item.classroom_name}
          student={getStudentString(item)}
        />
      ))}
    </BackGround>
  );
};

export default ClassChangeOk;
