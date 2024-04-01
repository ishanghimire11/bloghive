import { SubmitHandler, useForm } from "react-hook-form";

import Navlinks from "@/components/Navlinks";
import { HeaderSearch } from "@/types/types";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { LogInIcon } from "lucide-react";

const Header = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<HeaderSearch>();
  const onSubmit: SubmitHandler<HeaderSearch> = (data) => console.log(data);

  return (
    <div className="px-6 py-5 border-b sm:flex sm:gap-4 sm:items-center sm:justify-between sm:flex-row border-b-base-300">
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
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </summary>
          <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
          {/* {errors.query && (
            <span className="text-red-500">Add a search query</span>
          )} */}
        </form>
        <button className="hidden btn btn-primary sm:flex sm:gap-x-2 ">
          <LogInIcon />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
