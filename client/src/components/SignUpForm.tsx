import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loginFailure, loginStart, loginSuccess } from "@/redux/user/userSlice";

import { Eye, EyeOff, Loader2Icon } from "lucide-react";

import { UserSignUp } from "@/types/types";
import {
  RegisterUserSchema,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import { signupFields } from "@/constants/constants";

const SignUpForm = () => {
  const [isShowingPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<UserSignUp> = async (data) => {
    dispatch(loginStart());

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
        dispatch(loginSuccess(res.data));
        navigate("/sign-in");
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return dispatch(loginFailure(error.response?.data.message));
      }
      return dispatch(loginFailure(error.message));
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

        <button
          type="submit"
          className="flex items-center justify-center mt-4 btn btn-secondary gap-x-2"
          disabled={loading}
        >
          {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
