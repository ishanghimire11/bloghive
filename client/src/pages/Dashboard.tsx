import { useState } from "react";
import { Profile, Tabs } from "@/components/Dashboard";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("");

  return (
    <div className="px-6 py-12">
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="py-12">{currentTab === "profile" && <Profile />}</div>
    </div>
  );
};

export default Dashboard;
