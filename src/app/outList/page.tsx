"use client";
import { Application, EarlyReturn } from "@/api/outList";
import { applicationOK, earlyReturnHome } from "@/api/type";
import BackGround from "@/components/background";
import NonReturn from "@/components/list/application";
import { getFullToday } from "@/util/date";
import { getStudentString } from "@/util/util";
import React, { useEffect, useState } from "react";

const OutList = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const [applicationData, setApplicationData] = useState<applicationOK[]>([]);
  const [earlyData, setEarlyData] = useState<earlyReturnHome[]>();

  const { data: applicationOKData } = Application();
  const { data: earlyReturnData } = EarlyReturn();

  useEffect(() => {
    if (applicationOKData) {
      setApplicationData(applicationOKData);
    }
  }, [applicationOKData]);

  useEffect(() => {
    setEarlyData(earlyReturnData);
  }, [earlyReturnData]);

  const onClickTab = (tab: boolean) => {
    setSelectedTab(tab);
  };

  return (
    <BackGround
      title="외출자 목록"
      subTitle={getFullToday()}
      TabOK={true}
      leftTab="외출"
      rightTab="조기귀가"
      TabOnclick={onClickTab}
    >
      <div className=" overflow-y-scroll gap-4 flex flex-col">
        {selectedTab
          ? Array.isArray(applicationData) && (
              <>
                {applicationData.map((item, index) => (
                  <NonReturn
                    id={item.id}
                    type="application"
                    key={index}
                    returnTime={item.end_time}
                    name={getStudentString(item)}
                    reason={item.reason}
                  />
                ))}
              </>
            )
          : earlyData?.map((item, index) => (
              <NonReturn
                id={item.id}
                key={index}
                name={getStudentString(item)}
                type="early-return"
                reason={item.reason}
              />
            ))}
      </div>
    </BackGround>
  );
};

export default OutList;
