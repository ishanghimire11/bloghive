import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { loginSuccess, loginStart, loginFailure } from "@/redux/user/userSlice";

import { signinFields } from "@/constants/constants";
import { UserSignIn } from "@/types/types";
import {
  LoginUserSchema,
  ValidLoginFieldNames,
  loginUserSchema,
} from "@/validation/validation";
import { useDispatch } from "react-redux";

const SignInForm = () => {
  const [responseError, setResponseError] = useState<{
    hasError: boolean;
    error: any;
  }>({
    hasError: false,
    error: null,
  });

  const dispatch = useDispatch();

  const [isShowingPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<UserSignIn> = async (data) => {
    setResponseError({
      hasError: false,
      error: null,
    });

    dispatch(loginStart());

    try {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        }
      );
      console.log(res.data);
      // dispatch(loginSuccess(res.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return setResponseError({ hasError: true, error });
      }
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-6"
      >
        {signinFields.map((field, index) => {
          const { placeholder, name, type } = field;

          return (
            <label key={index} className="relative">
              <input
                type={isShowingPassword ? "text" : type}
                className={`w-full input input-bordered ${
                  name === "password" && "pr-10"
                }`}
                placeholder={placeholder}
                {...register(name as ValidLoginFieldNames)}
              />
              {name === "password" && (
                <label className="absolute top-0 translate-y-full right-4 swap swap-rotate">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword((prev) => !prev)}
                  />

                  <Eye className="w-4 h-4 swap-on" />
                  <EyeOff className="w-4 h-4 swap-off" />
                </label>
              )}

              {errors[name as ValidLoginFieldNames] && (
                <p className="w-full mt-2 text-sm text-error">
                  {errors[name as ValidLoginFieldNames]?.message}
                </p>
              )}
            </label>
          );
        })}
        {responseError.hasError && (
          <div className="w-full mt-2 text-lg text-error">
            {responseError.error.response?.data?.message}
          </div>
        )}
        <button type="submit" className="mt-4 btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
