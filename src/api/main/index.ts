import { useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { stringify } from "querystring";

export const GetName = () => {
  return useQuery<string>({
    queryKey: ["name"],
    queryFn: async () => {
      const result = await instance.get("/admin/my-name");
      localStorage.setItem("name", result.data);
      return result.data;
    },
  });
};
