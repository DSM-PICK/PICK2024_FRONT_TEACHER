"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Input from "@/components/input";
import TextArea from "@/components/input/textarea";
import Button from "@/components/button";
import { BugPost, BugImg } from "@/api/bug/index";
import ImgModal from "@/components/modal/imgModal";
import BugReportImg from "@/assets/svg/bugreport.svg";

interface bugProp {
  title: string;
  content: string;
  file_name: string[];
}

const BugReport = () => {
  const { mutate: BugPostMutate } = BugPost();
  const { mutate: BugImgMutate } = BugImg();
  const [data, setData] = useState<bugProp>({
    title: "",
    content: "",
    file_name: [],
  });
  const [modal, setModal] = useState<boolean>(false);

  const handleContent = ({ text, name }: { text: string; name: string }) => {
    setData({ ...data, [name]: text });
  };

  const handleImgUpload = async (images: File[]) => {
    try {
      await BugImgMutate(
        { file: images },
        {
          onSuccess: (data) => {
            setData((prevData) => ({
              ...prevData,
              file_name: data,
            }));
          },
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const Bug = async () => {
    await BugPostMutate(data, {
      onSuccess: () => {
        alert("버그가 제보되었습니다.");
        setData({
          title: "",
          content: "",
          file_name: [],
        });
      },
      onError: () => {
        console.log("에러가 발생했습니다.");
      },
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col bg-primary-1200 px-6 py-3 gap-5 h-dvh">
        <div className="text-sub-title1-M">버그제보</div>
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-2">
            <div className="text-sub-title4-M">어디서 버그가 발생했나요?</div>
            <Input
              type="text"
              width="full"
              name="title"
              onChange={handleContent}
              value={data.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sub-title4-M">버그에 대해 설명해주세요</div>
            <TextArea
              type="text"
              name="content"
              width="full"
              height=""
              onChange={handleContent}
              value={data.content}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="mb-11">
              <>
                <p>버그 사진을 첨부해주세요</p>
                <label
                  htmlFor="file-input"
                  className="cursor-pointer flex flex-col p-8 justify-center items-center w-full h-max rounded-md bg-neutral-900 text-gray-500 mb-9"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <img src={BugReportImg.src} alt="bug report icon" />
                  <p>사진을 첨부해주세요</p>
                </label>
                <div
                  id="file-input"
                  className="hidden"
                  onChange={() => {
                    setModal(!modal);
                  }}
                />
              </>
            </div>
          </div>
          <ImgModal
            onClick={handleImgUpload}
            isOpen={modal}
            onClose={() => {
              setModal(!modal);
            }}
          />
        </div>
        <Button onClick={Bug} buttonSize="full" colorType="primary">
          버그 제보하기
        </Button>
      </div>
    </>
  );
};

export default BugReport;
