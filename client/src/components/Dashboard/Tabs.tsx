import { DashboardTabsProps } from "@/types/types";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const Tabs = ({ currentTab, setCurrentTab }: DashboardTabsProps) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      return setCurrentTab(tab);
    }
  }, [location.search]);

  return (
    <div className="flex w-full border-b border-b-base-300">
      <NavLink
        to={"/dashboard?tab=profile"}
        className={`p-4 ${
          currentTab === "profile" ? "border-b-2 border-b-neutral" : ""
        }`}
      >
        Profile
      </NavLink>
      <NavLink
        to={"/dashboard?tab=posts"}
        className={`p-4 ${
          currentTab === "posts" ? "border-b-2 border-b-neutral" : ""
        }`}
      >
        Posts
      </NavLink>
    </div>
  );
};
