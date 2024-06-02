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
  const { handleError } = apiError();
  return useQuery<ClubList[]>({
    queryKey: ["GetClubList", club],
    queryFn: async () => {
      try {
        const response = await instance.get(`/attendance/club?club=${club}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
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
  const { handleError } = apiError();
  return useQuery<Type[]>({
    queryKey: ["AllStudent"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/after/search`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
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
  const { handleError } = apiError();
  return useQuery<AfterStudent[]>({
    queryKey: ["GetAfterStudent"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/after/all`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
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
