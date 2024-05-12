import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loginSuccess, loginStart, loginFailure } from "@/redux/user/userSlice";

import { Eye, EyeOff, Loader2Icon } from "lucide-react";

import { signinFields } from "@/constants/constants";
import { UserSignIn } from "@/types/types";
import {
  LoginUserSchema,
  ValidLoginFieldNames,
  loginUserSchema,
} from "@/validation/validation";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [isShowingPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<UserSignIn> = async (data) => {
    dispatch(loginStart());

    try {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data,
        }
      );
      console.log(res);
      dispatch(loginSuccess(res.data));
      navigate("/dashboard?tab=profile");
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

export default SignInForm;
