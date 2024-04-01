import { LogInIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navLinkHover =
  "lg:relative lg:w-fit lg:block lg:after:block lg:after:content-[''] lg:after:absolute lg:after:h-[2px] lg:after:bg-black lg:after:w-full lg:after:scale-x-0 lg:after:hover:scale-x-100 lg:after:transition lg:after:duration-300 lg:after:origin-left";

const Navlinks = () => {
  return (
    <nav>
      <ul className="flex flex-col lg:flex-row lg:items-center gap-x-8">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <li className="block w-full pt-4 mt-2 border-t sm:hidden border-t-base-300">
          <button
            type="button"
            className="flex justify-start w-full px-4 py-2 text-left h-fit btn btn-primary min-h-fit gap-x-2"
          >
            <LogInIcon />
            <span>Login</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navlinks;
