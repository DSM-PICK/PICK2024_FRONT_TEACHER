import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { FloorClass, changeClass } from "../type";
import { apiError } from "@/hook/errorHandling";
const { handleError } = apiError();

export const AcceptClassChange = (floor: number) => {
  return useQuery<FloorClass[]>({
    queryKey: ["AcceptClassChange", floor], // floor를 queryKey에 추가
    queryFn: async () => {
      const response = await instance.get(
        `/class-room/floor?floor=${floor}&status=QUIET`
      );
      return response.data;
    },
  });
};

export const AcceptClass = () => {
  return useMutation<void, Error, { status: string; id: string[] }>({
    mutationFn: async (param) => {
      try {
        await instance.patch(`/class-room/status`, {
          status: param.status,
          ids: param.id,
        });
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetFloor = () => {
  return useMutation<changeClass[], void, { floor: number }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${param.floor}&status=OK`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
