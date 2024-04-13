import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { AlertCircleIcon } from "lucide-react";

import SignInForm from "@/components/SignInForm";
import GoogleOAuth from "@/components/GoogleOAuth";
import Logo from "@/assets/logo.svg";

const Signin = () => {
  const { error } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex min-h-[90dvh]">
      <div className="py-12 px-6 md:px-12 md:py-12 rounded-lg bg-neutral-content w-full md:min-w-[400px] md:w-fit">
        <NavLink to={"/"} className="flex justify-center mx-auto w-fit">
          <img src={Logo} className="text-center" />
        </NavLink>

        <h2 className="pt-6 mb-12 text-2xl font-medium text-center md:mb-16">
          Sign In
        </h2>

        <div>
          <GoogleOAuth />

          <p className="my-8 text-center opacity-70 divider">OR</p>
        </div>

        <SignInForm />

        <div>
          <p className="mt-4 text-sm text-center">
            No account?{" "}
            <NavLink
              to={"/sign-up"}
              className="underline text-info underline-offset-2 hover:text-info/70"
            >
              Create new one.
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

export default Signin;
