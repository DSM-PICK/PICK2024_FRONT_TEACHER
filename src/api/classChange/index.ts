import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { FloorClass, changeClass } from "../type";
import apiError from "@/hook/errorHandling";

export const AcceptClassChange = (floor: number) => {
  const { handleError } = apiError();
  return useQuery<FloorClass[]>({
    queryKey: ["AcceptClassChange", floor],
    queryFn: async () => {
      try {
        const response = await instance.get(
          `/class-room/floor?floor=${floor}&status=QUIET`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const AcceptClass = () => {
  const { handleError } = apiError();
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
  const { handleError } = apiError();
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
