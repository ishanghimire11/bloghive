import { UserSignUp } from "@/types/types";
import {
  RegisterUserSchema,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFields } from "@/constants/constants";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<UserSignUp> = (data) => console.log(data);

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
                <p className="w-full mt-2 text-sm text-red-500">
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
