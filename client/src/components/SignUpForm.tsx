import { UserSignUp } from "@/types/types";
import {
  RegisterUserSchema,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFields } from "@/constants/constants";
import axios, { AxiosError } from "axios";

const SignUpForm = () => {
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
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("post error");
      }
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
                // autoComplete="off"
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

        <button type="submit" className="mt-4 btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
