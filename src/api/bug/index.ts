import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import apiError from "@/hook/errorHandling";

interface BugProp {
  title: string;
  content: string;
  file_name: string;
}

export const BugPost = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, BugProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/bug/message`, {
          title: param.title,
          content: param.content,
          file_name: param.file_name,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const BugImg = () => {
  const { handleError } = apiError();
  return useMutation<string, Error, { file: File }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        formData.append("file", param.file);
        const result = await instance.post(`/bug/upload`, formData);
        return result.data;
      } catch (error) {
        handleError(error);
        throw new Error("파일 업로드 중에 오류가 발생했습니다.");
      }
    },
  });
};
