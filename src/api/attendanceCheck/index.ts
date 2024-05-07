import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { AttendanceChack, ClubList } from "../type";
import apiError from "@/hook/errorHandling";

export const GetStudentsAttendance = () => {
  const { handleError } = apiError();
  return useMutation<ClubList[], Error, { grade: number; class: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/attendance/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AttendanceSave = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, AttendanceChack[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch("/attendance/modify", param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};
