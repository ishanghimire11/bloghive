import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { AlertCircleIcon } from "lucide-react";

import Logo from "@/assets/logo.svg";
import googleIcon from "@/assets/google.png";
import SignUpForm from "@/components/SignUpForm";

const Signup = () => {
  const { error } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex min-h-[90dvh]">
      <div className="p-8 md:px-12 md:py-12 rounded-lg bg-neutral-content w-full md:min-w-[400px] md:w-fit">
        <NavLink to={"/"} className="flex justify-center mx-auto w-fit">
          <img src={Logo} className="text-center" />
        </NavLink>

        <h2 className="pt-6 mb-16 text-2xl font-medium text-center">
          Register your account
        </h2>

        <div>
          <button className="flex items-center w-full mx-auto btn gap-x-2">
            <img src={googleIcon} alt="" className="object-cover w-5 h-5" />
            Continue with Google
          </button>

          <p className="my-8 text-center opacity-70 divider">OR</p>
        </div>

        <SignUpForm />

        <div>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <NavLink
              to={"/sign-in"}
              className="underline text-error underline-offset-2"
            >
              Login
            </NavLink>
          </p>
        </div>

        {error && (
          <div className="flex items-center w-full p-4 pl-6 mt-12 rounded-lg text-error bg-error/15 gap-x-2">
            <AlertCircleIcon className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex-1 hidden bg-center bg-no-repeat bg-cover bg-signup-background md:block"></div>
    </div>
  );
};

export default Signup;
