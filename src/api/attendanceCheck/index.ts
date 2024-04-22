import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ClubList } from "../type";

export const GetStudentsAttendance = () => {
    return useMutation<ClubList[], Error, { grade: number; class: number }>({
      mutationFn: async (param) => {
        try {
          const response = await instance.get(
            `/attendance/grade?grade=${param.grade}&class_num=${param.class}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
    });
  };