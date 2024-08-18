import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ClubList } from "../type";
import apiError from "@/hook/errorHandling";

export const GetStudentsAttendance = (
  grade: number,
  class_num: number,
  period: number
) => {
  const { handleError } = apiError();
  return useQuery({
    queryKey: [GetStudentsAttendance, grade, class_num, period],
    queryFn: async () => {
      try {
        const { data } = await instance.get<ClubList[]>(
          `/attendance/grade?grade=${grade}&class_num=${class_num}&period=${period}`
        );
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
