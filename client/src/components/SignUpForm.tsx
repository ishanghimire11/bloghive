import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
            <label key={index}>
              <input
                type={type}
                className="w-full input input-bordered"
                placeholder={placeholder}
                {...register(name as ValidRegisterFieldNames)}
              />

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
