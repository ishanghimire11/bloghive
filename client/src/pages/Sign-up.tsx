import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import googleIcon from "@/assets/google.png";
import SignUpForm from "@/components/SignUpForm";

const Signup = () => {
  return (
    <div className="h-[90dvh] py-8 px-6 flex">
      <div className="flex h-full">
        <div className="h-full p-16 rounded-lg bg-white/60 lg:min-w-[400px]">
          <NavLink to={"/"} className="flex justify-center mx-auto w-fit">
            <img src={Logo} className="text-center" />
          </NavLink>

          <p className="pt-6 mb-16 font-medium text-center">
            Register your account
          </p>

          <div className="mb-16">
            <button className="flex items-center w-full mx-auto btn gap-x-2">
              <img src={googleIcon} alt="" className="object-cover w-5 h-5" />
              Sign up with Google
            </button>

            <p className="mt-6 text-center">Or</p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
