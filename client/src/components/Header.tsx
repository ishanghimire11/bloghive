import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { LogInIcon, LogOutIcon, Menu, Search } from "lucide-react";

import Navlinks from "@/components/Navlinks";
import Logo from "@/assets/logo.svg";
import { HeaderSearch } from "@/types/types";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { register, handleSubmit } = useForm<HeaderSearch>();
  const onSubmit: SubmitHandler<HeaderSearch> = (data) => console.log(data);

  console.log(currentUser);

  return (
    <header className="px-6 py-5 border-b sm:flex sm:gap-4 sm:items-center sm:justify-between sm:flex-row border-b-base-300">
      <div className={"inline-block w-1/2 sm:w-fit sm:block"}>
        <NavLink to={"/"}>
          <img src={Logo} />
        </NavLink>
      </div>

      <div className="hidden lg:items-center lg:flex lg:-order-1">
        <Navlinks />
      </div>

      <div
        className={
          "inline-block text-right w-1/2 -order-1 sm:w-fit sm:block lg:hidden"
        }
      >
        <details className="block ham-menu dropdown lg:hidden">
          <summary className="p-2 m-1 rounded-full btn">
            <Menu strokeWidth="2" className="w-7" />
          </summary>
          <div className="z-10 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <Navlinks />
          </div>
        </details>
      </div>

      <div className="flex w-full mt-4 gap-x-2 sm:w-fit sm:mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-fit">
          <label className="flex items-center gap-2 input input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              {...register("query", { required: true })}
            />
            <button type="submit">
              <Search className="w-6 h-6" />
            </button>
          </label>
        </form>

        {currentUser ? (
          <details className="block dropdown dropdown-end">
            <summary className="p-0 m-1 rounded-full shadow-none btn w-fit">
              <img
                src={currentUser.photoUrl}
                className="w-12 h-12 rounded-full"
              />
            </summary>
            <div className="p-2 shadow-md menu dropdown-content z-[1] bg-base-100 rounded-box space-y-6 max-w-fit min-w-fit w-fit">
              <div className="flex items-center gap-x-4">
                <div className="w-10 h-10">
                  <img
                    src={currentUser.photoUrl}
                    className="w-full h-full rounded-full"
                  />
                </div>

                <div>
                  <p>{currentUser.username}</p>
                  <p>{currentUser.email}</p>
                </div>
              </div>
              <button className="flex items-center justify-center btn btn-primary gap-x-2">
                <LogOutIcon /> Logout
              </button>
            </div>
          </details>
        ) : (
          <NavLink
            to="/sign-in"
            className="hidden btn btn-primary sm:flex sm:gap-x-2 "
          >
            <LogInIcon />
            <span>Login</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
