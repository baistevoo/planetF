"use client";

import { Spinner } from "@/components/Spinner";
import { useEmailSignin } from "@/hooks/auth/useEmailSignin";
import { OpenEyeIcon } from "@/icons/CloseEye";
import { SigninFormValues, signInSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [showText, setShowText] = useState(false);

  const togglePassword = () => {
    setShowText((showText) => !showText);
  };

  const form = useForm<SigninFormValues>({
    defaultValues: {
      user_name: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(signInSchema),
  });

  const { mutate: loginWithEmail, isPending } = useEmailSignin();

  const handleSignin = useCallback(
    (values: SigninFormValues) => {
      loginWithEmail(values, {
        onError: (error: any) => {
          console.log(error.message);
          toast.error(error?.message);
        },
        onSuccess: (response: any) => {
          console.log(response?.data);
          toast.success(response?.data?.message);
          router.push("/user/fundwallet");
        },
      });
    },
    [loginWithEmail]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  return (
    <div className="bg-[#164e63] lg:bg-transparent h-screen flex justify-center items-center ">
      <div className="bg-[url(/eeee.svg)] bg-no-repeat bg-contain overflow-x-hidden hidden lg:block h-screen flex-1 relative ">
        <div className="h-[50%] my-4 flex w-1/2 flex-col justify-between items-center ">
          <div className="flex items-center gap-2">
            <Image
              src="https://enigma-laravel.left4code.com/build/assets/logo-9a88cec5.svg"
              alt=""
              width={20}
              height={20}
            />
            <span className="text-white text-lg">Enigma</span>
          </div>
          <div className="max-w-[296px] h-[205px]  ml-20">
            <Image
              src="https://enigma-laravel.left4code.com/build/assets/illustration-bbfd1da0.svg"
              alt=""
              width={300}
              height={290}
            />
            <h1 className="text-4xl mt-10 font-medium text-white leading-tight whitespace-nowrap">
              A few more clicks to
              <br />
              sign in to your account.
            </h1>
            <p className="mt-5 text-white text-lg text-opacity-70 whitespace-nowrap">
              Manage all your e-commerce accounts in one place
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-md mx-auto my-auto w-[90%] sm:w-[60%] sm:px-8 lg:flex-1 lg:ml-20 lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none px-5 py-8">
        <div className="lg:max-w-md">
          <h2 className="text-center text-2xl font-bold xl:text-left xl:text-3xl">
            Sign In
          </h2>

          <form
            className="mt-8 flex flex-col gap-4 "
            onSubmit={handleSubmit(handleSignin)}
          >
            <input
              type="text"
              placeholder="username"
              {...register("user_name")}
              className="w-full text-sm border-slate-200 px-4 py-3 rounded-md border"
            />
            {errors?.user_name && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.user_name?.message}</p>
              </div>
            )}
            <div className="relative">
              <input
                type={!showText ? "password" : "text"}
                placeholder="Password"
                {...register("password")}
                className="w-full text-sm border border-slate-200 px-4 py-3 rounded-md"
              />
              <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center bg-transparent">
                <button
                  type="button"
                  className="button"
                  onClick={togglePassword}
                >
                  <OpenEyeIcon />
                </button>
              </div>
            </div>
            {errors?.password && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
                  !
                </div>
                <p>{errors?.password?.message}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                Remember me
              </div>
              <Link href="/forgotpassword">Forgot Password?</Link>
            </div>
            <div className="flex items-center gap-3 mb-4 my-2">
              <button
                type="submit"
                disabled={isPending}
                className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-[#164e63] border border-[#164e63] hover:opacity-80  text-white w-full px-4 py-3"
              >
                {isPending ? <Spinner /> : "Login"}
              </button>
              <Link
                href="/register"
                className="transition duration-200 shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-opacity-50 bg-transparent  border border-[#e2e8f0] hover:bg-slate-100  text-slate-500 w-full px-4 py-3"
              >
                Register
              </Link>
              <Link href="#" className=" whitespace-nowrap text-[#164e63]">
                Need Support?
              </Link>
            </div>
          </form>
          <p className="mt-10 text-center lg:text-left lg:whitespace-nowrap text-slate-600 text-base">
            By signin up, you agree to our{" "}
            <span className="text-[#164e63]">
              Terms and Conditions & Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
