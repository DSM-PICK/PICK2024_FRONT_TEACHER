import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";

interface BugProp {
  title: string;
  content: string;
  file_name: string;
}

export const BugPost = () => {
  return useMutation<void, Error, BugProp>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/bug/message`, {
          title: param.title,
          content: param.content,
          file_name: param.file_name,
        });
      } catch (error) {
        console.log("오류");
      }
    },
  });
};

export const BugImg = () => {
  return useMutation<string, Error, { file: File }>({
    mutationFn: async (param) => {
      try {
        const formData = new FormData();
        formData.append("file", param.file);
        const result = await instance.post(`/bug/upload`, formData);
        return result.data;
      } catch (error) {
        console.log(error);
        throw new Error("파일 업로드 중에 오류가 발생했습니다.");
      }
    },
  });
};
