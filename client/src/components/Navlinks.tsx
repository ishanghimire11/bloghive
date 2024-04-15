import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LogInIcon } from "lucide-react";

const Navlinks = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

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
          <NavLink to="/dashboard?tab=profile">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        {!currentUser && (
          <li className="block w-full pt-4 mt-2 border-t sm:hidden border-t-base-300">
            <NavLink
              to={"/sign-in"}
              className="flex justify-start w-full px-4 py-2 text-left h-fit btn btn-primary min-h-fit gap-x-2"
            >
              <LogInIcon />
              <span>Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navlinks;
