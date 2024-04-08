import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { UserSignUp } from "@/types/types";
import {
  RegisterUserSchema,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import { signupFields } from "@/constants/constants";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [responseError, setResponseError] = useState<{
    hasError: boolean;
    error: any;
  }>({
    hasError: false,
    error: null,
  });

  const [isShowingPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<UserSignUp> = async (data) => {
    try {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        }
      );
      if (res.status === 200) {
        navigate("/sign-in");
      }
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
        {signupFields.map((field, index) => {
          const { placeholder, name, type } = field;

          return (
            <label key={index} className="relative">
              <input
                type={isShowingPassword ? "text" : type}
                className={`w-full input input-bordered ${
                  name === "password" && "pr-10"
                }`}
                placeholder={placeholder}
                {...register(name as ValidRegisterFieldNames)}
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

              {errors[name as ValidRegisterFieldNames] && (
                <p className="w-full mt-2 text-sm text-error">
                  {errors[name as ValidRegisterFieldNames]?.message}
                </p>
              )}
            </label>
          );
        })}
        {responseError.hasError && (
          <div className="w-full mt-2 text-sm text-error">
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

export default SignUpForm;
