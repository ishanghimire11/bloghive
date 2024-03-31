import React from "react";
import { NavLink } from "react-router-dom";

const Navlinks = () => {
  return (
    <nav>
      <ul className="flex items-center gap-x-6">
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
      </ul>
    </nav>
  );
};

export default Navlinks;
