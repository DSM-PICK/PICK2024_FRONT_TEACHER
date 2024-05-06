import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { Accept, ClassProp, applicationOK, earlyReturnHome } from "../type";
import { apiError } from "@/hook/errorHandling";
const { handleError } = apiError();

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
        handleError(error);
      }
    },
  });
};

export const GetClass = () => {
  return useMutation<applicationOK[], Error, ClassProp>({
    mutationFn: async (param: ClassProp) => {
      try {
        const response = await instance.get(
          `${param.type}/grade?grade=${param.grade}&class_num=${param.class}`
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
export const OutAcceptApi = () => {
  return useMutation<void, Error, Accept>({
    mutationFn: async (param) => {
      try {
        const response = await instance.patch(`${param.type}/status`, {
          type: param.type,
          status: param.status,
          ids: param.ids,
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
