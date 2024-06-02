import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { CountOutListType } from "../type";
import apiError from "@/hook/errorHandling";

export const GetName = () => {
  const { handleError } = apiError();
  return useQuery<string>({
    queryKey: ["name"],
    queryFn: async () => {
      try {
        const result = await instance.get("/admin/my-name");
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("grade", JSON.stringify(result.data.grade));
        localStorage.setItem(
          "class_num",
          JSON.stringify(result.data.class_num)
        );
        return result.data.name;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const GetTodaydirector = () => {
  const { handleError } = apiError();
  return useQuery<string>({
    queryKey: ["director"],
    queryFn: async () => {
      try {
        const result = await instance.get("self-study/admin");
        return result.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};

export const CountOutList = () => {
  const { handleError } = apiError();
  return useQuery<CountOutListType>({
    queryKey: ["outList"],
    queryFn: async () => {
      try {
        const result = await instance.get("application/status");
        return result.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};
