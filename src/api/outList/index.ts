import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { Accept, ClassProp, applicationOK, earlyReturnHome } from "../type";
import apiError from "@/hook/errorHandling";

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
  const { handleError } = apiError();
  return useMutation<Error, void, string[]>({
    mutationFn: async (...param) => {
      try {
        console.log(param);
        const { data } = await instance.patch(`/application/return`, ...param, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetClass = () => {
  const { handleError } = apiError();
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
  const { handleError } = apiError();
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
