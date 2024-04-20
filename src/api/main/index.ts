import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { CountOutListType } from "../type";

export const GetName = () => {
  return useQuery<string>({
    queryKey: ["name"],
    queryFn: async () => {
      const result = await instance.get("/admin/my-name");
      localStorage.setItem("name", result.data);
      return result.data.name;
    },
  });
};

export const GetTodaydirector = () => {
  return useQuery<string>({
    queryKey: ["director"],
    queryFn: async () => {
      const result = await instance.get("self-study/admin");
      return result.data;
    },
  });
};

export const CountOutList = () => {
  return useQuery<CountOutListType>({
    queryKey: ["outList"],
    queryFn: async () => {
      const result = await instance.get("application/status");
      return result.data;
    },
  });
};
