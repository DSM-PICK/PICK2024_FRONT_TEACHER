import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "..";
import { cookie } from "@/util/auth";
import axios from "axios";
import apiError from "@/hook/errorHandling";

interface Login {
  admin_id: string;
  password: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

export const useLogin = () => {
  const BASEURL = process.env.NEXT_PUBLIC_API_KEY;
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const loginMutation = useMutation<Token, Error, Login>({
    mutationFn: (param: Login) => {
      return axios
        .post<Token>(`${BASEURL}/admin/login`, {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    ("access_token");
    cookie.remove("refresh_token");
    cookie.remove("part");
    console.error(loginMutation.error);
  }

  return {
    mutate: loginMutation.mutate,
    accessToken,
    refreshToken,
  };
};

export const GetTeacherName = () => {
  const { handleError } = apiError();
  return useQuery<{ name: string }>({
    queryKey: ["GetTeacherName"],
    queryFn: async () => {
      try {
        const response = await instance.get(`/admin/my-name`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  });
};