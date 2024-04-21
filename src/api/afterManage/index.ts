import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { ChangeStatus, ClubList, Type } from "../type";

export const GetClubList = (club: string) => {
  return useQuery<ClubList[]>({
    queryKey: ["GetClubList", club],
    queryFn: async () => {
      const response = await instance.get(`/attendance/club?club=${club}`);
      return response.data;
    },
  });
};

export const FixStatus = () => {
  return useMutation<void, Error, ChangeStatus[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/attendance/modify`, param);
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const AllStudent = () => {
  return useQuery<Type[]>({
    queryKey: ["AllStudent"],
    queryFn: async () => {
      const response = await instance.get(`/after/search`);
      return response.data;
    },
  });
};
