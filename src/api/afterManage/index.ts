import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import {
  AfterStudent,
  ChangeClub,
  ChangeStatus,
  ClubList,
  Type,
} from "../type";
import apiError from "@/hook/errorHandling";

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
  const { handleError } = apiError();
  return useMutation<void, Error, ChangeStatus[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/attendance/modify`, param);
      } catch (error) {
        handleError(error);
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

export const PostStudent = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { student_num: string }[]>({
    mutationFn: async (param) => {
      try {
        await instance.post(`/after`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetAfterStudent = () => {
  return useQuery<AfterStudent[]>({
    queryKey: ["GetAfterStudent"],
    queryFn: async () => {
      const response = await instance.get(`/after/all`);
      return response.data;
    },
  });
};

export const AfterStudentDelete = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      try {
        await instance.delete(`/after/delete`, {
          data: {
            id,
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to delete student.");
      }
    },
  });
};

export const CheckStatus = () => {
  const { handleError } = apiError();
  return useMutation<void, Error, ChangeClub[]>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/attendance/modify`, param);
      } catch (error) {
        handleError(error);
      }
    },
  });
};
