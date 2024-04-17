import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { applicationOK, earlyReturnHome } from "../type";

export const Application = () => {
  return useQuery<applicationOK[]>({
    queryKey: ["outList"],
    queryFn: async () => {
      const response = await instance.get(`application/non-return`);
      return response.data;
    },
  });
};

export const EarlyReturn = () => {
  return useQuery<earlyReturnHome[]>({
    queryKey: ["earlyReturn"],
    queryFn: async () => {
      const response = await instance.get(`early-return/ok`);
      return response.data;
    },
  });
};

export const ReturnSchool = () => {
  return useMutation<Error, void, { id: string }>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(
          `/application/change/${param.id}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
