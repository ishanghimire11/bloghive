import { SubmitHandler, useForm } from "react-hook-form";

import Navlinks from "@/components/Navlinks";
import { HeaderSearch } from "@/types/types";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { LogInIcon, Menu, Search } from "lucide-react";

const Header = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<HeaderSearch>();
  const onSubmit: SubmitHandler<HeaderSearch> = (data) => console.log(data);

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
              <Search className="w-6 h-6" />
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
    </header>
  );
};

export default Header;
