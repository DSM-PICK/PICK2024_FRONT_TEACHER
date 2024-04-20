import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { FloorClass } from "../type";

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
        console.log(error);
      }
    },
  });
};
