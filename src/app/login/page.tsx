"use client";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
import Logo from "@/assets/svg/PiCKLogo.svg";
import { useEffect, useState } from "react";
import { useLogin } from "@/api/login";
import { useRouter } from "next/navigation";
import { cookie, saveToken } from "@/util/auth";

interface ChangeProps {
  text: string;
  name: string;
}

interface LoginType {
  admin_id: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState<LoginType>({
    admin_id: "",
    password: "",
  });

  const { mutate: loginMutate } = useLogin();
  const router = useRouter();

  const handleChange = ({ text, name }: ChangeProps) => {
    setData({ ...data, [name]: text });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickBtn();
    }
  };
  const onClickBtn = async () => {
    try {
      await loginMutate(data, {
        onSuccess: (res) => {
          const accessToken = res.access_token;
          const refreshToken = res.refresh_token;
          router.push("/main");
          saveToken(accessToken, refreshToken);
        },
        onError: (error) => {
          console.error("Login error:", error);
          if (error.message === "Request failed with status code 500") {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다");
            location.reload();
          } else if (error.message === "Request failed with status code 401") {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다");
          }
        },
      });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      router.push("/login");
    }
  };

  useEffect(() => {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    localStorage.clear();
  }, []);

  const BtnColor = () => {
    if (data.admin_id === "" || data.password === "") {
      return "solidDisabled";
    } else return "primary";
  };
  return (
    <div className=" flex flex-col px-6 h-dvh justify-center pt-48 pb-20">
      <div className=" flex flex-col justify-between h-90dvh gap-5">
        <div className="flex flex-col gap-7">
          <div>
            <Image src={Logo} alt="" width={120} />
            <div className=" text-body2 text-neutral-400">
              구글폼에 제출했던 계정으로 로그인해주세요
            </div>
          </div>
          <Input
            type="text"
            placeholder="아이디"
            width="full"
            onChange={handleChange}
            value={data.admin_id}
            onKeyDown={handleKeyDown}
            name="admin_id"
          />
          <Input
            type="password"
            width="full"
            placeholder="비밀번호"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            name="password"
            value={data.password}
          />
        </div>
        <div className=" h-fit">
          <Button
            colorType={`${BtnColor()}`}
            buttonSize="full"
            onClick={onClickBtn}
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
