import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    setCurrentTab(tab || "");
  }, [currentTab]);

  return (
    <div>
      <aside>
        <NavLink to={"/dashboard?tab=profile"}>Profile</NavLink>
        <NavLink to={"/dashboard?tab=posts"}>Posts</NavLink>
      </aside>
    </div>
  );
};

export default Dashboard;
