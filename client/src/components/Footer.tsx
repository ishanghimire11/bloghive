import React from "react";
import { NavLink } from "react-router-dom";

import GithubIcon from "@/assets/github.svg";

import Logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="p-8 mt-auto text-base-100 footer footer-center bg-neutral">
      {/* <nav className="grid grid-flow-col gap-4">
        <NavLink to="#" className="link link-hover">
          About us
        </NavLink>
        <NavLink to="#" className="link link-hover">
          Contact
        </NavLink>
        <NavLink to="#" className="link link-hover">
          Jobs
        </NavLink>
        <NavLink to="#" className="link link-hover">
          Press kit
        </NavLink>
      </nav> */}

      <div>
        <NavLink to={"/"}>
          <img src={Logo} />
        </NavLink>
        <p>Bloghive</p>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <NavLink to="#" className="link link-hover">
            <img src={GithubIcon} alt="" className="w-8 h-8 " />
          </NavLink>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by Ishan Ghimire.</p>
      </aside>
    </footer>
  );
};

export default Footer;
