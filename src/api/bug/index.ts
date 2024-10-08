import { useMutation } from "@tanstack/react-query";
import { instance } from "..";
import apiError from "@/hook/errorHandling";

interface BugProp {
  title: string;
  content: string;
  file_name: string[];
}

export const BugPost = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, BugProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/bug/message`, {
          title: param.title,
          content: param.content,
          model: "WEB",
          file_name: param.file_name,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const BugImg = () => {
  return useMutation<string[], Error, { file: File[] }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        param.file.forEach((file) => {
          formData.append("file", file);
        });
        const result = await instance.post(`/bug/upload`, formData);
        return result.data;
      } catch (error) {
        alert("이미지 용량이 너무 큽니다");
        throw new Error("파일 업로드 중에 오류가 발생했습니다.");
      }
    },
  });
};
