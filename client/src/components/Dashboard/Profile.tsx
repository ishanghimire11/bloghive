import { signinFields, signupFields } from "@/constants/constants";
import { RootState } from "@/redux/store";
import {
  RegisterUserSchema,
  ValidLoginFieldNames,
  ValidRegisterFieldNames,
  registerUserSchema,
} from "@/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const defaultValues = {
    username: (currentUser && currentUser.username) || "",
    email: (currentUser && currentUser.email) || "",
    photoUrl: (currentUser && currentUser.photoUrl) || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<RegisterUserSchema> = (data) =>
    console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full mx-auto gap-y-6 max-w-96"
      >
        <div className="w-32 h-32 p-2 mb-6 rounded-full bg-primary">
          <img
            src={(currentUser && currentUser?.photoUrl) || ""}
            alt="user"
            className="object-cover h-full rounded-full"
          />
        </div>
        {signupFields.map((field, index) => {
          const { placeholder, name, type } = field;

          return (
            <label key={index} className="relative min-w-full">
              <input
                type={type}
                className={`input input-bordered w-full`}
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

        <button
          type="submit"
          className="flex items-center justify-center w-full mt-4 btn btn-secondary gap-x-2"
          disabled={loading}
        >
          {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
          Submit
        </button>

        <button
          className="flex items-center justify-center w-full btn btn-neutral gap-x-2"
          // @ts-ignore
          onClick={() => document.getElementById("delete-profile")?.showModal()}
        >
          {loading && <Loader2Icon className="w-5 h-5 animate-spin" />}
          Delete Account
        </button>
        <dialog id="delete-profile" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Account?</h3>
            <p className="pt-1 pb-8">
              Proceed carefully! This process can't be reversed.
            </p>
            <div className="flex justify-end gap-x-2">
              <form method="dialog">
                <button className="btn btn-outline">Cancel</button>
              </form>

              <button className="btn btn-error">Confirm</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </form>
    </div>
  );
};
